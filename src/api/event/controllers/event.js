'use strict';

/**
 *  event controller
 */

const ical = require('ical-generator');
const dayjs = require('dayjs');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
    async agenda(ctx) {
        let events = (await strapi.service('api::event.event').find({
            populate: '*', 
            sort: 'publishedAt:desc',
            pagination: {
                pageSize: 500,
            }
        })).results;

        let reservations = (await strapi.service('api::event.event').find({
            publicationState: 'preview',
            filters: {
                publishedAt: {
                    '$null': true
                }
            },
            populate: '*',
            pagination: {
                pageSize: 500,
            }
        })).results;

        const calendar = ical({name: "Spectrum"});

        for (const event of events) {
            for (const part of event.parts) {
                const useSubName = event.parts.length > 1 && part.title && part.title.trim()
                const summary = useSubName ? `${event.title} - ${part.title}` : event.title

                calendar.createEvent({
                    start: part.begin,
                    end: part.end,
                    allDay: part.full_day,
                    summary: summary,
                    description: event.description,
                    location: part.location,
                    url: `https://www.svspectrum.nl${event.url}`
                });
            }
            for (const enrol of event.enrol) {
                if (enrol.deadline != null) {
                    calendar.createEvent({
                        start: enrol.deadline,
                        end: enrol.deadline,
                        summary: `${event.title} - ${enrol.title}`,
                        description: event.description,
                        url: `https://www.svspectrum.nl${event.url}`
                    });
                }
            }
        }

        for (const reservation of reservations) {
            if (reservation.title) {
                for (const part of reservation.parts) {
                    if (part.begin && part.end) {
                        const useSubName = reservation.parts.length > 1 && part.title && part.title.trim()
                        const summary = useSubName ? `${reservation.title} - ${part.title}` : reservation.title

                        calendar.createEvent({
                            start: part.begin,
                            end: part.end,
                            allDay: part.full_day,
                            summary: `(info volgt) ${summary}`,
                            location: part.location,
                        });
                    }
                }
            }
        }

        return calendar.toString();
    },

    async relevant(ctx) {
        let events = (await this.find({
            query: {
                populate: '*', 
                sort: 'publishedAt:desc',
                pagination: {
                    pageSize: 25,
                }
            }
        })).data;

        let items = [];

        let now = dayjs();
        let cutoffTime = now.subtract(20, 'minute')

        for (const event of events) {
            let enrolCount = 0;
            let partCount = 0;

            for (const enrol of event.attributes.enrol) {
                let deadlineScore = 0;
                let spotsScore = 0;
                enrolCount += 1;
                
                if (enrol.closed) {
                    continue; // Closed enrols are not relevant
                }

                if (enrol.deadline) {
                    const deadline = dayjs(enrol.deadline)
                    if (deadline.isBefore(cutoffTime)) {
                        continue; // Passed enrols are not relevant
                    }

                    // Add relevancy score based on how near the deadline is                    
                    // The deadline based score is based on a sigmoid curve with a range of [0,1]

                    // Get the amount of days until the deadline as a float
                    const diff = deadline.diff(now, 'day', true); 
                    // Shift the difference so the score will be exactly 0.5, 3 days before the deadline.
                    // Note that this means that a deadline in less than 3 days is more important than a sign up with limited spots
                    const shiftedDiff = diff - 3;
                    // Use the logistic function to calculate the score
                    deadlineScore = 1 / (1 + Math.exp(shiftedDiff))
                }

                if (enrol.spots > 0) {
                    // Add relevancy score if there are limited spots
                    // 0.5 was chosen to make it easy to compare to the deadline sigmoid
                    spotsScore = 0.5;
                }

                // Combine the two scores
                // When a enrol has both a deadline and a spot limit this formula essentially shifts the sigmoid in a range of [0.5, 1]
                // This is useful since two enrols with deadlines of wich one has a spot limit can at most switch rank once while nearing the deadline
                let score = deadlineScore + spotsScore*(1-deadlineScore);

                if (score <= 0) {
                    continue; // The enrol is not relevant
                }

                score -= (enrolCount - 1)*0.1;

                items.push({
                    ...enrol,
                    type: 'enrol',
                    score: score,
                    reason: deadlineScore > spotsScore ? 'deadline' : 'spots',
                    event: event,
                });
            }

            for (const part of event.attributes.parts) {
                let score = 0;
                partCount += 1;

                const begin = dayjs(part.begin)
                if (begin.isBefore(cutoffTime)) {
                    continue; // Passed parts are not relevant
                }

                // Add relevancy score based on how near the begin is                    
                // The begin based score is based on a sigmoid curve with a range of [0,1]
                
                // Get the amount of days until the deadline as a float
                const diff = begin.diff(now, 'day', true); 
                // Shift the difference so the score will be exactly 0.5, 3 days before the deadline.
                // Note that this means that a event in less than 3 days is more important than a sign up with limited spots
                const shiftedDiff = diff - 3;
                // Use the logistic function to calculate the score
                score = 1 / (1 + Math.exp(shiftedDiff))

                // Remove some relevancy score if there are parts or enrols for this event before this
                score *= 0.8**(partCount - 1);
                if (enrolCount > 0) {
                    score *= 0.8;
                }

                items.push({
                    ...part,
                    type: 'part',
                    score: score,
                    reason: 'begin',
                    event: event,
                });
            }
        }

        items.sort((a, b) => b.score - a.score);

        return items.slice(0, 5);
    }
}));

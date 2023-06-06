'use strict';

function getMostRecentDate(item) {
    if (item.type == "post") {
        return item.publishedAt;
    } else {
        let dates = [item.publishedAt, ...item.updates.map(post => post.publishedAt)]
        
        return dates.sort((a, b) => -a.localeCompare(b))[0]
    }
}

/**
* A set of functions called "actions" for `news`
*/
module.exports = ({strapi}) => ({
    async find(ctx) {
        let posts = (await strapi.service('api::post.post').find({
            // query: {
                populate: '*', 
                sort: 'publishedAt:desc',
                pagination: {
                    pageSize: 100,
                }
            // }
        })).results;

        let events = (await strapi.service('api::event.event').find({
            // query: {
                populate: "*",
                sort: 'publishedAt:desc',
                pagination: {
                    pageSize: 100,
                }
            // }
        })).results;

        posts = posts.filter(post => !post.event);

        posts = posts.map(post => ({type: "post", ...post}));
        events = events.map(event => ({type: "event", ...event}));

        return [...posts, ...events].sort((a, b) => -getMostRecentDate(a).localeCompare(getMostRecentDate(b)));
    }
});

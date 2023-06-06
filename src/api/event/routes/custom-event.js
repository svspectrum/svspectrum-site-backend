'use strict';

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/agenda.ics",
            handler: "event.agenda",
            config: {
                policies: []
            }
        },
        {
            method: "GET",
            path: "/relevant",
            handler: "event.relevant",
            config: {
                policies: []
            }
        }
    ]
}
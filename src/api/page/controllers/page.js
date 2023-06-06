'use strict';

/**
 *  page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', (strapi) => ({
    async find(ctx) {
        // Ensure that the lock related fields are populated
        ctx.query = { ...ctx.query, populate: { locked: { populate: "redirect" } } }
    
        // Calling the default core action
        const { data, meta } = await super.find(ctx);
        
        // Prevent an unauthorised user to see locked pages
        if (!ctx.state.user) {
            // Give an error if the user is searching for a single page that is locked
            if (ctx.query.filters?.url && data.length == 1) {
                const entry = data[0];

                if (entry.attributes.locked.locked) {
                    ctx.response.status = 401; // Unauthorized error code
                    
                    // If the page can be redirected to an other page return that url in the body
                    if (entry.attributes.locked.redirect.data) {
                        ctx.response.body = {redirect: entry.attributes.locked.redirect.data.attributes.url};
                    }

                    // Return an empty resonse
                    return;
                }
            }

            // If the user is searching for multiple pages just scrub the locked pages
            for (const entry of data) {
                if (entry.attributes.locked.locked) {
                    entry.attributes = {...entry.attributes, content: ""}
                }
            }
        }

        return { data, meta };
    }
}));

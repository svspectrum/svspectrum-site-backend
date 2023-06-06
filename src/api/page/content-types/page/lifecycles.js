const slugify = require('slugify');

async function getURL(data) {
    const slug = slugify(data.title ?? '');

    if (data.parent != null) {
        const parent = await strapi.service('api::page.page').findOne(data.parent, {});

        if (parent) {
            return `${parent.url}/${slug}`;
        }
    }

    return `/${slug}`;
}

module.exports = {
    async beforeCreate(event) {
        const { data } = event.params;

        data.url = await getURL(data);
    },
  
    async beforeUpdate(event) {
        const { data } = event.params;

        if (!data.publishedAt && data.publishedAt !== null) {
            data.url = await getURL(data);
        }
    },
};

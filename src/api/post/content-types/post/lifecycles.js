const slugify = require('slugify');
const dayjs = require('dayjs');

function getURL(newData, oldData) {
    const slug = slugify(newData.title ?? '');
    const year = dayjs(oldData.createdAt).year();

    return `/post/${year}/${slug}`;
}

module.exports = {
    async beforeCreate(event) {
        const newData = event.params.data;

        newData.url = getURL(newData, newData);
    },
  
    async beforeUpdate(event) {
        const newData = event.params.data;
        
        if (!newData.publishedAt && newData.publishedAt !== null) {
            const id = event.params.where.id;
            const oldData = await strapi.service('api::post.post').findOne(id, {});
            
            newData.url = getURL(newData, oldData);
        }
    },
};

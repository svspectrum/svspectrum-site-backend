// const fetch = require('node-fetch');
const fs = require('fs');
// const path = require('path');
// const { File } = require('file-api');
// const Downloader = require("nodejs-file-downloader");

module.exports = {
    bootstrap: async () => {
        if (true) {
            const events = await strapi.entityService.findMany('api::event.event', {populate: 'deep'});
            const posts = await strapi.entityService.findMany('api::post.post', {populate: 'deep'});
            const pages = await strapi.entityService.findMany('api::page.page', {populate: 'deep'});

            console.log(events.length, posts.length, pages.length);

            const data = {events, posts, pages}
            
            let json = JSON.stringify(data, null, 2);
            fs.writeFileSync('../data.json', json);
        }

        if (false) {
            const {events, posts, pages} = require('../data.json');

            const files = await strapi.plugins.upload.services.upload.findMany(); 

            let fileIds = {};
            for (const file of files) {
                fileIds[file.name] = file.id;
            }

            try {
                for (const data of events) {
                    const fileId = fileIds[data.image.name] ?? null

                    await strapi.entityService.create('api::event.event', {
                        data: {
                            ...data,
                            createdBy: 1,
                            updatedBy: 1,
                            publishedBy: 1,
                            image: fileId,
                        },
                    });
                }
            } catch (e) {
                console.log(e);
            }

            try {
                for (const data of posts) {
                    await strapi.entityService.create('api::post.post', {
                        data: {
                            ...data,
                            createdBy: 1,
                            updatedBy: 1,
                            publishedBy: 1,
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }

            try {
                for (const data of pages) {
                    await strapi.entityService.create('api::page.page', {
                        data: {
                            ...data,
                            locked: {locked: false},
                            createdBy: 1,
                            updatedBy: 1,
                            publishedBy: 1,
                        }
                    });
                }
            } catch (e) {console.log(e);}
        }

        // if (false) {
            
        //     // Download all files
        //     const oldFiles = await (await fetch('https://www.svspectrum.nl/backend/upload/files?_limit=-1')).json();
        //     for (const data of oldFiles) {
        //         console.log(data.url);
        //         try {
        //             await new Downloader({
        //                 url: `https://www.svspectrum.nl/backend/${data.url}`,
        //                 directory: "./temp",
        //                 fileName: data.name,
        //                 skipExistingFileName: true,
        //             }).download()
        //         } catch(error) {
        //             if (error.responseBody) {
        //                 console.log(error.responseBody)
        //             }
        //         }
        //     }
        //     }

        //     // console.log(strapi);
        //     // console.log(await strapi.admin.services.user.findOneByEmail("steven.klaas.vroom@gmail.com"));

        //     if (false) {
            
        //     const files = await strapi.plugins.upload.services.upload.findMany(); //getService('upload').findMany(); //require("./files.json"); // 
        //     const events = await (await fetch('https://www.svspectrum.nl/backend/events?_limit=-1')).json();
        //     const posts = await (await fetch('https://www.svspectrum.nl/backend/posts?_limit=-1')).json();
        //     const pages = await (await fetch('https://www.svspectrum.nl/backend/pages?_limit=-1')).json();

        //     let fileIds = {};
        //     for (const file of files) {
        //         fileIds[file.name] = file.id;
        //     }

        //     try {
        //         for (const data of events) {
        //             const fileId = fileIds[data.image.name] ?? null
        //             // console.log(data.image.name, fileId);

        //             await strapi.entityService.create('api::event.event', {
        //                 data: {
        //                     ...data,
        //                     url: '/'+data.slug,
        //                     publishedAt: data.published_at,
        //                     createdAt: data.created_at,
        //                     updatedAt: data.updated_at,
        //                     createdBy: 1,
        //                     updatedBy: 1,
        //                     publishedBy: 1,
        //                     parts: data.parts.map(part => ({
        //                         title: part.title,
        //                         location: part.location,
        //                         begin: part.begin,
        //                         end: part.end,
        //                         full_day: !!part.allDay,
        //                     })),
        //                     enrol: data.enrol.map(enrol => ({
        //                         title: enrol.title,
        //                         url: enrol.url,
        //                         deadline: enrol.deadline,
        //                         limit: enrol.spots,
        //                         closed: !enrol.open,
        //                     })),
        //                     image: fileIds[data.image.name] ?? null,
        //                     extra_info: data.info,
        //                     updates: [],
        //                 },
        //             });
        //         }
        //     } catch (e) {
        //         // console.log(e);
        //     }

        //     try {
        //         for (const data of posts) {
        //             await strapi.entityService.create('api::post.post', {
        //                 data: {
        //                     ...data,
        //                     url: '/'+data.slug,
        //                     publishedAt: data.published_at,
        //                     createdAt: data.created_at,
        //                     updatedAt: data.updated_at,
        //                     createdBy: 1,
        //                     updatedBy: 1,
        //                     publishedBy: 1,
        //                 }
        //             });
        //         }
        //     } catch (e) {console.log(e);}

        //     try {
        //         for (const data of pages) {
        //             await strapi.entityService.create('api::page.page', {
        //                 data: {
        //                     ...data,
        //                     url: '/'+data.slug,
        //                     publishedAt: data.published_at,
        //                     createdAt: data.created_at,
        //                     updatedAt: data.updated_at,
        //                     locked: {locked: false},
        //                     createdBy: 1,
        //                     updatedBy: 1,
        //                     publishedBy: 1,
        //                 }
        //             });
        //         }
        //     } catch (e) {console.log(e);}

        //     try {
        //         // const pages = await (await fetch('https://www.svspectrum.nl/backend/pages?_limit=-1')).json();
        //     } catch (e) {
                
        //     }
        // }
    }
};

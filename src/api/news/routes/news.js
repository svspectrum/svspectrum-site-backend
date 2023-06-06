module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/news',
            handler: 'news.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};

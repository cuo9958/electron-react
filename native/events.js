//事件合集，默认传入app，win对象
module.exports = [
    {
        name: 'quit-app',
        fn: (app, win) => {
            app.quit();
        },
    },
];

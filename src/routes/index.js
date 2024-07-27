const postsRouter = require("./posts.route");
const partnersRouter = require("./partners.route");
const menuRouter = require("./menu.route");
const contactRouter = require("./contacts.route");
const commentRouter = require('./comments.route');
const searchRouter = require('./search.route');
const adminRouter = require('./admin.route')
function route(app) {
    app.use("/posts", postsRouter);
    app.use("/partners", partnersRouter);
    app.use("/menus", menuRouter);
    app.use("/contacts", contactRouter);
    app.use('/comments', commentRouter);
    app.use('/search', searchRouter)
    app.use('/admin', adminRouter)
}
module.exports = route;

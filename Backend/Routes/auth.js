const userController = require("../Controller/user");
const fetchUser = require("../middleware/fetchUser")
function initRoutes(app) {
    app.post("/user/signup", userController().store);


    app.post("/user/login", userController().login);
    app.post("/user/getUser", fetchUser, userController().getUser);

}
module.exports = initRoutes;

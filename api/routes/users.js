const express = require("express");
const router = express.Router();
const usersController=require("../controllers/user.controller");

router.route("")
    .get(usersController.getAll)
    .post(usersController.addOne)

    router.route("/login")
        .post(usersController.login)

module.exports = router;
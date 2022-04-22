const express = require("express");
const router = express.Router();
const tvSeriesController = require("../controllers/tvSeries.controller");
const actorController = require("../controllers/actor.controller");
const usersController=require("../controllers/user.controller");


router.route("")
    .get(tvSeriesController.getAllSeries)//working
    // .post(tvSeriesController.addOne)//working
    .post(usersController.authenticate,tvSeriesController.addOne)//working

router.route("/:seriesId")
    .get(tvSeriesController.getOne)//working
    .put(usersController.authenticate,tvSeriesController.updateOne) //working
    .delete(usersController.authenticate,tvSeriesController.deleteOne)//working 

router.route("/:seriesId/cast")
    .get(actorController.getAll)//working
    .post(usersController.authenticate,actorController.addOne);//working

router.route("/:seriesId/cast/:actorId")
    .get(actorController.getOne)//working
    .delete(usersController.authenticate,actorController.deleteOne)//working
    .put(usersController.authenticate,actorController.updateOne) //working

module.exports = router;
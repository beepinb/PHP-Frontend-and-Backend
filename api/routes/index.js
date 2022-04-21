const express = require("express");
const router = express.Router();
const seriesRoutes=require("./series");
const usersRoutes=require("./users");

router.use("/tvseries",seriesRoutes)
router.use("/users",usersRoutes)


module.exports = router;
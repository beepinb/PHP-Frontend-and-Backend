const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("User");

module.exports.getAll = function (req, res) {
    console.log("Inside get all of User Controller");
    User.find().exec(function (err, users) {
        if (err) {
            console.log("Error");
            res.status(400).json(err);
        } else if (users) {
            console.log("Users found");
            res.status(200).json(users);
        }
    })
}

module.exports.addOne = function (req, res) {
    console.log("Inside addone function of users controller");
    console.log("Request Body :", req.body);
    let response = {
        status: process.env.CREATION_STATUS_CODE,
        message: {}
    };
    if (req.body && req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, salt, function (err, passwordHash) {
            if (err) {
                response.status = process.env.INTERNAL_ERROR_CODE;
                response.message = err;
                _sendResponse(res, response);
            } else {
                const newUser = {
                    username: req.body.username,
                    fullname: req.body.fullname,
                    password: passwordHash
                };
                User.create(newUser)
                    .then((series) => _onSucessfullSeriesCreation(series, response))
                    .catch((err) => _onErrorHandler(err, response))
                    .finally(() => _sendResponse(res, response));
            }
        })
    }
}

_onSucessfullSeriesCreation = function (series, response) {
    console.log("New user added");
    response.status = 201;
    response.message = series;
}
_onErrorHandler = function (err, response) {
    console.log("Error adding new user");
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}
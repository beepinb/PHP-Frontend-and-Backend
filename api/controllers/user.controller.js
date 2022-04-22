const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const util=require("util");

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

module.exports.login=function(req,res){
    const response={
        status:200,
        message:{}
    };
    if(req.body && req.body.username&&req.body.password){
        User.findOne({username:req.body.username})
        .then((user)=>this._checkUserPassword(user,req,response))
        .catch((err)=>this._handleError(err,response))
        .finally(()=>this._sendResponse(res,response))
    }
}
_checkUserPassword=function(user,req,response){
    if(!user){
        console.log("Username not in database");
        response.status=process.env.UNAUTHORISED_CODE;
        response.message="Unauthorised";
    }else{
        if(bcrypt.compareSync(req.body.password,user.password)){
            console.log("Login Done");
            response.status=process.env.OK_STATUS;
            const token=jwt.sign({fullname:user.fullname},process.env.JWT_PASSWORD,{expiresIn:3600});
            response.message={success:true,token:token};
        }else{
            console.log("Password Incorrect");
            response.status=process.env.UNAUTHORISED_CODE;
            response.message="Unauthorised";
        }
    }
}

module.exports.addOne = function (req, res) {
    console.log("Inside addone function of users controller");
    console.log("Request Body :", req.body);
    let response = {
        status: process.env.CREATION_STATUS_CODE,
        message: {}
    };
    if (req.body && req.body.username && req.body.password) {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => CheckForErrorCreateHashThenCreateUser(err, salt, response, req, res));

    } else {
        response.status =process.env.USER_ERROR_MISSING_PARAMS;
            response.message =process.env.INCORRECT_ADD_USER_PARAMETERS;
            _sendResponse(res, response)
    }
    
}

CheckForErrorCreateHashThenCreateUser = function (err, salt, response, req, res) {
    if (err) {
        response.status = process.env.INTERNAL_ERROR_CODE;
        response.message = err;
        _sendResponse(res, response);
    } else {
        bcrypt.hash(req.body.password, salt, (err, passwordHash) => CheckForErrorAndCreateUser(err, passwordHash, response, req, res))
    }
}

CheckForErrorAndCreateUser = function (err, passwordHash, response, req, res) {
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
            .then((series) => _onSucessfullUsersCreation(series, response))
            .catch((err) => _onErrorHandler(err, response))
            .finally(() => _sendResponse(res, response));
    }
}


_onSucessfullUsersCreation = function (series, response) {
    console.log("New user added");
    response.status = 201;
    response.message = series;
}
_onErrorHandler = function (err, response) {
    console.log("Error ");
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}

module.exports.authenticate=function(req,res,next){
    const response={
        status:403,
        message:{message:"No Token Provided"}
    };
    const headerExists=req.headers.authorization;
    if(headerExists){
        const token=req.headers.authorization.split(" ")[1];
        // console.log("token",token);
        const jwtVerifyPromise=util.promisify(jwt.verify,{contex:jwt});
        jwtVerifyPromise(token,process.env.JWT_PASSWORD)
        .then(()=>next())
        .catch((err)=>this._invalidAuthorizationToken(err,res,response));
    }
}
_invalidAuthorizationToken=function(error,res,response){
    // console.log("Error ",error);
    response.status=process.env.UNAUTHORISED_CODE;
    response.message={message:"Unauthorized"};
    this._sendResponse(res,response);
}
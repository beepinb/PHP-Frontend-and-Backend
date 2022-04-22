const mongoose = require("mongoose");

const Series = mongoose.model(process.env.SERIES_MODEL);

const getAll = function (req, res) {
    console.log("Inside getAll function of Actor controller");
    const seriesId = req.params.seriesId;
    const response = {
        status: process.env.OK_STATUS,
        message: {}
    }
    let valid = mongoose.isValidObjectId(seriesId);
    if (!valid) {
        console.log("invalid Id");
        response.status = process.env.USER_ERROR_MISSING_PARAMS;
        response.message = { message: "Invalid seriesId" }
        return res.status(response.status).json(response.message)
    }

    Series.findById(seriesId).select('cast').exec()
        .then((cast) => _onSucessfullCastFoundOrNotFound(cast.cast, response))
        .catch((err) => _onErrorHandler(err, response))
        .finally(() => _sendResponse(res, response))
}



const getOne = function (req, res) {
    console.log("Inside getOne function of Actor controller");
    const actorId = req.params.actorId;
    const seriesId = req.params.seriesId;
    const response = {
        status: process.env.OK_STATUS,
        message: {}
    }
    let valid = mongoose.isValidObjectId(seriesId) && mongoose.isValidObjectId(actorId);
    if (!valid) {
        console.log("invalid Id");
        response.status = process.env.USER_ERROR_MISSING_PARAMS;
        response.message = { message: "Invalid seriesId or ActorId" }
        return res.status(response.status).json(response.message)
    }
    if (response.status !== process.env.OK_STATUS) {
        res.status(response.status).json(response.message);
    }
    else {
        Series.findById(seriesId).select("cast").exec()
            .then((series) => _onSucessfullFindOrNotFound(series, response, actorId))
            .catch((err) => _onErrorHandler(err, response))
            .finally(() => _sendResponse(res, response))
    }
}

const addOne = function (req, res) {
    console.log("Add one function in actor controller");
    const seriesId = req.params.seriesId;
    const response = {
        status: process.env.OK_STATUS,
        message: {}
    }
    let valid = mongoose.isValidObjectId(seriesId);
    if (!valid) {
        console.log("invalid Id");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { message: "Invalid seriesId" }
        return res.status(response.status).json(response.message)
    }
    Series.findById(seriesId).select("cast").exec()
        .then((series) => _onSucessfullSeriesFindOrNotFound(series, response, req, res, seriesId))
        .catch((err) => _onErrorHandler(err, response))
        .finally(() => _sendResponse(res, response))
}

const deleteOne = function (req, res) {
    console.log("Inside Deleteone of actor controller");
    const seriesId = req.params.seriesId;
    const actorId = req.params.actorId;
    const response = { status: process.env.OK_STATUS, message: {} };
    const valid = mongoose.isValidObjectId(seriesId) && mongoose.isValidObjectId(actorId);
    if (!valid) {
        console.log("invalid Id");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { message: "Invalid seriesId or CastId" }
        return res.status(response.status).json(response.message)
    }

    Series.findById(seriesId).select("cast").exec()
        .then((series) => _onSucessfullDeleteOrSeriesNotFound(series, response, seriesId, actorId, req, res))
        .catch((err) => _onErrorHandler(err, response))
        .finally(() => _sendResponse(res, response))
}

const updateOne = function (req, res) {
    const seriesId = req.params.seriesId;
    const actorId = req.params.actorId;
    const response = { status: process.env.OK_STATUS, message: {} };
    const validId = mongoose.isValidObjectId(seriesId) && mongoose.isValidObjectId(actorId);
    if (!validId) {
        console.log("invalid  seriesId or castId");
        return res.status(process.env.NOT_FOUND_STATUS).json({ "message": "Please provide valid id for series and actor" });
    }
    Series.findById(seriesId).select("cast").exec()
        .then((series) => _onSucessfulllUpdateOrNotFound(series, response, req, res))
        .catch((err) => _onErrorHandler(err, response))
        .finally(() => _sendResponse(res, response))
}

_onSucessfulllUpdateOrNotFound = function (series, response, req, res) {
    if (!series) {
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = "Error Finding Series";
        console.log("Series doesn't exist for this id");
    }
    else if (series) {
        _updateActor(req, res, series);
    }
}

const _updateActor = function (req, res, series) {
    const actorId = req.params.actorId;
    if (!series.cast.id(actorId)) {
        console.log("author doesn't exist");
        return res.status(process.env.NOT_FOUND_STATUS).json({ "message": "author not found for given author Id" });
    }
    if (!req.body.name) {
        console.log("new author doesn't contains name");
        return res.status(process.env.USER_ERROR_MISSING_PARAMS).json({ message: "Author name is required" });
    }
    series.cast =
        series.cast.map(cast => {
            if (cast._id == actorId) {
                return { ...req.body, ...cast };
            } return cast;

        });
    _saveSeries(res, series);
}
const _saveSeries = function (res, series) {
    series.save(function (err, updatedSeries) {
        const response = { status: process.env.OK_STATUS, message: [] };
        if (err) {
            response.status = process.env.INTERNAL_ERROR_CODE;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedSeries.authors;
        }
        // res.status(response.status).json(response.message);
    })
}
_onSucessfullCastFoundOrNotFound = function (cast, response) {
    if (cast) {
        console.log("List of casts Found");
        response.status = process.env.OK_STATUS;
        response.message = cast;
    } else {
        console.log("There are no casts in this series");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = "Casts doesn't exist for the given Series";
    }
}
_onErrorHandler = function (err, response) {
    console.log("Error happened");
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}

_onSucessfullFindOrNotFound = function (series, response, actorId) {
    if (series.cast.id(actorId) === null) {
        console.log("Cast is null");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { message: "There is no Cast with given id" };
    }
    else if (series) {
        console.log("Found Cast");
        response.status = process.env.OK_STATUS;
        response.message = series.cast.id(actorId);
    }
}

_onSucessfullSeriesFindOrNotFound = function (series, response, req, res, seriesId) {
    if (!series) {
        console.log("Error finding series");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { "message": "series ID not found " + seriesId };
    }
    else if (series) {
        console.log("Series: ", series);
        console.log("Body Name:", req.body.name);
        _addActor(req, res, series);
    }
}

const _addActor = function (req, res, series) {
    const newCast = {};
    if (req.body.name) { newCast.name = req.body.name };
    if (req.body.age) { newCast.age = req.body.age };
    console.log(newCast);
    series.cast.push(newCast);
    _saveSeries(res, series);
}

_onSucessfullDeleteOrSeriesNotFound = function (series, response, seriesId, actorId, req, res) {
    if (!series) {
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = "Error Finding series";
        console.log("series doesn't exist for the id", seriesId);
    }
    if (series) {
        _deleteCast(req, res, series, actorId);
    }
}

const _deleteCast = function (req, res, series, actorId) {
    if (!series.cast.id(actorId)) {
        console.log("author doesn't exist");
        return res.status(process.env.NOT_FOUND_STATUS).json({ "message": "author not found for given author Id" });
    }
    series.cast = series.cast.filter(author => author._id != actorId);
    _saveSeries(res, series);

}


module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
}
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIES_MODEL);

const _updateOne = function (req, res, seriesUpdateCallback) {
    console.log("Inside updateone callback");
    console.log(req.body);
    let response = {
        status: 204,
        message: {}
    };
    const seriesId = req.params.seriesId;
    let valid = mongoose.isValidObjectId(seriesId);
    if (!valid) {
        console.log("invalid Id");
        response.status = 400;
        response.message = { message: "Invalid seriesId" }
        return res.status(response.status).json(response.message)
    }
    Series.findById(seriesId).exec(function (err, series) {
        console.log("Found Series: ", series.title);
        if (err) {
            response.status = process.env.INTERNAL_ERROR_CODE;
            response.message = err;
        } else if (!series) {
            console.log("Series with given Id not found");
            response.status = process.env.NOT_FOUND_STATUS;
            response.message = { message: "There is no Series with given id" };
        }
        seriesUpdateCallback(req, res, series);
        console.log("Updated Sucessfully");
        res.status(response.status).json(response.message);

    });
}

module.exports.getOne = function (req, res) {
    const seriesId = req.params.seriesId;
    let valid = mongoose.isValidObjectId(seriesId);
    const response = { status: process.env.CREATION_STATUS_CODE, message: {} };
    if (valid) {
        // Series.findById(seriesId).exec(function (err, series) {
        //     const response = { status: process.env.CREATION_STATUS_CODE, message: {} };
        //     if (err) {
        //         response.status = 500;
        //         response.message = err;
        //     } else {
        //         if (series) {
        //             console.log("Series Found");
        //             response.status = process.env.CREATION_STATUS_CODE;
        //             response.message = series;
        //         } else {
        //             console.log("Series is null");
        //             response.status = 404;
        //             response.message = { message: "There is no Series with given id" };
        //         }
        //     }
        //     res.status(response.status).json(response.message);
        // })
        Series.findById(seriesId)
            .then((series) => _onSucessfullFindOrNull(series, response))
            .catch((err) => _onErrorHandler(err, response))
            .finally(() => _sendResponse(res, response));
    } else {
        console.log("Invalid Series Id");
        res.status(404).json({ message: "Invalid Series Id" });
    }
}

_onSucessfullFindOrNull = function (series, response) {
    if (series) {
        console.log("Series Found");
        response.status = process.env.OK_STATUS;
        response.message = series;
    }
    else {
        console.log("Series not found");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { message: "There is no Series with given Id" };
    }
}


module.exports.getAllSeries = function (req, res) {
    console.log("Inside Series Controller");
    const response = {
        status: process.env.CREATION_STATUS_CODE,
        message: {}
    };
    let offset = 0;
    let count = 20;
    const maxCount = 20;
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not a number");
        response.status = 400;
        response.message = { message: "offset and count must be digits" };
    }
    else if (count > maxCount) {
        console.log("count greater than max");
        response.status = 400;
        response.message = { message: "count must be less than 10" };
    }
    if (response.status !== process.env.CREATION_STATUS_CODE) {
        res.status(response.status).json(response.message);
    } else {
        Series.find().skip(offset).limit(count).exec()
            .then((series) => _onSucessfullSeriesFound(series, response))
            .catch((err) => _onErrorHandler(err, response))
            .finally(() => _sendResponse(res, response))
    }
}

_onSucessfullSeriesFound = function (series, response) {
    console.log("List of TvSeries Found");
    response.status = process.env.OK_STATUS;
    response.message = series;
}

module.exports.addOne = function (req, res) {
    console.log("Inside addone function of tvseries controller");
    console.log("Request Body :", req.body);
    let response = {
        status: process.env.CREATION_STATUS_CODE,
        message: {}
    };
    const newSeries = {
        title: req.body.title, year: req.body.year, cast: req.body.cast
    };

    Series.create(newSeries)
        .then((series) => _onSucessfullSeriesCreation(series, response))
        .catch((err) => _onErrorHandler(err, response))
        .finally(() => _sendResponse(res, response));
}
_onSucessfullSeriesCreation = function (series, response) {
    console.log("New series added");
    response.status = 201;
    response.message = series;
}
_onErrorHandler = function (err, response) {
    // console.log("Error adding new series");
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}

module.exports.updateOne = function (req, res) {
    console.log("Inside update one of tvSeries controller");
    seriesUpdate = function (req, res, series, response) {
        if (req.body.title) { series.title = req.body.title; }
        if (req.body.year) { series.year = req.body.year; }
        if (req.body.cast) { series.cast = req.body.cast; }

        series.save(function (err, updatedSeries) {
            if (err) {
                response.status = process.env.INTERNAL_ERROR_CODE;
                response.message = err;
                res.status(response.status).json(response.message);
            }
        });
    }
    _updateOne(req, res, seriesUpdate);

}

module.exports.deleteOne = function (req, res) {

    console.log("Inside deleteOne of Series Controller");
    const seriesId = req.params.seriesId;

    const response = { status: process.env.DELETE_SUCCESS_STATUS_CODE, message: {} };
    Series.findByIdAndDelete(seriesId)
        .then((deletedSeries) => _onSucessfullDeletionOrNull(deletedSeries, response))
        .catch((err) => _onErrorDeletion(err, response, deletedSeries))
        .finally(() => _sendResponse(res, response));
}

_onSucessfullDeletionOrNull = function (deletedSeries, response) {
    if (!deletedSeries) {
        console.log("Series id not found");
        response.status = process.env.NOT_FOUND_STATUS;
        response.message = { "message": "Series ID not found" };
    } else {
        console.log("Series Deleted Successfully");
        response.status = process.env.DELETE_SUCCESS_STATUS_CODE;
        response.message = deletedSeries;
    }
}
_onErrorDeletion = function (err, response) {
    if (err) {
        console.log("Error finding Series");
        response.status = process.env.INTERNAL_ERROR_CODE;
        response.message = err;
    }
}
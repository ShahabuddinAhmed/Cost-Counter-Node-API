const mongoose = require('mongoose');
const May = require('../models/may');

exports.may_get_all = (req, res, next) => {
    May.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json({
                message: "Data is successfully gotten",
                count: docs.length,
                docs
            });
        } else {
            res.status(404).json({
                message: "Users document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    })
}

exports.may_post = (req, res, next) => {
    const may = new May({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        cost: req.body.cost,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        users_id: req.body.users_id
    });
    may
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Data successfully is added',
            userInfo: may
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.may_get_one = (req, res, next) => {
    const id = req.params.userID;
    May.find({users_id: id})
    .exec()
    .then(doc => {
        if(doc.length >=1) {
            console.log("From database", doc);
            res.status(200).json({
                message: "Data is successfully gotten by provided ID",
                count: doc.length,
                doc
            });
        } else {
            res.status(404).json({
                message: "No data is found by provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.may_update = (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    May.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Data is successfully updated",
            result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.may_delete = (req, res, next) => {
    const id = req.params.userID;
    May.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Data is successfully deleted",
            result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}
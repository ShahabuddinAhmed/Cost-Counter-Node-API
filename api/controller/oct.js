const mongoose = require('mongoose');
const Oct = require('../models/oct');

exports.oct_get_all = (req, res, next) => {
    Oct.find()
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

exports.oct_post = (req, res, next) => {
    const oct = new Oct({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        cost: req.body.cost,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        users_id: req.body.users_id
    });
    oct
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Data successfully is added',
            userInfo: oct
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.oct_get_one = (req, res, next) => {
    const id = req.params.userID;
    Oct.find({users_id: id})
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

exports.oct_update = (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    Oct.update({ _id: id }, { $set: updateOps })
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

exports.oct_delete = (req, res, next) => {
    const id = req.params.userID;
    Oct.remove({ _id: id })
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
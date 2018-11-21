const Aug = require('../models/aug');
const mongoose = require('mongoose');

exports.aug_get_all = (req, res, next) => {
    Aug.find()
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

exports.aug_post = (req, res, next) => {
    const aug = new Aug({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        cost: req.body.cost,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        users_id: req.body.users_id
    });
    aug
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Data successfully is added',
            userInfo: aug
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.aug_get_one = (req, res, next) => {
    const id = req.params.userID;
    Aug.find({users_id: id})
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

exports.aug_update = (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    Aug.update({ _id: id }, { $set: updateOps })
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

exports.aug_delete = (req, res, next) => {
    const id = req.params.userID;
    Aug.remove({ _id: id })
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
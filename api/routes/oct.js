const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Oct = require('../models/oct');

router.get('/', (req, res, next) => {
    Oct.find()
    .exec()
    .then(docs => {
        if(docs > 0) {
            console.log("From database", docs);
            res.status(200).json({
                message: "Data is successfully gotten",
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
});

router.post('/', (req, res, next) => {
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
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Data successfully is added',
        userInfo: oct
    });
});

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    Oct.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            console.log("From database", doc);
            res.status(200).json({
                message: "Data is successfully gotten by provided ID",
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
});

router.patch('/:userID', (req, res, next) => {
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
});

router.delete('/:userID', (req, res, next) => {
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
});

module.exports = router;
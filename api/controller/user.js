const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_all_user = (req, res, next) => {
    Users.find()
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
    });
}

exports.user_register = (req, res, next) => {
    Users.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >=1) {
            return res.status(409).json({
                message: "This email is exit"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new Users({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        address: req.body.address,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Data successfully is added',
                            userInfo: user
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_login = (req, res, next) => {
    Users.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "10m"
                    }
                );
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token
                });
            } 
            return res.status(401).json({
                message: "Authentication failed"
            });  
        });
    });
}

exports.get_one_user = (req, res, next) => {
    const id = req.params.userID;
    Users.findById(id)
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
}

exports.update_user = (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    Users.update({ _id: id }, { $set: updateOps })
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

exports.detelete_user = (req, res, next) => {
    const id = req.params.userID;
    Users.remove({ _id: id })
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
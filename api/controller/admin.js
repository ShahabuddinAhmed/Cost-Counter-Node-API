const mongoose = require('mongoose');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllAdmin = (req, res, next) => {
    Admin.find()
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

exports.createAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            });
            admin
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Data successfully is added',
                    userInfo: admin
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

exports.adminLogin = (req, res, next) => {
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin.length < 1) {
            return res.status(401).json({
                message: "Admin Authentication failed"
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Admin Authentication failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                        email: admin[0].email,
                        adminId: admin[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "3m"
                    }
                );
                return res.status(200).json({
                    message: "Admin Authentication successful",
                    token: token
                });
            } 
            return res.status(401).json({
                message: "Admin Authentication failed"
            });  
        });
    });
}

exports.getOneAdmin = (req, res, next) => {
    const id = req.params.userID;
    Admin.findById(id)
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

exports.updateAdmin = (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.updateName] = ops.value;
    }
    Admin.update({ _id: id }, { $set: updateOps })
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

exports.deleteAdmin = (req, res, next) => {
    const id = req.params.userID;
    Admin.remove({ _id: id })
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
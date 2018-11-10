const mongoose = require('mongoose');

const augSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

module.exports = mongoose.model("Aug", augSchema);
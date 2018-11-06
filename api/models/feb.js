const mongoose = require('mongoose');

const febSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    itemName: { type: String, required: true },
    cost: { type: Integer, required: true },
    users_id: { type: String, required: true, unique: true }
});
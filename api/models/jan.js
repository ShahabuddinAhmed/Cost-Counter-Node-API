const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    itemName: { type: String, required },
    cost: { type: Integer, required },
    users_id: { type: String, required: true, unique: true }
});
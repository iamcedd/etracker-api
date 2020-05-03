const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    remarks: String,
    status: { type: String, default: "O" },
    version: { type: Number, default: 1 },
    is_deleted: { type: Boolean, default: false },
    assigned_to: { type: String, required: true },
    updated_at: Date,
    updated_by: String,
    inserted_at: { type: Date, default: Date.now },
    inserted_by: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);

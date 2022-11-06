const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
    {
        user: {//other model object id ( as foreign key)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'//reference model 
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: "General"
        },
        favorite: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
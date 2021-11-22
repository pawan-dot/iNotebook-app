const { ValidatorsImpl } = require("express-validator/src/chain");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate(value) {
            //     if (Validators.isEmail()) {
            //         throw new error("Enater a valid email")
            //     }
            // }
            match:
                /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 5
            // body('password', "Password must be 5 charector").isLength({ min: 5 }),
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

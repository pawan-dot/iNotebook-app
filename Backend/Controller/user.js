const user = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser")
//const Notes = require("../models/Notes");

function userController() {
    return {
        //handle create data
        store(req, res, next) {
            // const { name, email, password } = req.body;
            // if (name.length < 3) {
            //     res.send()
            // }
            //             User.create({
            //                 username: req.body.username,
            //                 password: req.body.password,
            //             }).then(user => res.json(user));
            //         },
            // );
            //         const data = new user(req.body);
            //         data.save()
            //             .then(item => {

            //                 res.status(201).json({
            //                     message: "User Resister Successfully",
            //                     user: item,
            //                 });

            //             })

            //             .catch((err) => {
            //                 res.status(400).json(err);
            //             });


            //console.log(req.body)
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            // password hash
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    return res.json({
                        message: "Something Wrong! Try Later",
                        Error: err,
                    });
                } else {
                    const userDtails = new user({
                        name: name,
                        email: email,
                        password: hash,
                    });
                    const data = userDtails
                        .save()
                        .then((dok) => {
                            res.status(201).json({
                                message: "User Resister Successfully",
                                user: dok
                            });

                        })
                        .catch((err) => {
                            res.status(400).json(err);
                        });
                }
            });

        },
        login(req, res, next) {
            const email = req.body.email;
            user
                .find({ email: email })
                .exec()
                .then((user) => {
                    if (user.length < 1) {
                        res.status(404).json({
                            message: "Auth Failed",
                        });
                    } else {
                        bcrypt.compare(
                            req.body.password,
                            user[0].password,
                            function (err, result) {
                                if (err) {
                                    res.status(404).json({
                                        message: "Auth Failed",
                                    });
                                }
                                if (result) {
                                    //generate token
                                    //const secret = "secret"
                                    const token = jwt.sign(
                                        {
                                            email: user[0].email,
                                            userid: user[0]._id,
                                        },
                                        'secret',
                                        {
                                            expiresIn: "24h",
                                        }
                                    );
                                    res.status(200).json({
                                        message: "User Found",
                                        token: token,
                                    });
                                } else {
                                    res.status(404).json({
                                        message: "Auth Failed",
                                    });
                                }
                            }
                        );
                    }
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        },
        //get logged in user Details from token:loggedin require
        async getUser(req, res, next) {
            try {
                userId = req.user.userid;//find user id from decode token

                //console.log(userId)

                //fetch user all details
                const user = await user.findById(userId).select("-password");//when user come we select all field except password
                res.send(user)
            }

            catch (error) {
                res.status(401).send({ error: "please authenticate using a valid user token6" })
            }
        }
    };

}
module.exports = userController;

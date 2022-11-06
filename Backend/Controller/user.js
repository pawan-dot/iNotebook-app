const User = require("../models/user");
const fetchUser = require("../middleware/fetchUser")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const crypto = require("crypto");
const cloudinary = require("../utils/cloudinary");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    let findUser = await User.findOne({ email });
    if (findUser) {
        return res
            .status(400)
            .json({ success: false, message: "User already exists" });
    }
    console.log(req.body)
    console.log(req.file)
    const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "iNotebook/user",
        width: 150,
        crop: "scale"
    });


    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            // public_id: "photo",
            // url: "simple",
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },

    });

    sendToken(user, 201, res);
});
// 2.Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return res.status(400).json({
            msg: "Please Enter Email & Password"
        })
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({
            msg: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            msg: "Invalid email or password"
        })
    }

    sendToken(user, 200, res);
});


// 3.Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
//4. Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
});



// 4.Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: "User not found" });
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    //create link for send mail
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/api/user/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}:/api/user/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


    const message = `Your password reset token are :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(res.status(500).json(error.message,));
    }
});


// 5.Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(res.status(400).json({ success: false, message: "Reset Password Token is invalid or has been expired" })
        );
    }
    //replace previous password 
    if (req.body.password !== req.body.confirmPassword) {
        return res
            .status(400)
            .json({ success: false, message: "Password does not password" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// //6.Get User Detail
// exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//         success: true,
//         user,
//     });
// });

// 7.update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {

        return res
            .status(400)
            .json({ success: false, message: "Old password is incorrect" });

    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res
            .status(400)
            .json({ success: false, message: "password does not match" });
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// 8.update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.file) {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;
        //delete previos image
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "iNotebook/user",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

// 9.Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

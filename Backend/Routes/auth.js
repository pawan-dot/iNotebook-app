
const express = require("express");
const multer = require("multer");
const path = require("path");

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updateProfile,
    updatePassword


} = require("../Controller/user");
// multer
const uploaderImage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type not supported!"), false)
            return
        }
        cb(null, true);
    }
});
// 
const { isAuthenticatedUser, } = require("../middleware/fetchUser")

const router = express.Router();

router.route("/user/register").post(uploaderImage.single('avatar'), registerUser);

router.route("/user/login").post(loginUser);
router.route("/user/me").get(isAuthenticatedUser, getUserDetails);


router.route("/user/logout").get(logout);

// router.route("/user/password/forgot").post(forgotPassword);

// router.route("/user/password/reset/:token").put(resetPassword);

router.route("/user/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/user/profile/update").put(isAuthenticatedUser, uploaderImage.single('avatar'), updateProfile);

module.exports = router;
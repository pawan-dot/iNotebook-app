
const express = require("express");

const {
    AllNotes,
    AddNotes,
    EditNotes,
    AddFavoriteOrRemove,
    getSingleNote,
    DeleteNotes

} = require("../Controller/Notes");
const { isAuthenticatedUser, } = require("../middleware/fetchUser")

const router = express.Router();
router.route("/notes/addNotes").post(isAuthenticatedUser, AddNotes)
router.route("/notes/getAll").get(isAuthenticatedUser, AllNotes);
router.route("/notes/getOne/:id").get(isAuthenticatedUser, getSingleNote);

router.route("/notes/addFavoriteOrRemove/:id").get(isAuthenticatedUser, AddFavoriteOrRemove);

router.route("/notes/edit/:id").put(isAuthenticatedUser, EditNotes);


router.route("/notes/delete/:id").delete(isAuthenticatedUser, DeleteNotes);

module.exports = router;
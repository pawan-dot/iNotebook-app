//const userController = require("../Controller/user");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const fetchUser = require("../middleware/fetchUser");
const express = require("express");
const router = express.Router();
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        //console.log(req.user)/ / find user
        const notes = await Notes.find({ userid: req.user.userid });
        //console.log(req.user.userid)//find user id
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error" })
    }

});
//add a new notes(create note)
router.post(
    "/addNotes",
    [
        body("title", "Enter valid title(min length 3)").isLength({ min: 3 }),
        body("description", " description must be atleast 5 charectoe").isLength({
            min: 5,
        }),
        // password must be at least 5 chars long
    ],
    fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;//de structuring 
            //console.log(req.body);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({//white a new notes
                title, description, tag, user: req.user.userid
            });
            const saveNote = await note.save();
            res.json(saveNote);
            // res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal server error" })

        }

    }
);

//route 3:update a existing notes
router.put(
    "/updateNotes/:id", fetchUser, async (req, res) => {
        const { title, description, tag } = req.body;//de structuring 
        try {
            //create a newNote
            const newNotes = {};
            //getting fild add to newnotes
            if (title) { newNotes.title = title };
            if (description) { newNotes.description = description };
            if (tag) { newNotes.tag = tag };
            //securing app
            let note = await Notes.findById(req.params.id);
            //console.log(note);
            //if not a valid id
            if (!note) { return res.status(404).send("Not Found") }
            //note.user.toString() giving  note id 
            if (note.user.toString() !== req.user.userid) {
                return res.status(401).send("Not Allowed")
            } else {
                note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
                res.json({ note });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal server error" })

        }
    }
)

// route 4 :delete a existing notes
router.delete(
    "/deleteNotes/:id", fetchUser, async (req, res) => {
        // const { title, description, tag } = req.body;//de structuring
        try {
            //create a newNote
            //find the note andto deelete it
            let note = await Notes.findById(req.params.id);
            //console.log(note);
            //if not a valid id
            if (!note) { return res.status(404).send("Not Found") }
            //Allow deletion only if user owns this Note
            if (note.user.toString() !== req.user.userid) {
                return res.status(401).send("Not Allowed j")
            } else {
                note = await Notes.findByIdAndDelete(req.params.id)
                res.json({ "success": "Note has been deleted", note: note });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal server error" })

        }


    }
)


module.exports = router;

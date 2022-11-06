



const Notes = require("../models/Notes");
//1.add a new notes(create note)
exports.AddNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;//de structuring 
        //console.log(req.body);


        if (title.length < 3) {
            return res.status(400).json({ msg: "title should be minimum  3 charector" });
        }
        if (description.length < 5) {
            return res.status(400).json({ msg: "description should be minimum  5 charector" });
        }
        const note = new Notes({//create a new notes
            title, description, tag, user: req.user.id
        });
        await note.save();
        res.status(201).json({
            success: true,
            message: "nodes added successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//  2: Get All the Notes 
exports.AllNotes = async (req, res) => {


    try {
        //appy api feature(search,pagination,limit)
        // const currentPage = parseInt(req.query.page) - 1 || 0;
        // const resultPerPage = parseInt(req.query.limit) || 15;
        const search = req.query.keyword || "";
        //find contact with condition

        const notes = await Notes.find({
            title: { $regex: search, $options: "i" }
            ,


            // description: { $regex: search, $options: "i" },


            // createdAt: {
            //     "$gte": new Date("2022-10-28"), "$lt": new Date("2022-10-29")
            // }
        }

        )
            .sort({ createdAt: -1 })
        // .skip(currentPage * resultPerPage)
        // .limit(resultPerPage);


        if (!notes) {
            return res.status(404).json("No Notes Exist");
        }
        const totalNotes = await Notes.countDocuments({
            title: { $regex: search, $options: "i" },
            // createdAt: {
            //     "$gte": new Date("2022-10-28"), "$lt": new Date("2022-10-29")
            // }// searching from name,case insensitive
        });
        //send response
        res.status(200).json({
            success: true,
            totalNotes,
            // currentPage: currentPage + 1,
            // resultPerPage,
            notes,
        });
        // const notes = await Notes.find({ user: req.user.id }).sort({ createdAt: -1 });
        // if (!notes) {
        //     return res.status(404).json("No Notes Exist");
        // }
        // res.status(200).json({
        //     success: true,
        //     message: "Added Successfully",
        //     notes
        // });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//3:update a existing notes
exports.EditNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;//de structuring 

        if (title.length < 3) {
            return res.status(400).json({ msg: "title should be minimum  3 charector" });
        }

        if (description.length < 5) {
            return res.status(400).json({ msg: "description should be minimum  5 charector" });
        }
        //create a newNote
        const newNotes = {};

        //getting fild add to newnotes
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };


        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json("Not Found") }


        //note.user.toString() giving  note id 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed")
        } else {
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })


        }
        res.status(200).json({
            success: true,
            note,
            message: "Notes Updated",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}


//  4 :delete a existing notes

exports.DeleteNotes = async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        //if not a valid id
        if (!note) { return res.status(404).json(" Note Not Found") }
        //Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed ")
        } else {
            note = await Notes.findByIdAndDelete(req.params.id)

        }
        res.status(201).json({
            success: true,
            message: "Note has been deleted",
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

//  6:add favorite or remove fevorite
exports.AddFavoriteOrRemove = async (req, res) => {


    try {

        const note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).json("No Note Exist");
        }
        note.favorite === false ? note.favorite = true : note.favorite = false

        note.save()
        res.status(200).json({
            success: true,
            message: `${note.favorite === false ? "Removed from favorite" : "Added to favorite"}`,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
//  7:view single Notes
exports.getSingleNote = async (req, res) => {


    try {
        if (!req.params.id) {
            return res.status(404).json("Please Provide Node ID");
        }

        const note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).json("No Note Exist");
        }
        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


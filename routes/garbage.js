const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/filter");
const Notes = require("../models/Garbage");
// const { body, validationResult } = require("express-validator");

//Route 1 get all the notes in User detail using :GET "/api/notes/fetchallnotes".login requiered
router.get("/fetchallinfo", fetchuser, async (req, res) => {
  try {
    const notes = await Garbage.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 2 to add new notes in User detail using :POST "/api/notes/addnote".login requiered

//Route 3 to update  notes in User detail using :PUT: "/api/notes/updatenote".login requiered
// router.put("/updatenote/:id", fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
//   try {
//     //create a newNote object
//     const newNote = {};
//     if (title) {
//       newNote.title = title;
//     }
//     if (description) {
//       newNote.description = description;
//     }
//     if (tag) {
//       newNote.tag = tag;
//     }

//     //find the note to be updated and update it
//     let note = await Notes.findById(req.params.id);
//     if (!note) {
//       return res.status(404).send("Not found");
//     }
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("not authorised");
//     }
//     note = await Notes.findByIdAndUpdate(
//       req.params.id,
//       { $set: newNote },
//       { new: true }
//     );
//     res.json({ note });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });
// //Route 4 to delte a note in User detail using :DELETE: "/api/notes/deletenote".login requiered
// router.delete("/deletenote/:id", fetchuser, async (req, res) => {

//   try {
//     //find the note to be delted and deleted it
//     let note = await Notes.findById(req.params.id);
//     if (!note) {
//       return res.status(404).send("Not found");
//     }
//     //allow deletion if owner owns the note
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("not authorised");
//     }
//     note = await Notes.findByIdAndDelete(req.params.id);
//     res.json({ success: "note has been deleted", note: note });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });
// router.delete("/deleteallnote", fetchuser, async (req, res) => {

//   try {
//     //find the note to be delted and deleted it
//     let notes = await Notes.find({ user: req.user.id });
//     if (!notes[0]) {
//       return res.status(404).send("Not found");
//     }
//     //allow deletion if owner owns the note
//     if (notes[0].user.toString() !== req.user.id) {
//       return res.status(401).send("not authorised");
//     }
   
//     while(notes!==null)
//     notes = await Notes.findOneAndDelete({ user: req.user.id }) ;
//     res.json({ success: "all note has been deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });
module.exports = router;

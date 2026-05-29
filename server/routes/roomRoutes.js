const express = require("express");
const Room = require("../models/Room");

const router = express.Router();


// CREATE ROOM
router.post("/create", async (req, res) => {
  try {
    const { roomName, createdBy } = req.body;

    const room = await Room.create({
      roomName,
      createdBy,
    });

    res.status(201).json(room);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL ROOMS
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({
      createdAt: -1,
    });

    res.json(rooms);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// DELETE ROOM
router.delete("/:id", async (req, res) => {
  try {

    await Room.findByIdAndDelete(req.params.id);

    res.json({
      message: "Room deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


module.exports = router;
const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/RoomController");
const adminOnly = require("../middlewares/AdminOnly");

router.get("/", RoomController.listRooms);
router.post("/", adminOnly, RoomController.createRoom);
router.put("/:id", adminOnly, RoomController.updateRoom);
router.delete("/:id", adminOnly, RoomController.deleteRoom);

module.exports = router;

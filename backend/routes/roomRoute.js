import express from "express";
import roomModel from '../models/room.js';

//const router = express.Router();

const router = express.Router();

router.get("/getallrooms", async (req, res) => {

    try {
        const rooms = await roomModel.find({});
        return res.json( rooms );
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.get("/:roomid", async (req, res) => {
    const roomid = req.params.roomid
    

    //console.log(roomid);
    try {
        const room = await roomModel.findOne({ _id: roomid })
        
        return res.json(room);
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

export default router




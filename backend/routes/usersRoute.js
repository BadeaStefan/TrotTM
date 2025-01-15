import express from "express";
import userModel from '../models/user.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const newUser = new userModel(req.body);

    try {
        const user = await newUser.save();
        return res.json('User registered succesfuly');
    } catch (error) {
        res.error.status(400).json(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email, password: password });
        ;
        if (user) {
            res.json(user);
        } else {
            return res.status(400).json({ massage: 'login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.get("/getallusers", async (req, res) => {

    try {
        const users = await userModel.find();
        res.json(users);

    } catch (error) {
        res.error.status(400).json(error);
    }

});



export default router;
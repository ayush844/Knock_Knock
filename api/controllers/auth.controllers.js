import User from "../models/user.model.js";

import bcryptjs from "bcryptjs";




export const signup = async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        
    } catch (error) {
        
        res.status(500).json(error.message);

    }



    res.status(200).json({
        message: "user created successfuly"
    })
}
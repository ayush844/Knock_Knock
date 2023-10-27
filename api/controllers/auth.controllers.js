import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";




export const signUp = async (req, res, next) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {

        await newUser.save();

        res.status(200).json({
            message: "user created successfuly"
        })
        
    } catch (error) {
        
        // res.status(500).json(error.message);
        next(error);
    }

}


export const signIn = async (req, res, next) => {

    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email});
        
        if(!validUser) return next(errorHandler(404, "user not found"));
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        
        if(!validPassword){
            return next(errorHandler(401, "wrong credentials"));
        }
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        res
        .cookie('access_token', token, {httpOnly: true })
        .json(rest)
        .status(200);
        
        
    } catch (error) {
        next(error);
    }


}



export const google = async(req, res, next) => {
    try {
        
        const user = await User.findOne({email: req.body.email});

        if(user){

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;

            res
            .cookie('access_token', token, {httpOnly: true })
            .json(rest)
            .status(200);



        }else{

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const {password: pass, ...rest} = newUser._doc;

            res
            .cookie('access_token', token, {httpOnly: true })
            .json(rest)
            .status(200);

        }

    } catch (error) {
        next(error);
    }
}
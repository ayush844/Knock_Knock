import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://cdn3.iconfinder.com/data/icons/galaxy-open-line-gradient-i/200/contacts-512.png"
    }
    
}, {timestamps: true});


const User = new mongoose.model('User', userSchema);


export default User;
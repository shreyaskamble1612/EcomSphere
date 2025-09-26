import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:String,
        enum:["user","admin"],  
        default:"user"
    },
    // Account Settings
    notifications: {
        orderUpdates: {
            type: Boolean,
            default: true
        },
        promotions: {
            type: Boolean,
            default: true
        },
        newsletter: {
            type: Boolean,
            default: false
        },
        securityAlerts: {
            type: Boolean,
            default: true
        }
    },
    privacy: {
        profileVisibility: {
            type: String,
            enum: ["public", "friends", "private"],
            default: "public"
        },
        dataCollection: {
            type: Boolean,
            default: true
        },
        thirdPartySharing: {
            type: Boolean,
            default: false
        },
        analytics: {
            type: Boolean,
            default: true
        }
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;
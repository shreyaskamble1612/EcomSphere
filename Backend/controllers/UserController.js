import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

//User Registration
const registerUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {name,email,password} = req.body;

        //check if user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create and save new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "User registered successfully", success: true});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error",success:false});
    }
    
}

//user Login
const LoginUser = async (req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"7d"}); // 7 days instead of 1 hour
        res.status(200).json({token:token,success:true});


    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error",success:false});
    }
}

// Get current user
const getMe = async (req, res) => {
    try {
        // Handle different token structures
        const userId = req.user.user?.id || req.user.id || req.user._id;
        
        if (!userId) {
            console.error("No user ID found in token");
            return res.status(401).json({ message: "Invalid token structure" });
        }
        
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ 
            success: true, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                notifications: user.notifications || {
                    orderUpdates: true,
                    promotions: true,
                    newsletter: false,
                    securityAlerts: true
                },
                privacy: user.privacy || {
                    profileVisibility: "public",
                    dataCollection: true,
                    thirdPartySharing: false,
                    analytics: true
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", success: false });
    }
}

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("req.user:", req.user); // Debug log
        const { name, email } = req.body;
        
        // Handle different token structures
        const userId = req.user.user?.id || req.user.id || req.user._id;
        
        if (!userId) {
            console.error("No user ID found in token");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                ...(name && { name }),
                ...(email && { email })
            },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", success: false });
    }
}

// Update notification settings
const updateNotificationSettings = async (req, res) => {
    try {
        console.log("Updating notifications - req.user:", req.user); // Debug log
        const { notifications } = req.body;
        
        // Handle different token structures
        const userId = req.user.user?.id || req.user.id || req.user._id;
        
        if (!userId) {
            console.error("No user ID found in token");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { notifications },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Notification settings updated successfully",
            notifications: updatedUser.notifications
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", success: false });
    }
}

// Update privacy settings
const updatePrivacySettings = async (req, res) => {
    try {
        console.log("Updating privacy - req.user:", req.user); // Debug log
        const { privacy } = req.body;
        
        // Handle different token structures
        const userId = req.user.user?.id || req.user.id || req.user._id;
        
        if (!userId) {
            console.error("No user ID found in token");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { privacy },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Privacy settings updated successfully",
            privacy: updatedUser.privacy
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", success: false });
    }
}

// Change password
const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;
        
        // Handle different token structures
        const userId = req.user.user?.id || req.user.id || req.user._id;
        
        if (!userId) {
            console.error("No user ID found in token");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // Get user with password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Check if new password is different from current
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", success: false });
    }
}


export {registerUser, LoginUser, getMe, updateProfile, updateNotificationSettings, updatePrivacySettings, changePassword};
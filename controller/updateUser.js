const User = require("../models/userModel");

const updateUser = async(req, res) => {
    try{

        const sessionUser = req.userId;

         const {userId, email, name, role} = req.body;
         const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

         //check the current user is admin or not
         const user = await User.findById(sessionUser)

         const updateUser = await User.findByIdAndUpdate(userId, payload);
         res.json({message: "User updated successfully", error: false, success: true, data: updateUser});
    }catch(error){
        res.status(400).json({message: error.message, error:true, success:false});
    }
}

module.exports = updateUser;
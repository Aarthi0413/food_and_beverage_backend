const User = require("../models/userModel");

const userDetails = async(req, res) => {
    try{
        const user = await User.findById(req.userId);
        
        res.status(200).json({message: "User details", data: user, error: false, success: true});
    }catch(error){
        res.status(400).json({message: error.message, error:true, success:false});
    }
}

module.exports = userDetails;
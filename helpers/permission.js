const User = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await User.findById(userId)

    if(user.role !== "ADMIN"){
        return false
    }
    return true
}   

module.exports = uploadProductPermission
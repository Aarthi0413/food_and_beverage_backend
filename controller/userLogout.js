const userLogout = async(req, res) => {
    try{
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }

        res.clearCookie("token", tokenOption );

        res.json({message: "Logout successfully", error: false, success: true, data:[]});

    }catch(error){
        res.json({message: error.message, error:true, success:false});
    }
}

module.exports = userLogout;
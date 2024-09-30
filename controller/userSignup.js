const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userSignup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists with this email'});
        }

        if(!name){
            return res.status(400).json({message: 'Please provide an name'});
        }
        if(!email){
            return res.status(400).json({message: 'Please provide an email'});
        }
        if(!password){
            return res.status(400).json({message: 'Please provide a password'});
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if(!hashedPassword){
            return res.status(500).json({message: 'Failed to hash password'});
        }

        // save the password in the database
        const userData = new User({
            name,
            email,
            role: "GENERAL",
            password: hashedPassword
        });
        const saveUser = await userData.save();
        res.status(201).json({message: 'User created successfully', data: saveUser, success: true, error:false});

    }catch(error){
        res.json({message: error.message, error:true, success:false});
    }
}

module.exports = userSignup;
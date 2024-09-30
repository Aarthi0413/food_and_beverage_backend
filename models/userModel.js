const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: 'Name should only contain letters and spaces'
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
    },
},{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
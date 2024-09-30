const jwt = require('jsonwebtoken');

const authToken = async(req, res, next) => {
    try{
        const token = req.cookies?.token

        if(!token){
            return res.status(401).json({message: 'Please Login...', error:true, success:false});
        }

        jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {

            if(err){
                return res.json({message: 'Token is invalid', error:true, success:false});
            }
            req.userId = decoded?._id;
            next();
        })
    }catch(error){
        res.status(400).json({message: error.message, data:[], error:true, success:false});
    }
}

module.exports = authToken;
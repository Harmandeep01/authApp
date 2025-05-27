import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_ACCESSS_SECRET , //secret key
       { expiresIn: "30s"}
    );
}

export {generateToken}
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        
        if(!user){
            return res.status(400).json({
                status: "failure",
                message: "Email or Password incorrect"
            })
        }

        const isMatched = bcrypt.compare(password, user.password)

        if(!isMatched ) {
            return res.status(400).json({
                status: "failure",
                message: "Email or Password incorrect"
            })
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
        delete user.password

        res.status(200).json({
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Error while logging",
            error
        })
    }
}
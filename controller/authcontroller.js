const User = require("../models/user")
const bcrypt = require("bcryptjs")

exports.Signup = async (req,res) =>{
    const {username, password} =req.body
    

    try {
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username: username,
            password: hashpassword
        })
        
        res.status(201).json({
            status: 'success',
            data:{
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
        })
    }
}

exports.Login = async (req,res) =>{
    const {username, password} =req.body
    try {
        const user = await  User.findOne({username})
        if(!user){
            res.status(404).json({
                status: "fail",
                message: "user not found"
            })
        }
        const isCorrect = await bcrypt.compare(password,user.password)
        if(!isCorrect){
            res.status(404).json({
                status: "fail",
                message: "password and usename is not match"
            })
            
        }else{
            res.status(201).json({
                status: 'login success',
                user: user
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "fail",
        })
    }
}
import User from '../models/userModel.js'
import path from 'path'
import multer from 'multer'
import bcrypt from 'bcryptjs'

const __dirname = path.resolve()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/public/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

export const upload = multer({storage})

export const createUser = async (req, res) => {
  const user = Object.assign(req.body, {image : req.file.filename})
  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await User.create(user)
      res.status(201).json({
          status: "success",
          message: "user created successfully",
          user,
      })
  } catch (error) {
      res.status(400).json({
        status: "failure",
        message: "Error while creating user"
    })
  }
}

export const getAllUsers = async(req, res) => {
  try{
    const users = await User.findAll()
    res.status(200).json({
      status: "success",
      message: "users fetched successfully",
      users
    })
  } catch(error) {
      res.status(400).json({
        status: "failure",
        message: "Error while fetchig all users"
    })
  }
}

export const updateUser = async(req, res) => {
  try{
    const user = await User.findByPk(req.body.id)
    if(!user){
      return res.status(400).json({
        status: "failure",
        message: "No user found!"
      })
    }
    const updatedUser = await user.update(req.body)
    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      updatedUser
    })
  }catch (error){ 
    res.status(400).json({
      status: "failure",
      message: "Error while updating user",
      error
    })
  }
}

export const deleteUser = async(req, res) => {
  try{
    await User.destroy({
      where: {
        id: 1
      }
    })

    res.status(200).json({
      status: "success",
      message: "Successfully deleted user"
  })
  } catch(error) {
    res.status(400).json({
      status: "failure",
      message: "Error while deleting user"
  })
  }
}
import express from 'express'

import {createUser, upload, getAllUsers, deleteUser, updateUser} from '../controllers/user.controller.js'

const router = express.Router()


router.post('/register', upload.single('image'), createUser)

router.get('/', getAllUsers)

router.patch('/update', updateUser)

router.delete('/delete', deleteUser)

export default router
import express from 'express';
import 'dotenv/config'
import userRouter from './api/v1/routes/users.js'
import authRouter from './api/v1/routes/auth.js'
import sequelize from './db/connection.js'

const app = express()
app.use(express.json())
await sequelize.sync();

const PORT = process.env.PORT || 4000

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
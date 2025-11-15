

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5002


app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002' , 'http://localhost:3004', 'http://localhost:5173', 'http://localhost:5174', 'https://gsoc-assignm.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())

app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err))


app.use('/api/auth', authRoutes)


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`)
})

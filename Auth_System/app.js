import express from 'express'
import 'dotenv/config.js'
import userRoutes from './routes/UserRoutes.js'
import cors from 'cors'

const app = express()

let corsOptions = {
  origin: process.env.ORIGIN
}

app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/user', userRoutes)

try {
  app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
  })
} catch (error) {
  console.log(error)
}
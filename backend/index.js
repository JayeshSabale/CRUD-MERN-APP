import express from 'express'
import cors from 'cors'
import './database.js'
import userRoutes from './routes/user.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user', userRoutes)

app.listen(3001, () => {
  console.log('Server is running at port number 3001')
})

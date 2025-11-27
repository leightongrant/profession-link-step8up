import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { sequelize } from './connection/db.js'
import { router as users } from './routes/users/routes.js'
import morgan from 'morgan'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Database synced successfully.')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

connect()
syncDb()

const PORT = process.env.PORT || 3000

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', users)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

import { Router } from 'express'
import { createUser, getAllUsers } from './controllers.js'

export const router = Router()

// Get users
router.get('/users', getAllUsers)

// Create user
router.post('/users', createUser)

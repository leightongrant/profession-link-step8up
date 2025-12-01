import { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  requestRole,
} from './controllers.js'
import { authorize } from '../../middleware/authorization.js'

export const router = Router()

// Get users
router.get('/users', getAllUsers)

// Get one user
router.get('/users/:id', getOneUser)

// Create user
router.post('/users', createUser)

// Delete user
router.delete('/users/:id', authorize, deleteUser)

// Update user
router.put('/users/:id', authorize, updateUser)

// Request Role change
router.put('/users/:id/request-role', requestRole)

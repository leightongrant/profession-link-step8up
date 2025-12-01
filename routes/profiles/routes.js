import { Router } from 'express'
import {
  createProfile,
  getAllProfiles,
  getOneProfile,
  deleteProfile,
  updateProfile,
} from './controllers.js'
import { authorize } from '../../middleware/authorization.js'

export const router = Router()

// Get profiles
router.get('/profiles', getAllProfiles)

// Get one user
router.get('/profiles/:id', getOneProfile)

// Create user
router.post('/profiles', authorize, createProfile)

// Delete user
router.delete('/profiles/:id', authorize, deleteProfile)

// Update user
router.put('/profiles/:id', authorize, updateProfile)

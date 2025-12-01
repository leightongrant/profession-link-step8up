import { Router } from 'express'
import {
  getAllServices,
  createService,
  getOneService,
  deleteService,
  updateService,
} from './controllers.js'
import { authorize } from '../../middleware/authorization.js'

export const router = Router()

// Get Services
router.get('/services', getAllServices)

// Get one Service
router.get('/services/:id', getOneService)

// Create Service
router.post('/services', authorize, createService)

// Update Service
router.put('/services/:id', authorize, updateService)

// Delete Service
router.delete('/services/:id', authorize, deleteService)

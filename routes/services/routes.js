import { Router } from 'express'
import {
  getAllServices,
  createService,
  getOneService,
  deleteService,
  updateService,
} from './controllers.js'

export const router = Router()

// Get Services
router.get('/services', getAllServices)

// Get one review
router.get('/services/:id', getOneService)

// Create review
router.post('/services', createService)

// Update review
router.put('/services/:id', updateService)

// Delete review
router.delete('/services/:id', deleteService)

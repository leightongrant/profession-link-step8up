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

// Get one Service
router.get('/services/:id', getOneService)

// Create Service
router.post('/services', createService)

// Update Service
router.put('/services/:id', updateService)

// Delete Service
router.delete('/services/:id', deleteService)

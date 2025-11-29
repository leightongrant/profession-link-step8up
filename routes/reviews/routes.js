import { Router } from 'express'
import {
  getAllReviews,
  createReview,
  getOneReview,
  deleteReview,
  updateReview,
} from './controllers.js'

export const router = Router()

// Get reviews
router.get('/reviews', getAllReviews)

// Get one review
router.get('/reviews/:id', getOneReview)

// Create review
router.post('/reviews', createReview)

// Delete review
router.delete('/reviews/:id', deleteReview)

// Update review
router.put('/reviews/:id', updateReview)

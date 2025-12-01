import { Router } from 'express'
import {
  getAllReviews,
  createReview,
  getOneReview,
  deleteReview,
  updateReview,
} from './controllers.js'
import { authorize } from '../../middleware/authorization.js'

export const router = Router()

// Get reviews
router.get('/reviews', getAllReviews)

// Get one review
router.get('/reviews/:id', getOneReview)

// Create review
router.post('/reviews', authorize, createReview)

// Delete review
router.delete('/reviews/:id', authorize, deleteReview)

// Update review
router.put('/reviews/:id', authorize, updateReview)

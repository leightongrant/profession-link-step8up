import { Review } from '../../models/review.js'
import {
  createReviewSchema,
  updateReviewSchema,
} from '../../schemas/reviews.js'

// Get all Reviews
export const getAllReviews = async (_, res) => {
  try {
    const result = await Review.findAll()
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Get all Reviews
export const getOneReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Review.findByPk(id)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create Review
export const createReview = async (req, res) => {
  try {
    const body = req.body
    const review = await createReviewSchema.validateAsync(body)
    const result = await Review.create(review)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update Review
export const updateReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const body = req.body
    const reviewUpdate = await updateReviewSchema.validateAsync(body)

    const result = await Review.findOne({ where: { review_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    await Review.update(reviewUpdate, {
      where: {
        review_id: id,
      },
    })

    return res.status(200).json({ message: 'Review updated' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Review.destroy({ where: { review_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

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

// Get One Review
export const getOneReview = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid review id' })
    }

    const review = await Review.findByPk(id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }

    return res.status(200).json(review)
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

    const validatedReview = await createReviewSchema.validateAsync(body, {
      abortEarly: false,
    })
    const review = await Review.create(validatedReview)

    return res.status(201).json(review)
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update Review
export const updateReview = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid review id' })
    }

    const body = req.body
    const validatedUpdate = await updateReviewSchema.validateAsync(body, {
      abortEarly: false,
    })

    const review = await Review.findByPk(id)
    if (!review) {
      return res.status(404).json({ message: 'Not found' })
    }

    await review.update(validatedUpdate)

    return res.status(200).json({ message: 'Review updated', review })
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid review id' })
    }

    const review = await Review.findByPk(id)
    if (!review) {
      return res.status(404).json({ message: 'Not found' })
    }

    await review.destroy()

    return res.status(200).json({ message: 'Review deleted', review })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

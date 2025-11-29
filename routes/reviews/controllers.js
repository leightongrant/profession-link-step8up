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
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const result = await Review.findByPk(id)
    if (!result) {
      return res.status(404).json({ message: 'Review not found' })
    }

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

    const review = await createReviewSchema.validateAsync(body, {
      abortEarly: false,
    })
    const result = await Review.create(review)

    return res.status(201).json(result)
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
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const body = req.body
    const validatedUpdate = await updateReviewSchema.validateAsync(body, {
      abortEarly: false,
    })

    const oldReview = await Review.findByPk(id)
    if (!oldReview) {
      return res.status(404).json({ message: 'Not found' })
    }

    await Review.update(validatedUpdate, {
      where: {
        review_id: id,
      },
    })

    const newReview = await Review.findByPk(id)

    return res
      .status(200)
      .json({ message: 'Review updated', review: newReview })
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
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const deletedCount = await Review.destroy({ where: { review_id: id } })
    if (!deletedCount) {
      return res.status(404).json({ message: 'Review Not found' })
    }

    return res.status(200).json({ message: 'Review deleted', deletedCount })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

import { Booking } from '../../models/booking.js'
import {
  createBookingSchema,
  updateBookingSchema,
} from '../../schemas/bookings.js'

// Get all Bookings
export const getAllBookings = async (_, res) => {
  try {
    const result = await Booking.findAll()
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Get One Booking
export const getOneBooking = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const result = await Booking.findByPk(id)
    if (!result) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const body = req.body
    const validatedBooking = await createBookingSchema.validateAsync(body, {
      abortEarly: false,
    })
    const result = await Booking.create(validatedBooking)
    return res.status(201).json({ message: 'Booking created', booking: result })
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

// Update Booking
export const updateBooking = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const body = req.body
    const validatedBooking = await updateBookingSchema.validateAsync(body, {
      abortEarly: false,
    })

    const booking = await Booking.findByPk(id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking Not found' })
    }

    await Booking.update(
      { status: validatedBooking.status, message: validatedBooking.message },
      {
        where: {
          booking_id: id,
        },
      }
    )

    return res.status(200).json({ message: 'Booking updated', booking })
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

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const deletedCount = await Booking.destroy({ where: { booking_id: id } })
    if (!deletedCount) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    return res.status(200).json({ message: 'Booking deleted', deletedCount })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

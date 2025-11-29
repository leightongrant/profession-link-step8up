import { Router } from 'express'
import {
  getAllBookings,
  createBooking,
  getOneBooking,
  deleteBooking,
  updateBooking,
} from './controllers.js'

export const router = Router()

// Get Bookings
router.get('/bookings', getAllBookings)

// Get one Booking
router.get('/bookings/:id', getOneBooking)

// Create Booking
router.post('/bookings', createBooking)

// Update Booking
router.put('/bookings/:id', updateBooking)

// Delete Booking
router.delete('/bookings/:id', deleteBooking)

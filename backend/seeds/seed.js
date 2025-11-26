import { sequelize } from '../connection/db.js'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import { Service } from '../models/service.js'
import { Booking } from '../models/booking.js'
import { Review } from '../models/review.js'
import { seedData } from './seedData.js'

const seedDatabase = async () => {
  try {
    // Sync all models
    await sequelize.sync({ force: true })
    console.log('Database synchronized!')

    // Seed Users
    await User.bulkCreate(seedData.Users)
    console.log('Users seeded!')

    // Seed Profiles
    await Profile.bulkCreate(seedData.Profiles)
    console.log('Profiles seeded!')

    // Seed Services
    await Service.bulkCreate(seedData.Services)
    console.log('Services seeded!')

    // Seed Bookings
    await Booking.bulkCreate(seedData.Bookings)
    console.log('Bookings seeded!')

    // Seed Reviews
    await Review.bulkCreate(seedData.Reviews)
    console.log('Reviews seeded!')

    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Failed to seed database:', error)
  } finally {
    await sequelize.close()
  }
}

seedDatabase()

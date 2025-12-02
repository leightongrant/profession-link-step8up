import { sequelize } from '../connection/db.js'

import { seedData } from './seedData.js'
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
    console.log('Starting database seeding...')

    // Seed Users
    // Drop all tables and then recreate them.
    // This is a safer way to reset the database than using `force: true`.
    console.log('Dropping all tables...')
    await sequelize.drop()
    console.log('All tables dropped.')

    console.log('Syncing all models...')
    await sequelize.sync()
    console.log('All models synced.')

    // Seed the data
    console.log('Seeding Users...')
    await User.bulkCreate(seedData.Users)
    console.log('Users seeded!')

    // Seed Profiles
    console.log('Seeding Profiles...')
    await Profile.bulkCreate(seedData.Profiles)
    console.log('Profiles seeded!')

    // Seed Services
    console.log('Seeding Services...')
    await Service.bulkCreate(seedData.Services)
    console.log('Services seeded!')

    // Seed Bookings
    console.log('Seeding Bookings...')
    await Booking.bulkCreate(seedData.Bookings)
    console.log('Bookings seeded!')

    // Seed Reviews
    console.log('Seeding Reviews...')
    await Review.bulkCreate(seedData.Reviews)
    console.log('Reviews seeded!')

    console.log('Database seeding completed successfully!')
    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Failed to seed database:', error)
    process.exit(1)
  } finally {
    await sequelize.close()
  }
}

seedDatabase()

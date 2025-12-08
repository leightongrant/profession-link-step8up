import { sequelize } from '../connection/db.js'
import { seedData } from './seedData.js'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import { Service } from '../models/service.js'
import { Booking } from '../models/booking.js'
import { Review } from '../models/review.js'

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...')

    // Manually drop tables in reverse order of dependency without CASCADE.
    // This is a workaround for environments that do not support 'DROP CASCADE'.
    console.log('Dropping tables in specific order...')
    await Review.drop()
    await Booking.drop()
    await Service.drop()
    await Profile.drop()
    await User.drop()
    console.log('All application tables dropped.')

    // Recreate the tables from the models.
    console.log('Syncing all models to recreate schema...')
    await sequelize.sync()
    console.log('All models synced.')
    // Seed the data
    console.log('Seeding Users...')
    await User.bulkCreate(seedData.Users)

    console.log('Seeding Profiles...')
    await Profile.bulkCreate(seedData.Profiles)

    console.log('Seeding Services...')
    await Service.bulkCreate(seedData.Services)

    console.log('Seeding Bookings...')
    await Booking.bulkCreate(seedData.Bookings)

    console.log('Seeding Reviews...')
    await Review.bulkCreate(seedData.Reviews)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Failed to seed database:', error)
    process.exit(1)
  } finally {
    await sequelize.close()
  }
}

seedDatabase()

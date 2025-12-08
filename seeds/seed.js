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
    if (sequelize.getDialect() === 'postgres') {
      await sequelize.query(
        `SELECT setval('\"Users_user_id_seq\"', (SELECT MAX(user_id) FROM "Users"))`
      )
    }
    await sequelize.close()
  }
}

seedDatabase()

import { Sequelize } from 'sequelize'
import pg from 'pg'

// NileDB
export const sequelize = new Sequelize(process.env.NILEDB_URL_STRING, {
  dialect: 'postgres',
  dialectModule: pg,
  protocol: 'postgres',
  logging: false,
})

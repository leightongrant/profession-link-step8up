import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbDialect = process.env.DB_DIALECT
const dbHost = process.env.DB_HOST

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
  dialectModule: mysql2,
})

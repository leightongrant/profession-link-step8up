import { Sequelize } from 'sequelize'
import pg from 'pg'
import mysql2 from 'mysql2'

let dbUser = process.env.DB_USER
let dbPassword = process.env.DB_PASSWORD
let dbHost = process.env.DB_HOST
let dbName = process.env.DB_NAME
let dbPort = process.env.DB_PORT
let dbDialect = process.env.DB_DIALECT

const options = {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
  port: dbPort,
  dialectModule: mysql2,
}

// Prod
let sequelize = new Sequelize(process.env.NILEDB_URL_STRING, {
  dialect: 'postgres',
  dialectModule: pg,
  protocol: 'postgres',
  logging: false,
})

//Dev
if (process.env.NODE === 'development') {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, options)
}

export { sequelize }

import { Sequelize } from 'sequelize'
import pg from 'pg'

//MySql
/*
import mysql2 from 'mysql2'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
  dialectModule: mysql2,
})
*/

// Postgres
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

// NileDB
/*
export const sequelize = new Sequelize(process.env.NILEDB_URL_STRING, {
  dialect: 'postgres',
  dialectModule: pg,
  protocol: 'postgres',
  logging: false,
})
*/

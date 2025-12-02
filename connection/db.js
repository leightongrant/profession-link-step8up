import { Sequelize } from 'sequelize'
// import pg from 'pg'

//MySql
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

/*
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

Postgres
export const sequelize = new Sequelize('dbName', 'dbUser', 'dbPassword', {
  host: dbHost,
  dialect: 'postgres',
  port: 5432,
  logging: false,
})
*/
/*
// NileDB
const dbName = process.env.NILEDB_NAME
const dbUser = process.env.NILEDB_USER
const dbPassword = process.env.NILEDB_PASSWORD
const dbHost = process.env.NILEDB_PSQL_URL

const url = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`

export const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  dialectModule: pg,
  protocol: 'postgres',
  logging: false,
})
*/

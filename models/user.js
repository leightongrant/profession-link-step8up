import { DataTypes } from 'sequelize'
import { sequelize } from '../connection/db.js'

export const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client',
      validate: {
        isIn: {
          args: [['lawyer', 'accountant', 'client', 'admin']],
          msg: 'Invalid role specified.',
        },
      },
    },
    pending_role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['lawyer', 'accountant']],
          msg: 'Invalid pending role specified.',
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
  }
)

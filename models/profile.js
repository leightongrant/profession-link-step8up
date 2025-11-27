import { DataTypes } from 'sequelize'
import { sequelize } from '../connection/db.js'
import { User } from './user.js'

export const Profile = sequelize.define(
  'Profile',
  {
    profile_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // reference the Users table
        key: 'user_id',
      },
      onDelete: 'CASCADE', // matches your SQL constraint
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating_avg: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    profile_photo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'Profiles',
    timestamps: false,
  }
)

User.hasOne(Profile, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Profile.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' })

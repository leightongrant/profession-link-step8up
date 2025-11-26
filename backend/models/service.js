import { DataTypes } from 'sequelize'
import { sequelize } from '../connection/db.js'
import { Profile } from './profile.js'

export const Service = sequelize.define(
  'Service',
  {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Profile,
        key: 'profile_id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price_range: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    availability: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'Services',
    timestamps: false,
  }
)

Profile.hasMany(Service, { foreignKey: 'profile_id', onDelete: 'CASCADE' })
Service.belongsTo(Profile, { foreignKey: 'profile_id', onDelete: 'CASCADE' })

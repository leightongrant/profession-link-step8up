import { DataTypes } from 'sequelize'
import { sequelize } from '../connection/db.js'
import { Service } from './service.js'
import { User } from './user.js'

export const Booking = sequelize.define(
  'Booking',
  {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service,
        key: 'service_id',
      },
      onDelete: 'CASCADE',
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
      validate: {
        isIn: {
          args: [['pending', 'confirmed', 'completed']],
          msg: 'Invalid status specified.',
        },
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'Bookings',
    timestamps: false,
  }
)

Service.hasMany(Booking, { foreignKey: 'service_id', onDelete: 'CASCADE' })
Booking.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' })

User.hasMany(Booking, { foreignKey: 'client_id', onDelete: 'CASCADE' })
Booking.belongsTo(User, { foreignKey: 'client_id', onDelete: 'CASCADE' })

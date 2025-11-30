import { DataTypes } from 'sequelize'
import { sequelize } from '../connection/db.js'
import { Service } from './service.js'
import { User } from './user.js'

export const Review = sequelize.define(
  'Review',
  {
    review_id: {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'Reviews',
    timestamps: false,
  }
)

Service.hasMany(Review, {
  foreignKey: 'service_id',
  onDelete: 'CASCADE',
})
Review.belongsTo(Service, {
  foreignKey: 'service_id',
  onDelete: 'CASCADE',
})

User.hasMany(Review, {
  foreignKey: 'client_id',
  as: 'reviews',
  onDelete: 'CASCADE',
})
Review.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'reviewer',
  onDelete: 'CASCADE',
})

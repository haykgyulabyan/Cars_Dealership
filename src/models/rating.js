import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rating = sequelize.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cars',
      key: 'id',
    },
    unique: 'user_car_rating',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    unique: 'user_car_rating',
  },
}, {
                                  timestamps: false,
                                  indexes: [
                                    {
                                      unique: true,
                                      fields: ['user_id', 'car_id'],
                                      name: 'user_car_rating_unique_idx',
                                    },
                                  ],
                                });

export default Rating;

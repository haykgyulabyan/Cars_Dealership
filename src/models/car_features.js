import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CarFeatures = sequelize.define('car_features', {
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feature_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: false });

export default CarFeatures;

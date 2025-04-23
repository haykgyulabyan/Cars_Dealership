import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Car = sequelize.define('car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  year: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  vin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  model_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'models',
      key: 'id',
    },
  },
}, { timestamps: false });

export default Car;

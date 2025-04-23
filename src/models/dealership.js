import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Dealership = sequelize.define('dealership', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, { timestamps: false, paranoid: true });

export default Dealership;

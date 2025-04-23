import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Make = sequelize.define('make', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

export default Make;

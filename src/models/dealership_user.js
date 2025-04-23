import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const DealershipUser = sequelize.define('dealership_user', {
  dealership_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dealerships',
      key: 'id',
    },
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    primaryKey: true,
  },
}, { timestamps: false });

export default DealershipUser;

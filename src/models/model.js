import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Model = sequelize.define('model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  make_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'makes',
      key: 'id',
    },
  },
}, { timestamps: false });

export default Model;

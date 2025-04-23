import Car from './car.js';
import Feature from './feature.js';
import Model from './model.js';
import Make from './make.js';
import User from './user.js';
import Dealership from './dealership.js';
import Rating from './rating.js';
import DealershipUser from './dealership_user.js';

Car.belongsTo(Model, { foreignKey: 'model_id' });
Model.hasMany(Car, { foreignKey: 'model_id' });

Make.hasMany(Model, { foreignKey: 'make_id' });
Model.belongsTo(Make, { foreignKey: 'make_id' });

Car.belongsToMany(Feature, { through: 'car_features', foreignKey: 'car_id', timestamps: false });
Feature.belongsToMany(Car, { through: 'car_features', foreignKey: 'feature_id', timestamps: false });

Dealership.hasMany(Car, { foreignKey: 'dealership_id' });
Car.belongsTo(Dealership, { foreignKey: 'dealership_id' });

Dealership.belongsToMany(User, { through: DealershipUser, foreignKey: 'dealership_id' });
User.belongsToMany(Dealership, { through: DealershipUser, foreignKey: 'user_id' });

User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });

Car.hasMany(Rating, { foreignKey: 'car_id' });
Rating.belongsTo(Car, { foreignKey: 'car_id' });

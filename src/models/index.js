import Car from './car.js';
import Feature from './feature.js';
import Model from './model.js';
import Make from './make.js';

Car.belongsTo(Model, { foreignKey: 'model_id' });

Model.hasMany(Car, { foreignKey: 'model_id' });

Model.hasOne(Make, { foreignKey: 'id', sourceKey: 'make_id' });

Car.belongsToMany(Feature, { through: 'car_features', foreignKey: 'car_id', timestamps: false });

Feature.belongsToMany(Car, { through: 'car_features', foreignKey: 'feature_id', timestamps: false });

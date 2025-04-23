import Car from '../models/car.js';
import Feature from '../models/feature.js';
import Make from '../models/make.js';
import Model from '../models/model.js';

class CarService {
  async getAllCars() {
    return await Car.findAll({
                               include: [
                                 { model: Model, as: 'model', include: [{ model: Make, as: 'make' }] },
                                 { model: Feature, as: 'features', through: { attributes: [] } },
                               ],
                             });
  }

  async getCarById(id) {
    const car = await Car.findOne({
                                    where: { id },
                                    include: [
                                      { model: Model, as: 'model', include: [{ model: Make, as: 'make' }] },
                                      { model: Feature, as: 'features', through: { attributes: [] } },
                                    ],
                                  });
    if (!car) {
      const error = new Error('Car not found');
      error.status = 404;
      throw error;
    }
    return car;
  }

  async createCar(carData) {
    try {
      return await Car.create(carData);
    } catch (error) {
      console.error('Error creating car:', error);
      throw new Error('Could not create car. ' + error.message);
    }
  }

  async addFeatureToCar(carId, featureId) {
    const car = await this.getCarById(carId);
    const feature = await Feature.findByPk(featureId);

    if (!feature) {
      const error = new Error('Feature not found');
      error.status = 404;
      throw error;
    }

    await car.addFeature(feature);
    return { message: `Feature ${featureId} added to car ${carId}` };
  }

  async removeFeatureFromCar(carId, featureId) {
    const car = await this.getCarById(carId);
    const feature = await Feature.findByPk(featureId);

    if (!feature) {
      const error = new Error('Feature not found');
      error.status = 404;
      throw error;
    }

    const result = await car.removeFeature(feature);

    if (result === 0) {
      const error = new Error(`Feature ${featureId} was not associated with car ${carId}`);
      error.status = 404;
      throw error;
    }

    return { message: `Feature ${featureId} removed from car ${carId}` };
  }
}

export default new CarService();

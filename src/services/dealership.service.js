import Dealership from '../models/dealership.js';
import User from '../models/user.js';
import Car from '../models/car.js';
import Rating from '../models/rating.js';
import Feature from '../models/feature.js';
import Make from '../models/make.js';
import Model from '../models/model.js';
import sequelize from '../config/db.js';

class DealershipService {
  async createDealership(data) {
    try {
      return await Dealership.create(data);
    } catch (error) {
      console.error('Error creating dealership:', error);
      throw new Error('Could not create dealership. ' + error.message);
    }
  }

  async getAllDealershipsSortedByCars() {
    return await Dealership.findAll({
                                      attributes: {
                                        include: [
                                          [
                                            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM cars AS car
                            WHERE
                                car.dealership_id = dealership.id
                        )`),
                                            'carCount',
                                          ],
                                        ],
                                      },
                                      order: [
                                        [sequelize.literal('carCount'), 'DESC'],
                                      ],
                                    });
  }

  async getDealershipById(id) {
    const dealership = await Dealership.findByPk(id);
    if (!dealership) {
      const error = new Error('Dealership not found');
      error.status = 404;
      throw error;
    }
    return dealership;
  }

  async getDealershipDetails(id) {
    const dealership = await Dealership.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
        {
          model: Car,
          as: 'cars',
          attributes: ['id', 'year', 'vin', 'price'],
          include: [
            {
              model: Model,
              as: 'model',
              attributes: ['name'],
              include: [{ model: Make, as: 'make', attributes: ['name'] }],
            },
            {
              model: Feature,
              as: 'features',
              attributes: ['id', 'name'],
              through: { attributes: [] },
            },
            {
              model: Rating,
              as: 'ratings',
              attributes: ['rate'],
              include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              }],
            },
          ],
        },
      ],
    });

    if (!dealership) {
      const error = new Error('Dealership not found');
      error.status = 404;
      throw error;
    }

    const dealershipJson = dealership.toJSON();
    if (dealershipJson.cars) {
      dealershipJson.cars = dealershipJson.cars.map(car => {
        let averageRating = null;
        if (car.ratings && car.ratings.length > 0) {
          const sum = car.ratings.reduce((acc, rating) => acc + rating.rate, 0);
          averageRating = sum / car.ratings.length;
        }

        const makeName = car.model?.make?.name || 'N/A';
        const modelName = car.model?.name || 'N/A';

        return {
          id: car.id,
          year: car.year,
          vin: car.vin,
          price: car.price,
          make: makeName,
          model: modelName,
          features: car.features,
          averageRating: averageRating !== null ? parseFloat(averageRating.toFixed(2)) : null,
          ratings: car.ratings.map(r => ({
            username: r.user?.name || 'Unknown User',
            rating: r.rate,
          })),
        };
      });
    }

    return dealershipJson;
  }

  async assignUserToDealership(dealershipId, userId) {
    const dealership = await this.getDealershipById(dealershipId);
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await dealership.addUser(user);
    return { message: `User ${userId} assigned to dealership ${dealershipId}` };
  }

  async addCarToDealership(dealershipId, carData) {
    const dealership = await this.getDealershipById(dealershipId);

    return await Car.create({
                              ...carData,
                              dealership_id: dealership.id,
                            });

  }
}

export default new DealershipService();

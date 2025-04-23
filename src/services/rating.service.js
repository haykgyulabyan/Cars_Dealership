import User from '../models/user.js';
import Car from '../models/car.js';
import Rating from '../models/rating.js';

class RatingService {
  async createRating(data) {
    const { user_id, car_id, rate } = data;

    if (rate === undefined || rate === null || rate < 0 || rate > 5) {
      const error = new Error('Invalid rating value. Must be between 0 and 5.');
      error.status = 400;
      throw error;
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const car = await Car.findByPk(car_id);
    if (!car) {
      const error = new Error('Car not found');
      error.status = 404;
      throw error;
    }

    const existingRating = await Rating.findOne({ where: { user_id, car_id } });
    if (existingRating) {
      const error = new Error('User has already rated this car.');
      error.status = 404;
      throw error;
    }

    try {
      return await Rating.create({
                                   user_id,
                                   car_id,
                                   rate,
                                 });
    } catch (error) {
      throw new Error('Could not create rating. ' + error.message);
    }
  }
}

export default new RatingService();

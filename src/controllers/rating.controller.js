import ratingService from '../services/rating.service.js';

class RatingController {
  async createRating(req, res) {
    const { car_id, user_id, rate } = req.body;
    if (car_id === undefined || user_id === undefined || rate === undefined) {
      const error = new Error('Missing required fields: car_id, user_id, rate');
      error.status = 400;
      throw error;
    }
    const rating = await ratingService.createRating({ car_id, user_id, rate });
    res.status(201).json(rating);
  }
}

export default new RatingController();

import ModelService from '../services/model.service.js';

class ModelController {
  async getAllModels(req, res) {
    const cars = await ModelService.getAllModels();
    res.json(cars);
  }
}

export default new ModelController();

import Model from '../models/model.js';
import Make from '../models/make.js';

class ModelService {
  async getAllModels() {
    return await Model.findAll({ include: [{ model: Make, as: 'make' }] });
  }
}

export default new ModelService();

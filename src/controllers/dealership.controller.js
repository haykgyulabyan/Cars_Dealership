import dealershipService from '../services/dealership.service.js';

class DealershipController {
  async createDealership(req, res) {
    const dealership = await dealershipService.createDealership(req.body);
    res.status(201).json(dealership);
  }

  async getAllDealershipsSorted(req, res) {
    const dealerships = await dealershipService.getAllDealershipsSortedByCars();
    res.json(dealerships);
  }

  async getDealershipDetails(req, res) {
    const { id } = req.params;
    const dealershipDetails = await dealershipService.getDealershipDetails(id);
    res.json(dealershipDetails);
  }

  async assignUser(req, res) {
    const { dealershipId, userId } = req.params;
    const result = await dealershipService.assignUserToDealership(dealershipId, userId);
    res.json(result);

  }

  async addCar(req, res) {
    const { dealershipId } = req.params;
    const carData = req.body;
    const car = await dealershipService.addCarToDealership(dealershipId, carData);
    res.status(201).json(car);

  }

  async deleteDealership(req, res) {
    const { id } = req.params;
    const dealership = await dealershipService.getDealershipById(id);
    await dealership.destroy();
    res.status(204).send();
  }
}

export default new DealershipController();

import CarService from '../services/car.service.js';

class CarController {
  async getAllCars(req, res) {
    const cars = await CarService.getAllCars();
    res.json(cars);
  }

  async getCarById(req, res) {
    const { id } = req.params;
    const car = await CarService.getCarById(id);
    res.json(car);
  }

  async createCar(req, res) {
    const car = await CarService.createCar({ ...req.body });
    res.status(201).json(car);
  }
}

export default new CarController();

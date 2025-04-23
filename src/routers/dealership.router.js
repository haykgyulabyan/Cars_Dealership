import express from 'express';
import dealershipController from '../controllers/dealership.controller.js';

const dealershipRouter = express.Router();

dealershipRouter.post('/', dealershipController.createDealership);
dealershipRouter.get('/', dealershipController.getAllDealershipsSorted);
dealershipRouter.get('/:id', dealershipController.getDealershipDetails);
dealershipRouter.post('/:dealershipId/users/:userId', dealershipController.assignUser);
dealershipRouter.post('/:dealershipId/cars', dealershipController.addCar);
dealershipRouter.delete('/:id', dealershipController.deleteDealership);

export default dealershipRouter;

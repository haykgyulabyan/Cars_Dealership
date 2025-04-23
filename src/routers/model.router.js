import express from 'express';
import modelController from "../controllers/model.controller.js";

const modelRouter = express.Router();

modelRouter.get('/', modelController.getAllModels);

export default modelRouter;

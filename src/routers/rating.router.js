import express from 'express';
import ratingController from '../controllers/rating.controller.js';

const ratingRouter = express.Router();

ratingRouter.post('/', ratingController.createRating);

export default ratingRouter;

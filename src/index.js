import express from 'express';
import './models/index.js';

import usersRouter from './routers/user.router.js';
import carRouter from './routers/car.router.js';
import sequelize from './config/db.js';
import modelRouter from './routers/model.router.js';
import dealershipRouter from './routers/dealership.router.js';
import ratingRouter from './routers/rating.router.js';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/cars', carRouter);
app.use('/api/models', modelRouter);
app.use('/api/dealerships', dealershipRouter);
app.use('/api/rating', ratingRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
                            message,
                            stack: err.stack,
                          });
});

const PORT = 3000;

try {
  await sequelize.sync({
                         force: false,
                         alter: false,
                       });
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
} catch (err) {
  console.error('Unable to connect to the database:', err);
}

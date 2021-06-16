import { Router } from 'express';
import stripeRouter from './stripeRouter';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', stripeRouter);

export default baseRouter;

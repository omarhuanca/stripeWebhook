import { Router } from 'express';
import { postMethod } from '@controllers/stripeController';
import express from 'express';

// Export the base-router
const baseRouter = Router();

baseRouter.post('/webhook', express.raw({ type: 'application/json' }), postMethod);

export default baseRouter;

import { Request, Response } from 'express';
import StripeService from '@services/StripeService';

const service = new StripeService();

export const postMethod = (req: Request, res: Response): void => {
  service.postMethod(req, res);
}

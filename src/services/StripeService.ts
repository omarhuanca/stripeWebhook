import { Request, Response } from 'express';

import Stripe from 'stripe';

class StripeService {

  private stripe: Stripe;
  private webhookSecret: string;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2020-08-27',
    });
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  }

  public postMethod(req: Request, res: Response): void {

    const sig = req.headers['stripe-signature'] || '';
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body.toString(), sig, this.webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log('❌ Error message:' + err.message);
      res.status(400).send('Webhook Error:' + err.message);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:' + event.id);

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  }
}

export default StripeService;

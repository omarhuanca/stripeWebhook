### Install and run

Install dependencies:

    $ npm install

Next, follow [these installation steps](https://github.com/stripe/stripe-cli#installation) to install the Stripe CLI which we'll use for webhook forwarding.

After the installation has finished, authenticate the CLI with your Stripe account:

    ./stripe login

To start the webhook forwarding run:

    ./stripe listen --forward-to localhost:3000/webhook

The Stripe CLI will let you know that webhook forwarding is ready and output your webhook signing secret:

    > Ready! Your webhook signing secret is whsec_xxx

Copy the webhook signing secret (`whsec_xxx`) to your `.env` file.

In a separate terminal window, start the local server:

    $ npm run start:dev # Compiles and runs the TypeScript example.

In another separate terminal window, trigger an event, for example:

    ./stripe trigger payment_intent.succeeded

You should now see some webhook event details being logged to your Node.js console.

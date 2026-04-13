const express = require('express');
const path = require('path');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable.');
  process.exit(1);
}

if (!stripePublishableKey) {
  console.error('Missing STRIPE_PUBLISHABLE_KEY environment variable.');
  process.exit(1);
}

const stripe = Stripe(stripeSecretKey);

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.static(path.join(__dirname, '/')));

app.get('/config', (req, res) => {
  res.json({ publishableKey: stripePublishableKey });
});

app.post('/create-checkout-session', async (req, res) => {
  const { cart } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or invalid.' });
  }

  try {
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${baseUrl}/success.html`,
      cancel_url: `${baseUrl}/menu.html`,
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    res.status(500).json({ error: error.message || 'Unable to create checkout session.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

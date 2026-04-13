# Food-site-project

## Stripe payment integration

This project now includes a small Node.js checkout backend for Stripe.

### Setup

1. Copy `.env.example` to `.env`.
2. Add your Stripe secret key:

```text
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
```

3. Replace the placeholder publishable key in `cart.js`:

```js
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');
```

4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

6. Open `http://localhost:3000/menu.html` in your browser.

### Notes

- The checkout session is created on the backend at `/create-checkout-session`.
- After successful payment, Stripe redirects to `success.html`.
- If you deploy this project, use your live Stripe keys and update the redirect URLs if needed.

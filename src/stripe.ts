import { Request, Response } from 'express'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string | undefined
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret)
    // handle events: checkout.session.completed, invoice.paid, customer.subscription.updated, etc.
    // e.g. if (event.type === 'checkout.session.completed') { ... }
    console.log('Stripe event', event.type)
    res.json({ received: true })
  } catch (err: any) {
    console.error('Webhook error', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
}

export { stripe }


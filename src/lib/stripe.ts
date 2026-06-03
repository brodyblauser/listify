import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    limit: 3,
    features: [
      "3 listings per month",
      "2 tone variations",
      "Basic property types",
    ],
  },
  pro: {
    name: "Pro",
    price: 29,
    limit: Infinity,
    features: [
      "Unlimited listings",
      "3 tone variations",
      "All property types",
      "Save & export history",
      "Priority generation",
    ],
  },
} as const;

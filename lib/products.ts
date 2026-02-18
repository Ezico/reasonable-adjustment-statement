export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  currency: string
  stripePriceId: string
}

export const PRODUCTS: Product[] = [
  {
    id: "reasonable-adjustment-statement",
    name: "Reasonable Adjustment Statement",
    description:
      "A professionally drafted Reasonable Adjustment Statement grounded in the UK Equality Act 2010, tailored to your neurodivergence profile and workplace or academic needs. Delivered as a PDF within 24 hours.",
    priceInCents: 5000,
    currency: "gbp",
    stripePriceId: "price_1T1j0ZI8Iih7aT9TYqD7PNUC",
  },
]

"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Shield, Loader2 } from "lucide-react"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  const [loading, setLoading] = useState(true)

  const fetchClientSecret = useCallback(async () => {
    const secret = await startCheckoutSession(orderId)
    setLoading(false)
    return secret
  }, [orderId])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          ClearGuide
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-primary" />
          Secure payment via Stripe
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-10 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Complete your purchase
          </h1>
          <p className="mt-2 text-muted-foreground">
            One-time payment of {"£"}50. Your statement will be delivered
            within 24 hours.
          </p>
        </div>

        <div className="w-full max-w-lg">
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret,
                onComplete: () => {
                  router.push(`/confirmation/${orderId}`)
                },
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </main>
    </div>
  )
}

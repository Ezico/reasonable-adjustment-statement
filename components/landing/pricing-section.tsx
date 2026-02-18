import Link from "next/link"
import { Check } from "lucide-react"

const included = [
  "Tailored to your neurodivergence profile",
  "Choice of Personal Letter or Formal Report format",
  "Legally grounded in the Equality Act 2010",
  "Strengths-based, collaborative framing",
  "Pronoun-aware language throughout",
  "Delivered as a PDF within 24 hours",
  "Data encrypted and deleted after 30 days",
]

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border bg-card px-6 py-20">
      <div className="mx-auto max-w-lg">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-lg leading-relaxed text-muted-foreground">
          One document. One price. Everything included.
        </p>

        <div className="mt-10 rounded-xl border-2 border-primary bg-background p-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              One-time payment
            </p>
            <div className="mt-2 flex items-baseline justify-center gap-1">
              <span className="font-serif text-5xl font-bold text-foreground">
                {"£"}50
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              No subscription. No hidden fees.
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/get-started"
            className="mt-8 flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

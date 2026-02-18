import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="border-t border-border bg-primary px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          <span className="text-balance">
            Ready to level the playing field?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
          Your Reasonable Adjustment Statement, professionally drafted and
          delivered within 24 hours. One-time payment of {"£"}50.
        </p>
        <Link
          href="/get-started"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-background/90"
        >
          Get Your Statement
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

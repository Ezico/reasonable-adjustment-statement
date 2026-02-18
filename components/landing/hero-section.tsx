import Link from "next/link";
import { Shield, FileText, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          Grounded in the UK Equality Act 2010
        </div>

        <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Your Rights. Your Words.{" "}
          <span className="text-primary">Your Statement.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          A professionally drafted Reasonable Adjustment Statement tailored to
          your neurodivergence profile -- for students and professionals who
          want to level the playing field, not ask for special treatment.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <FileText className="h-5 w-5" />
            Get Your Statement
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
          >
            See How It Works
          </a>
        </div>

        <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Delivered within 24 hours
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            GDPR-compliant &amp; encrypted
          </div>
        </div>
      </div>
    </section>
  );
}

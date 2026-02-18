import { ClipboardList, CreditCard, Mail } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Share your details",
    description:
      "Answer guided questions about your neurodivergence, work or study environment, strengths, and the adjustments you need. One question at a time -- no overwhelm.",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Secure checkout",
    description:
      "Review your answers, then pay a one-time fee of \u00a350. Payments are processed securely through Stripe.",
  },
  {
    icon: Mail,
    number: "03",
    title: "Receive your statement",
    description:
      "Within 24 hours, you\u2019ll receive a professionally drafted PDF tailored to your profile -- ready to share with your manager, HR, or disability service.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          Three simple steps to your professionally drafted statement.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
                Step {step.number}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

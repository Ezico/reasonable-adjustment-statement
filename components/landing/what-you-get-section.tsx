import { FileText, Scale, Heart, Users } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Two format options",
    description:
      "Choose between a Personal Letter (first person, assertive, addressed to your manager) or a Formal Report (third person, clinical, suitable for HR/occupational health).",
  },
  {
    icon: Scale,
    title: "Legally grounded",
    description:
      "Every statement references the Equality Act 2010 (Sections 6, 20, 21), EHRC Employment Code of Practice, and ACAS guidance.",
  },
  {
    icon: Heart,
    title: "Strengths-based framing",
    description:
      "Your statement highlights what you bring to the table, not what you can\u2019t do. Adjustments are framed as levelling the playing field.",
  },
  {
    icon: Users,
    title: "Pronoun-aware language",
    description:
      "Your statement uses your preferred pronouns throughout, ensuring it reflects who you are.",
  },
]

export function WhatYouGetSection() {
  return (
    <section className="border-t border-border bg-card px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          What you{"'"}ll receive
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          A professional document you can hand directly to your manager, HR
          department, or disability support service.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-background p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

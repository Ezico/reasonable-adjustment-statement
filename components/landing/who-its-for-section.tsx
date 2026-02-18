import { GraduationCap, Briefcase } from "lucide-react"

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    examples: [
      "Requesting exam adjustments (extra time, separate room, rest breaks)",
      "Getting lecture recordings or note-taking support formalised",
      "Communicating needs to personal tutors or disability services",
      "Ensuring group work and presentations are accessible",
    ],
  },
  {
    icon: Briefcase,
    title: "Professionals",
    examples: [
      "Requesting flexible working patterns or a quieter workspace",
      "Getting written task instructions formalised as standard",
      "Communicating sensory or communication needs to line managers",
      "Ensuring meetings and reviews are structured accessibly",
    ],
  },
]

export function WhoItsForSection() {
  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Who this is for
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          Whether you{"'"}re in education or employment, this service is designed
          for neurodivergent people who know what they need but want help putting
          it into words.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <audience.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {audience.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {audience.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

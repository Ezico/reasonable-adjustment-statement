export function ProblemSection() {
  const barriers = [
    {
      title: "Not knowing where to start",
      description:
        "Understanding your rights under the Equality Act can feel like navigating legal jargon without a map.",
    },
    {
      title: "Fear of being judged",
      description:
        "Asking for adjustments can feel like admitting weakness rather than asserting a legal right to equal access.",
    },
    {
      title: "Difficulty articulating needs",
      description:
        "Executive function challenges make it hard to translate lived experience into clear, professional language.",
    },
  ]

  return (
    <section className="border-t border-border bg-card px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          <span className="text-balance">
            Asking for adjustments shouldn{"'"}t feel this hard
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          Neurodivergent students and professionals face real barriers when trying to
          access the support they{"'"}re legally entitled to.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {barriers.map((barrier) => (
            <div
              key={barrier.title}
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {barrier.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {barrier.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

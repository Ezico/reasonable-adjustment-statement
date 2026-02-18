"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Is this a legal document?",
    answer:
      "Your Reasonable Adjustment Statement is a professionally drafted document that references the Equality Act 2010 and relevant guidance from the EHRC and ACAS. While it is not legal advice, it provides a clear, structured basis for the reasonable adjustments conversation with your employer or educational institution.",
  },
  {
    question: "Do I need a formal diagnosis?",
    answer:
      "No. The Equality Act 2010 protects individuals with a disability (which includes many neurodivergent conditions) regardless of whether they have a formal diagnosis. Your statement can note your diagnostic status -- whether formally diagnosed, awaiting assessment, or self-identified.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Your data is stored securely in an encrypted database, used solely to generate your statement, and automatically deleted after 30 days. We never share your information with third parties. You can request immediate deletion at any time.",
  },
  {
    question: "How is my statement delivered?",
    answer:
      "After payment, your statement is generated as a professionally formatted PDF and delivered to the email address you provide. You\u2019ll also see a download link on your confirmation page.",
  },
  {
    question: "Can I make changes after I receive it?",
    answer:
      "The PDF is your document to use and adapt as you see fit. If you need a significantly revised version, you can go through the process again. We recommend reviewing the document before your conversation with your manager.",
  },
  {
    question: "Who writes the statement?",
    answer:
      "Your statement is generated using professional templates developed in consultation with occupational therapists, neurodiversity consultants, and employment law guidance. Every statement is tailored to the specific information you provide.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-12 flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-lg border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="pr-4 font-medium text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

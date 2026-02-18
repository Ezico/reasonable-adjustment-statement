// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Clock,
  FileText,
  Scale,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Check,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Download,
  AlertCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <WhatYouGetSection />
      <WhoItsForSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}

// ==================== Hero Section ====================
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B1E33] px-6 py-24 text-[#F5F0E8] md:py-32">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#C44536] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C44536]/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C44536]/30 bg-[#C44536]/10 px-4 py-2 text-sm text-[#C44536]">
          <Shield className="h-4 w-4" />
          Grounded in the UK Equality Act 2010
        </div>

        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Your Rights. Your Words.{" "}
          <span className="bg-gradient-to-r from-[#C44536] to-[#E87A5E] bg-clip-text text-transparent">
            Your Statement.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#F5F0E8]/80 md:text-xl">
          A professionally drafted Reasonable Adjustment Statement tailored to
          your neurodivergence profile — for students and professionals who want
          to level the playing field, not ask for special treatment.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C44536] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#A33426] hover:shadow-xl"
          >
            <FileText className="h-5 w-5" />
            Get Your Statement
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border border-[#F5F0E8]/20 bg-[#F5F0E8]/10 px-8 py-4 text-base font-medium text-[#F5F0E8] backdrop-blur-sm transition-colors hover:bg-[#F5F0E8]/20"
          >
            See How It Works
          </a>
        </div>

        <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#F5F0E8]/70">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#C44536]" />
            Delivered within 24 hours
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#C44536]" />
            GDPR‑compliant & encrypted
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== Problem Section ====================
function ProblemSection() {
  const barriers = [
    {
      icon: AlertCircle,
      title: "Not knowing where to start",
      description:
        "Understanding your rights under the Equality Act can feel like navigating legal jargon without a map.",
    },
    {
      icon: Shield,
      title: "Fear of being judged",
      description:
        "Asking for adjustments can feel like admitting weakness rather than asserting a legal right to equal access.",
    },
    {
      icon: FileText,
      title: "Difficulty articulating needs",
      description:
        "Executive function challenges make it hard to translate lived experience into clear, professional language.",
    },
  ];

  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-bold text-[#0B1E33] md:text-4xl">
          Asking for adjustments shouldn't feel this hard
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#0B1E33]/70">
          Neurodivergent students and professionals face real barriers when
          trying to access the support they're legally entitled to.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {barriers.map((barrier) => (
            <div
              key={barrier.title}
              className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C44536]/10">
                <barrier.icon className="h-6 w-6 text-[#C44536]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B1E33]">
                {barrier.title}
              </h3>
              <p className="mt-2 text-[#0B1E33]/70">{barrier.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== How It Works Section ====================
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Tell us about yourself",
      description:
        "Complete a simple intake form about your neurodivergence profile and the adjustments you need.",
    },
    {
      number: "02",
      icon: FileText,
      title: "We draft your statement",
      description:
        "Our system generates a professional document grounded in the Equality Act, tailored to your situation.",
    },
    {
      number: "03",
      icon: Download,
      title: "Receive your PDF",
      description:
        "Your statement is delivered to your email within 24 hours, ready to share with your employer or school.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold text-[#0B1E33] md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#0B1E33]/70">
          Three simple steps to your professionally drafted statement.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-[#F5F0E8] p-8 shadow-lg"
            >
              <div className="absolute -top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1E33] font-serif text-xl font-bold text-white">
                {step.number}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C44536]/10">
                  <step.icon className="h-8 w-8 text-[#C44536]" />
                </div>
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold text-[#0B1E33]">
                {step.title}
              </h3>
              <p className="mt-2 text-center text-[#0B1E33]/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== What You Get Section ====================
function WhatYouGetSection() {
  const features = [
    {
      icon: FileText,
      title: "Two format options",
      description:
        "Choose between a Personal Letter (first person, assertive) or a Formal Report (third person, clinical).",
    },
    {
      icon: Scale,
      title: "Legally grounded",
      description:
        "References the Equality Act 2010, EHRC Code of Practice, and ACAS guidance.",
    },
    {
      icon: Heart,
      title: "Strengths-based framing",
      description:
        "Highlights what you bring to the table; adjustments level the playing field.",
    },
    {
      icon: Users,
      title: "Pronoun-aware language",
      description: "Your preferred pronouns are used consistently throughout.",
    },
  ];

  return (
    <section className="bg-[#0B1E33] px-6 py-20 text-[#F5F0E8]">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold md:text-4xl">
          What you'll receive
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#F5F0E8]/80">
          A professional document you can hand directly to your manager, HR
          department, or disability support service.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#F5F0E8]/20 bg-[#F5F0E8]/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#C44536]/20">
                  <feature.icon className="h-6 w-6 text-[#C44536]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F5F0E8]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-[#F5F0E8]/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== Who It's For Section ====================
function WhoItsForSection() {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Students",
      examples: [
        "Exam adjustments (extra time, separate room, rest breaks)",
        "Lecture recordings or note-taking support",
        "Communicating needs to disability services",
        "Accessible group work and presentations",
      ],
    },
    {
      icon: Briefcase,
      title: "Professionals",
      examples: [
        "Flexible working patterns or quieter workspace",
        "Written task instructions formalised",
        "Sensory or communication needs to line managers",
        "Structured meetings and reviews",
      ],
    },
  ];

  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-bold text-[#0B1E33] md:text-4xl">
          Who this is for
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#0B1E33]/70">
          Whether you're in education or employment, this service is designed
          for neurodivergent people who know what they need but want help
          putting it into words.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C44536]/10">
                  <audience.icon className="h-6 w-6 text-[#C44536]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B1E33]">
                  {audience.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {audience.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-start gap-3 text-[#0B1E33]/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C44536]" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== Pricing Section ====================
function PricingSection() {
  const included = [
    "Tailored to your neurodivergence profile",
    "Choice of Personal Letter or Formal Report",
    "Legally grounded in the Equality Act 2010",
    "Strengths-based, collaborative framing",
    "Pronoun-aware language throughout",
    "Delivered as a PDF within 24 hours",
    "Data encrypted and deleted after 30 days",
  ];

  return (
    <section id="pricing" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-lg">
        <h2 className="text-center font-serif text-3xl font-bold text-[#0B1E33] md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-lg text-[#0B1E33]/70">
          One document. One price. Everything included.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-[#C44536] bg-[#F5F0E8] p-8 shadow-xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[#C44536]">
              One-time payment
            </p>
            <p className="mt-2 font-serif text-5xl font-bold text-[#0B1E33]">
              £50
            </p>
            <p className="mt-1 text-sm text-[#0B1E33]/60">
              No subscription. No hidden fees.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#C44536]" />
                <span className="text-sm text-[#0B1E33]/80">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/get-started"
            className="mt-8 flex w-full items-center justify-center rounded-lg bg-[#C44536] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#A33426]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== FAQ Section (Custom Accordion) ====================
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this a legal document?",
      answer:
        "Your Reasonable Adjustment Statement is a professionally drafted document that references the Equality Act 2010 and relevant guidance from the EHRC and ACAS. While it is not legal advice, it provides a clear, structured basis for the reasonable adjustments conversation with your employer or educational institution.",
    },
    {
      question: "Do I need a formal diagnosis?",
      answer:
        "No. The Equality Act 2010 protects individuals with a disability (which includes many neurodivergent conditions) regardless of whether they have a formal diagnosis. Your statement can note your diagnostic status — whether formally diagnosed, awaiting assessment, or self-identified.",
    },
    {
      question: "What happens to my data?",
      answer:
        "Your data is stored securely in an encrypted database, used solely to generate your statement, and automatically deleted after 30 days. We never share your information with third parties. You can request immediate deletion at any time.",
    },
    {
      question: "How is my statement delivered?",
      answer:
        "After payment, your statement is generated as a professionally formatted PDF and delivered to the email address you provide. You’ll also see a download link on your confirmation page.",
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
  ];

  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-3xl font-bold text-[#0B1E33] md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#0B1E33]/10 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="pr-4 font-medium text-[#0B1E33]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#0B1E33]/60 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-[#0B1E33]/70">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== Final CTA Section ====================
function FinalCtaSection() {
  return (
    <section className="bg-[#0B1E33] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-bold text-[#F5F0E8] md:text-4xl">
          Ready to level the playing field?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-[#F5F0E8]/80">
          Your Reasonable Adjustment Statement, professionally drafted and
          delivered within 24 hours. One-time payment of £50.
        </p>
        <Link
          href="/get-started"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C44536] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#A33426] hover:shadow-xl"
        >
          Get Your Statement
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

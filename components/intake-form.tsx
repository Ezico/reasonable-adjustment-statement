"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Info,
  Check,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  neurodivergenceOptions,
  environmentOptions,
  challengeCategories,
  adjustmentCategories,
  type IntakeFormData,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/* "Why this matters" guidance content for each question               */
/* ------------------------------------------------------------------ */
const guidance: Record<string, { title: string; body: string }> = {
  email: {
    title: "Why we need your email",
    body: "Your completed Reasonable Adjustment Statement will be delivered as a PDF to this address. We never share your email and it is deleted with your order after 30 days.",
  },
  individualName: {
    title: "Why we ask for your name",
    body: "Your name is used only to personalise the output document. Your data is stored securely, used only to generate your statement, and deleted after 30 days.",
  },
  pronouns: {
    title: "Why pronouns matter here",
    body: "The generated statement uses pronouns to refer to you naturally (e.g. 'they experience barriers in...'). If left blank, the document defaults to 'they/them'.",
  },
  jobTitle: {
    title: "Why your role matters",
    body: "Your job title helps frame the adjustments in context. A software engineer faces different barriers than a nurse or teacher, so the language adapts accordingly.",
  },
  department: {
    title: "Department context",
    body: "Adding your department helps the document reference specific team structures. This is optional but can make the statement feel more concrete to your manager.",
  },
  organisationName: {
    title: "Why we need your organisation",
    body: "The statement is addressed to a specific employer. Under the Equality Act 2010, your employer has a legal duty to consider reasonable adjustments.",
  },
  managerName: {
    title: "Line manager reference",
    body: "If known, naming your manager helps personalise the implementation section. If you're unsure or don't want to name them, simply skip this.",
  },
  neurodivergenceTypes: {
    title: "Why we ask about your condition(s)",
    body: "Under the Equality Act 2010 (Section 6), neurodivergent conditions that have a long-term, substantial effect on day-to-day activities are recognised as disabilities. Naming your condition(s) grounds the document in law and helps suggest relevant adjustments.",
  },
  diagnosisStatus: {
    title: "Do I need a formal diagnosis?",
    body: "No. The Equality Act does not require formal diagnosis for an employer to make adjustments. The duty arises when an employer knows, or could reasonably be expected to know, that you are disabled. Self-identification and awaiting-assessment are both valid.",
  },
  diagnosticianName: {
    title: "Adding your diagnostician",
    body: "If you have a formal diagnosis, including the diagnostician's name adds authority to the document. This is entirely optional.",
  },
  workEnvironment: {
    title: "Why your work setting matters",
    body: "Different environments create different barriers. An open-plan office has different sensory challenges to a remote setup. This helps the document recommend environment-specific adjustments.",
  },
  challengeAreas: {
    title: "Identifying barriers, not deficits",
    body: "These are not weaknesses -- they are areas where the current work environment creates barriers for you. Under Section 20 of the Equality Act, your employer must remove barriers that put you at a substantial disadvantage compared to non-disabled colleagues.",
  },
  challengeDetails: {
    title: "Adding your own words",
    body: "The more specific you can be, the more powerful the document becomes. For example: 'Open-plan noise makes it impossible to concentrate after 2pm' is more actionable than 'noise is a problem'.",
  },
  strengths: {
    title: "Why strengths matter in this document",
    body: "Reasonable adjustments are about levelling the playing field, not compensating for deficit. Documenting your strengths reframes the conversation: you are not broken, the environment is. Your strengths demonstrate the value you bring when barriers are removed.",
  },
  selectedAdjustments: {
    title: "What are reasonable adjustments?",
    body: "Under Sections 20-21 of the Equality Act 2010, employers must make 'reasonable' changes to remove barriers. What counts as 'reasonable' depends on factors like cost, practicality, and the size of the organisation. These suggestions are drawn from ACAS, EHRC, and NICE guidance.",
  },
  additionalAdjustments: {
    title: "You know best what you need",
    body: "The preset list cannot cover every situation. If there's something specific that would help you -- even if it seems small -- add it here. Often the most impactful adjustments are the simplest.",
  },
  assessorName: {
    title: "Who is the assessor?",
    body: "If a professional (e.g. occupational therapist, psychologist, coach) is supporting you, their name adds weight. If you are completing this yourself, you can enter your own name or 'Self-completed'.",
  },
  assessorRole: {
    title: "Professional role",
    body: "This gives the document credibility. Options include: Occupational Therapist, Workplace Needs Assessor, Neurodiversity Coach, Psychologist, or 'Self-Advocate'.",
  },
  assessmentDate: {
    title: "Date of assessment",
    body: "This records when the statement was prepared. It establishes a timeline for the employer to act -- ACAS recommends adjustments be implemented promptly once the need is identified.",
  },
};

/* ------------------------------------------------------------------ */
/* Question definitions                                               */
/* ------------------------------------------------------------------ */
interface Question {
  id: keyof IntakeFormData | string;
  label: string;
  description: string;
  type:
    | "text"
    | "textarea"
    | "select-single"
    | "select-multi"
    | "date"
    | "chip-group";
  options?: readonly string[] | string[];
  optionGroups?: { category: string; examples: readonly string[] }[];
  required: boolean;
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "email",
    label: "What is your email address?",
    description:
      "Your completed statement PDF will be delivered to this email within 24 hours.",
    type: "text",
    required: true,
    placeholder: "e.g. alex@example.com",
  },
  {
    id: "individualName",
    label: "What is your full name?",
    description: "This will appear on your Reasonable Adjustment Statement.",
    type: "text",
    required: true,
    placeholder: "e.g. Alex Morgan",
  },
  {
    id: "pronouns",
    label: "What are your pronouns?",
    description: "Used to personalise the language in your document.",
    type: "text",
    required: false,
    placeholder: "e.g. they/them, she/her, he/him",
  },
  {
    id: "jobTitle",
    label: "What is your job title or role?",
    description: "Helps contextualise the recommended adjustments.",
    type: "text",
    required: true,
    placeholder: "e.g. Software Engineer",
  },
  {
    id: "department",
    label: "Which department do you work in?",
    description: "Optional, but helps make the statement specific.",
    type: "text",
    required: false,
    placeholder: "e.g. Engineering, Marketing, Operations",
  },
  {
    id: "organisationName",
    label: "What is the name of your employer or organisation?",
    description:
      "The statement is prepared in the context of your specific workplace.",
    type: "text",
    required: true,
    placeholder: "e.g. Acme Ltd",
  },
  {
    id: "managerName",
    label: "Who is your line manager?",
    description: "Optional. Named in the implementation section if provided.",
    type: "text",
    required: false,
    placeholder: "e.g. Jordan Lee",
  },
  {
    id: "neurodivergenceTypes",
    label: "Which neurodivergent condition(s) apply to you?",
    description: "Select all that apply. You can choose more than one.",
    type: "chip-group",
    options: neurodivergenceOptions,
    required: true,
  },
  {
    id: "otherNeurodivergence",
    label: "Please describe your other condition(s)",
    description: "Since you selected 'Other', please provide details.",
    type: "text",
    required: false,
    placeholder: "e.g. Meares-Irlen Syndrome, Slow Processing Speed",
  },
  {
    id: "diagnosisStatus",
    label: "What is your current diagnosis status?",
    description:
      "A formal diagnosis is not required to request reasonable adjustments.",
    type: "chip-group",
    options: [
      "Formal diagnosis",
      "Awaiting assessment",
      "Self-identified",
    ] as const,
    required: true,
  },
  {
    id: "diagnosticianName",
    label: "Who provided your diagnosis?",
    description: "Optional. Adds authority if you have a formal diagnosis.",
    type: "text",
    required: false,
    placeholder: "e.g. Dr Sarah Chen, Clinical Psychologist",
  },
  {
    id: "diagnosisDate",
    label: "When were you diagnosed?",
    description: "Optional. Approximate dates are fine.",
    type: "date",
    required: false,
  },
  {
    id: "workEnvironment",
    label: "What best describes your work environment?",
    description: "Different settings create different barriers.",
    type: "chip-group",
    options: environmentOptions,
    required: true,
  },
  {
    id: "challengeAreas",
    label: "Where do you experience workplace barriers?",
    description:
      "Select all areas where the current environment creates difficulties for you.",
    type: "chip-group",
    options: challengeCategories,
    required: true,
  },
  {
    id: "challengeDetails",
    label: "Can you describe these barriers in your own words?",
    description:
      "Optional but powerful. Specific examples make the strongest case.",
    type: "textarea",
    required: false,
    placeholder:
      "e.g. Open-plan noise makes it impossible to concentrate after lunch. I need 10 minutes of quiet before I can re-engage with complex tasks...",
  },
  {
    id: "strengths",
    label: "What are your key strengths?",
    description:
      "Neurodivergence brings real strengths. Documenting them reframes the conversation around what you can do when barriers are removed.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g.\n- Exceptional pattern recognition\n- Strong creative problem-solving\n- Deep focus when engaged with tasks of interest\n- Innovative approach to challenges",
  },
  {
    id: "selectedAdjustments",
    label: "Which adjustments would help you?",
    description:
      "Select from evidence-based recommendations drawn from ACAS, EHRC, and NICE guidance.",
    type: "select-multi",
    optionGroups: adjustmentCategories.map((cat) => ({
      category: cat.category,
      examples: cat.examples,
    })),
    required: true,
  },
  {
    id: "additionalAdjustments",
    label: "Are there any other adjustments you need?",
    description:
      "Anything not covered above that would make a real difference.",
    type: "textarea",
    required: false,
    placeholder:
      "e.g. Permission to use fidget tools during meetings, standing desk option...",
  },
  {
    id: "assessorName",
    label: "Who is completing this statement?",
    description: "A professional name or your own name if self-completing.",
    type: "text",
    required: true,
    placeholder: "e.g. Dr Taylor Ahmed, or your own name",
  },
  {
    id: "assessorRole",
    label: "What is the assessor's professional role?",
    description: "Adds credibility to the document.",
    type: "text",
    required: true,
    placeholder: "e.g. Occupational Therapist, Self-Advocate",
  },
  {
    id: "assessorOrganisation",
    label: "Assessor's organisation?",
    description: "Optional. The organisation the assessor represents.",
    type: "text",
    required: false,
    placeholder: "e.g. NeuroSupport Ltd",
  },
  {
    id: "assessmentDate",
    label: "What date is this statement being prepared?",
    description: "Establishes the timeline for your employer to act.",
    type: "date",
    required: true,
  },
];

/* ------------------------------------------------------------------ */
/* Guidance Panel                                                      */
/* ------------------------------------------------------------------ */
function GuidancePanel({ questionId }: { questionId: string }) {
  const [open, setOpen] = useState(false);
  const g = guidance[questionId];
  if (!g) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        aria-expanded={open}
      >
        <Info className="h-4 w-4 shrink-0" />
        <span>Why this matters</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="mt-2 rounded-lg border border-primary/15 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80 animate-in fade-in-0 slide-in-from-top-1">
          <p className="mb-1 font-semibold text-primary">{g.title}</p>
          <p>{g.body}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main intake form                                                    */
/* ------------------------------------------------------------------ */
interface IntakeFormProps {
  onComplete: (data: IntakeFormData, email: string) => void;
}

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({
    neurodivergenceTypes: [],
    challengeAreas: [],
    selectedAdjustments: [],
    diagnosisStatus: "",
    workEnvironment: "",
    assessmentDate: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Compute visible questions (skip "other" question if Other not selected)
  const visibleQuestions = questions.filter((q) => {
    if (q.id === "otherNeurodivergence") {
      const types = formData.neurodivergenceTypes;
      return Array.isArray(types) && types.includes("Other");
    }
    if (q.id === "diagnosticianName" || q.id === "diagnosisDate") {
      return formData.diagnosisStatus === "Formal diagnosis";
    }
    return true;
  });

  const question = visibleQuestions[currentQ];
  const totalQuestions = visibleQuestions.length;
  const progress = (currentQ / totalQuestions) * 100;

  // Auto-focus text inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, [currentQ]);

  const getValue = (id: string): string | string[] => {
    return (
      formData[id] ??
      (question?.type === "chip-group" || question?.type === "select-multi"
        ? []
        : "")
    );
  };

  const setValue = useCallback((id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleArrayValue = useCallback((id: string, item: string) => {
    setFormData((prev) => {
      const current = (prev[id] as string[]) || [];
      const updated = current.includes(item)
        ? current.filter((v) => v !== item)
        : [...current, item];
      return { ...prev, [id]: updated };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const validate = (): boolean => {
    if (!question) return true;
    if (!question.required) return true;
    const val = getValue(question.id);
    if (Array.isArray(val) && val.length === 0) {
      setErrors({ [question.id]: "Please select at least one option" });
      return false;
    }
    if (typeof val === "string" && val.trim() === "") {
      setErrors({ [question.id]: "This field is required" });
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1);
    }
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && question?.type !== "textarea") {
      e.preventDefault();
      next();
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Build final IntakeFormData
    const data: IntakeFormData = {
      individualName: (formData.individualName as string) || "",
      pronouns: (formData.pronouns as string) || undefined,
      jobTitle: (formData.jobTitle as string) || "",
      department: (formData.department as string) || undefined,
      organisationName: (formData.organisationName as string) || "",
      managerName: (formData.managerName as string) || undefined,
      neurodivergenceTypes: (formData.neurodivergenceTypes as string[]) || [],
      otherNeurodivergence:
        (formData.otherNeurodivergence as string) || undefined,
      diagnosisStatus:
        (formData.diagnosisStatus as
          | "Formal diagnosis"
          | "Awaiting assessment"
          | "Self-identified") || "Self-identified",
      diagnosticianName: (formData.diagnosticianName as string) || undefined,
      diagnosisDate: (formData.diagnosisDate as string) || undefined,
      workEnvironment: (formData.workEnvironment as string) || "",
      challengeAreas: (formData.challengeAreas as string[]) || [],
      challengeDetails: (formData.challengeDetails as string) || undefined,
      strengths: (formData.strengths as string) || "",
      selectedAdjustments: (formData.selectedAdjustments as string[]) || [],
      additionalAdjustments:
        (formData.additionalAdjustments as string) || undefined,
      assessorName: (formData.assessorName as string) || "",
      assessorRole: (formData.assessorRole as string) || "",
      assessorOrganisation:
        (formData.assessorOrganisation as string) || undefined,
      assessmentDate: (formData.assessmentDate as string) || "",
    };
    onComplete(data, (formData.email as string) || "");
  };

  const isLast = currentQ === totalQuestions - 1;
  const currentValue = getValue(question?.id ?? "");

  return (
    <div
      className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-2xl flex-col"
      onKeyDown={handleKeyDown}
    >
      {/* Progress bar */}
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Question {currentQ + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question area */}
      <div className="flex flex-1 flex-col justify-center">
        {question && (
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            {/* Question number + label */}
            <p className="mb-2 text-sm font-medium text-primary">
              {currentQ + 1} &rarr;
            </p>
            <h2 className="mb-2 font-serif text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              {question.label}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              {question.description}
            </p>

            {/* Input rendering by type */}
            {question.type === "text" && (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={(currentValue as string) || ""}
                onChange={(e) => setValue(question.id, e.target.value)}
                placeholder={question.placeholder}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                aria-required={question.required}
                aria-invalid={!!errors[question.id]}
              />
            )}

            {question.type === "textarea" && (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={(currentValue as string) || ""}
                onChange={(e) => setValue(question.id, e.target.value)}
                placeholder={question.placeholder}
                rows={5}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors resize-y"
                aria-required={question.required}
                aria-invalid={!!errors[question.id]}
              />
            )}

            {question.type === "date" && (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="date"
                value={(currentValue as string) || ""}
                onChange={(e) => setValue(question.id, e.target.value)}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                aria-required={question.required}
                aria-invalid={!!errors[question.id]}
              />
            )}

            {question.type === "chip-group" && question.options && (
              <div className="flex flex-wrap gap-2.5">
                {question.options.map((option) => {
                  const isArray = Array.isArray(currentValue);
                  const isSelected = isArray
                    ? currentValue.includes(option)
                    : currentValue === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (isArray) {
                          toggleArrayValue(question.id, option);
                        } else {
                          setValue(question.id, option);
                        }
                      }}
                      className={cn(
                        "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
                      )}
                      aria-pressed={isSelected}
                    >
                      {isSelected && (
                        <Check className="mr-1.5 -ml-0.5 inline h-3.5 w-3.5" />
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === "select-multi" && question.optionGroups && (
              <div className="flex max-h-[50vh] flex-col gap-5 overflow-y-auto rounded-lg border border-border bg-card p-4">
                {question.optionGroups.map((group) => (
                  <div key={group.category}>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                      {group.category}
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {group.examples.map((item) => {
                        const selected =
                          Array.isArray(currentValue) &&
                          currentValue.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleArrayValue(question.id, item)}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                              selected
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-foreground/80 hover:bg-secondary",
                            )}
                            aria-pressed={selected}
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background",
                              )}
                            >
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error message */}
            {errors[question.id] && (
              <p
                className="mt-3 text-sm font-medium text-destructive"
                role="alert"
              >
                {errors[question.id]}
              </p>
            )}

            {/* Why this matters */}
            <GuidancePanel questionId={question.id} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pb-4 pt-6">
        <div>
          {currentQ > 0 && (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <div className="flex items-center gap-3">
          {!question?.required && !isLast && (
            <button
              type="button"
              onClick={next}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Skip
            </button>
          )}
          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <FileText className="h-4 w-4" />
              Review &amp; Checkout
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              OK
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

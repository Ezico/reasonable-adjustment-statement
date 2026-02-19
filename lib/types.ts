import { z } from "zod";

export const neurodivergenceOptions = [
  "ADHD (Attention Deficit Hyperactivity Disorder)",
  "Autism Spectrum Condition (ASC)",
  "Dyslexia",
  "Dyspraxia / Developmental Coordination Disorder (DCD)",
  "Dyscalculia",
  "Dysgraphia",
  "Tourette Syndrome",
  "Irlen Syndrome / Visual Stress",
  "Sensory Processing Differences",
  "Other",
] as const;

export const environmentOptions = [
  "Office-based",
  "Hybrid (Office + Remote)",
  "Fully Remote",
  "Field / Site-based",
  "Educational / Academic",
  "Clinical / Healthcare",
] as const;

export const challengeCategories = [
  "Executive Function (planning, prioritising, time management)",
  "Working Memory (retaining/recalling information)",
  "Sensory Processing (noise, light, temperature sensitivity)",
  "Communication (verbal/written expression, social interaction)",
  "Emotional Regulation (stress, overwhelm, anxiety)",
  "Motor Skills (handwriting, coordination, fine motor tasks)",
  "Reading / Writing (processing speed, comprehension, spelling)",
  "Focus & Attention (sustained concentration, task switching)",
  "Organisation (workspace, paperwork, digital files)",
] as const;

export const adjustmentCategories = [
  {
    category: "Environmental",
    examples: [
      "Quiet workspace or access to noise-cancelling headphones",
      "Adjusted lighting (reduced fluorescent, natural light preferred)",
      "Designated low-stimulus area for focused work",
      "Flexible seating arrangements",
      "Reduced visual clutter in workspace",
    ],
  },
  {
    category: "Communication & Meetings",
    examples: [
      "Agendas provided at least 24 hours before meetings",
      "Written summaries / minutes after verbal discussions",
      "Option to contribute via written rather than verbal format",
      "Reduced meeting frequency or shorter meeting durations",
      "One-to-one check-ins preferred over group settings",
    ],
  },
  {
    category: "Task & Workload Management",
    examples: [
      "Clear, written task instructions with explicit deadlines",
      "Tasks broken into smaller, manageable steps",
      "Priority lists or task boards (e.g. Kanban)",
      "Extended deadlines where processing speed is a factor",
      "Reduced multitasking expectations",
    ],
  },
  {
    category: "Technology & Tools",
    examples: [
      "Text-to-speech or speech-to-text software",
      "Mind-mapping or visual planning tools",
      "Screen reader or overlay software",
      "Dual monitors or increased screen size",
      "Access to recording devices for meetings/lectures",
    ],
  },
  {
    category: "Working Patterns & Flexibility",
    examples: [
      "Flexible start/end times to accommodate peak focus periods",
      "Regular scheduled breaks (e.g. Pomodoro technique)",
      "Option to work from home on sensory-overload days",
      "Phased return after periods of burnout or overwhelm",
      "Compressed hours to reduce commuting days",
    ],
  },
  {
    category: "Training & Support",
    examples: [
      "Neurodiversity awareness training for line managers",
      "Assigned mentor or workplace buddy",
      "Access to occupational therapy or coaching",
      "Regular structured review meetings with manager",
      "Reasonable time allowance for professional development",
    ],
  },
] as const;

export const intakeFormSchema = z.object({
  // Personal Details
  individualName: z.string().min(1, "Name is required"),
  pronouns: z.string().optional(),
  jobTitle: z.string().min(1, "Job title or role is required"),
  department: z.string().optional(),
  organisationName: z.string().min(1, "Organisation name is required"),
  managerName: z.string().optional(),

  // Neurodivergence Profile
  neurodivergenceTypes: z.array(z.string()).min(1, "Select at least one"),
  otherNeurodivergence: z.string().optional(),
  diagnosisStatus: z.enum([
    "Formal diagnosis",
    "Awaiting assessment",
    "Self-identified",
  ]),
  diagnosticianName: z.string().optional(),
  diagnosisDate: z.string().optional(),

  // Work Environment
  workEnvironment: z.string().min(1, "Select a work environment"),
  challengeAreas: z
    .array(z.string())
    .min(1, "Select at least one challenge area"),
  challengeDetails: z.string().optional(),

  // Strengths
  strengths: z.string().min(1, "Describe at least one strength"),

  // Recommended Adjustments
  selectedAdjustments: z
    .array(z.string())
    .min(1, "Select at least one adjustment"),
  additionalAdjustments: z.string().optional(),

  // Assessor Details
  assessorName: z.string().min(1, "Assessor name is required"),
  assessorRole: z.string().min(1, "Assessor role is required"),
  assessorOrganisation: z.string().optional(),
  assessmentDate: z.string().min(1, "Assessment date is required"),

  // Output Format
  outputFormat: z
    .enum(["personal_letter", "formal_report"])
    .default("personal_letter"),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;

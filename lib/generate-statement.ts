import type { IntakeFormData } from "@/lib/types"
import { adjustmentCategories } from "@/lib/types"

/**
 * Generates a Reasonable Adjustment Statement as structured HTML.
 * This is used server-side to create the PDF content.
 */

function getPronouns(pronouns?: string) {
  const p = (pronouns || "they/them").toLowerCase()
  if (p.startsWith("he")) return { subject: "he", object: "him", possessive: "his", reflexive: "himself" }
  if (p.startsWith("she")) return { subject: "she", object: "her", possessive: "her", reflexive: "herself" }
  return { subject: "they", object: "them", possessive: "their", reflexive: "themselves" }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "N/A"
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

function categoriseAdjustments(selected: string[]) {
  const categorised: Record<string, string[]> = {}
  for (const adj of selected) {
    let found = false
    for (const cat of adjustmentCategories) {
      if (cat.examples.includes(adj as never)) {
        if (!categorised[cat.category]) categorised[cat.category] = []
        categorised[cat.category].push(adj)
        found = true
        break
      }
    }
    if (!found) {
      if (!categorised["Other"]) categorised["Other"] = []
      categorised["Other"].push(adj)
    }
  }
  return categorised
}

export function generatePersonalLetter(data: IntakeFormData): string {
  const p = getPronouns(data.pronouns)
  const categorised = categoriseAdjustments(data.selectedAdjustments)

  const neurodivergenceList = data.neurodivergenceTypes
    .map((n) => (n === "Other" && data.otherNeurodivergence ? data.otherNeurodivergence : n))
    .join(", ")

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { font-family: 'Georgia', serif; color: #1a1a1a; margin: 40px; line-height: 1.7; font-size: 12pt; }
  h1 { font-size: 20pt; color: #1a5c5c; border-bottom: 2px solid #1a5c5c; padding-bottom: 8px; }
  h2 { font-size: 14pt; color: #1a5c5c; margin-top: 24px; }
  h3 { font-size: 12pt; color: #2a7a7a; margin-top: 16px; }
  .header-meta { color: #666; font-size: 10pt; margin-bottom: 24px; }
  .legal-ref { background: #f0f7f7; padding: 12px 16px; border-left: 3px solid #2a7a7a; margin: 16px 0; font-size: 10pt; color: #444; }
  ul { padding-left: 20px; }
  li { margin-bottom: 4px; }
  .signature-block { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; }
  .footer { margin-top: 40px; font-size: 9pt; color: #888; border-top: 1px solid #eee; padding-top: 12px; }
</style>
</head>
<body>

<h1>Reasonable Adjustment Statement</h1>
<div class="header-meta">
  <strong>Prepared for:</strong> ${data.individualName}${data.pronouns ? ` (${data.pronouns})` : ""}<br/>
  <strong>Role:</strong> ${data.jobTitle}${data.department ? `, ${data.department}` : ""}<br/>
  <strong>Organisation:</strong> ${data.organisationName}<br/>
  ${data.managerName ? `<strong>Line Manager:</strong> ${data.managerName}<br/>` : ""}
  <strong>Date:</strong> ${formatDate(data.assessmentDate)}
</div>

<div class="legal-ref">
  <strong>Legal Basis:</strong> This statement is prepared in accordance with the Equality Act 2010
  (Sections 6, 20, and 21), which defines neurodivergent conditions as disabilities where they have a
  substantial and long-term adverse effect on day-to-day activities. Employers and educational
  institutions have a legal duty to make reasonable adjustments to remove barriers and level the
  playing field.
</div>

<h2>Dear ${data.managerName || "Line Manager / Disability Support Team"},</h2>

<p>
  I am writing to share my Reasonable Adjustment Statement, which has been prepared
  following ${data.diagnosisStatus === "Formal diagnosis" ? "a formal assessment" : "a needs-based assessment"}.
  The purpose of this document is not to request special treatment, but to identify
  practical adjustments that will allow me to perform at my best and contribute
  fully to ${p.possessive === "their" ? "the" : "our"} team.
</p>

<h2>1. Neurodivergence Profile</h2>
<p>
  I have been ${data.diagnosisStatus === "Formal diagnosis" ? "formally diagnosed" : data.diagnosisStatus === "Awaiting assessment" ? "referred for formal assessment" : "self-identified"} with: <strong>${neurodivergenceList}</strong>.
  ${data.diagnosticianName ? ` This was assessed by ${data.diagnosticianName}${data.diagnosisDate ? ` on ${formatDate(data.diagnosisDate)}` : ""}.` : ""}
</p>

<h2>2. My Strengths</h2>
<p>${data.strengths}</p>
<p>
  These strengths are a direct asset to ${data.organisationName} and should be
  recognised alongside the adjustments below.
</p>

<h2>3. Areas Where I Experience Barriers</h2>
<p>In my role as ${data.jobTitle} (${data.workEnvironment} environment), I experience challenges in the following areas:</p>
<ul>
  ${data.challengeAreas.map((c) => `<li>${c}</li>`).join("\n  ")}
</ul>
${data.challengeDetails ? `<p><strong>Additional context:</strong> ${data.challengeDetails}</p>` : ""}

<h2>4. Recommended Reasonable Adjustments</h2>
<p>
  The following adjustments are recommended to remove barriers and enable me to
  perform to the same standard as my peers. They are proportionate, practical,
  and aligned with EHRC and ACAS guidance.
</p>
${Object.entries(categorised)
  .map(
    ([cat, items]) => `
<h3>${cat}</h3>
<ul>
  ${items.map((item) => `<li>${item}</li>`).join("\n  ")}
</ul>`
  )
  .join("")}
${data.additionalAdjustments ? `<h3>Additional Adjustments</h3><p>${data.additionalAdjustments}</p>` : ""}

<h2>5. Implementation</h2>
<p>
  I recommend that these adjustments are reviewed within 2 weeks of receipt of
  this document and implemented within 4 weeks. A follow-up review should be
  scheduled for 6-8 weeks after implementation to assess effectiveness.
</p>
<p>
  I am happy to discuss any of these adjustments and work collaboratively to
  find solutions that work for both myself and the team.
</p>

<div class="signature-block">
  <p><strong>Prepared by:</strong> ${data.assessorName}<br/>
  <strong>Role:</strong> ${data.assessorRole}<br/>
  ${data.assessorOrganisation ? `<strong>Organisation:</strong> ${data.assessorOrganisation}<br/>` : ""}
  <strong>Date:</strong> ${formatDate(data.assessmentDate)}</p>
</div>

<div class="footer">
  <p><strong>Confidentiality Notice:</strong> This document contains sensitive personal information
  relating to neurodivergent conditions and is shared in confidence for the sole purpose of
  implementing reasonable adjustments. It must not be shared without the explicit consent of the
  individual named above.</p>
  <p>Generated by ClearGuide | Grounded in the UK Equality Act 2010</p>
</div>

</body>
</html>`
}

export function generateFormalReport(data: IntakeFormData): string {
  const p = getPronouns(data.pronouns)
  const categorised = categoriseAdjustments(data.selectedAdjustments)

  const neurodivergenceList = data.neurodivergenceTypes
    .map((n) => (n === "Other" && data.otherNeurodivergence ? data.otherNeurodivergence : n))
    .join(", ")

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { font-family: 'Georgia', serif; color: #1a1a1a; margin: 40px; line-height: 1.7; font-size: 12pt; }
  h1 { font-size: 20pt; color: #1a5c5c; border-bottom: 2px solid #1a5c5c; padding-bottom: 8px; }
  h2 { font-size: 14pt; color: #1a5c5c; margin-top: 24px; }
  h3 { font-size: 12pt; color: #2a7a7a; margin-top: 16px; }
  .header-meta { color: #666; font-size: 10pt; margin-bottom: 24px; }
  .legal-ref { background: #f0f7f7; padding: 12px 16px; border-left: 3px solid #2a7a7a; margin: 16px 0; font-size: 10pt; color: #444; }
  ul { padding-left: 20px; }
  li { margin-bottom: 4px; }
  .signature-block { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; }
  .footer { margin-top: 40px; font-size: 9pt; color: #888; border-top: 1px solid #eee; padding-top: 12px; }
</style>
</head>
<body>

<h1>Reasonable Adjustment Statement</h1>
<p style="font-size: 11pt; color: #666;">Formal Assessment Report</p>

<div class="header-meta">
  <strong>Subject:</strong> ${data.individualName}${data.pronouns ? ` (${data.pronouns})` : ""}<br/>
  <strong>Role:</strong> ${data.jobTitle}${data.department ? `, ${data.department}` : ""}<br/>
  <strong>Organisation:</strong> ${data.organisationName}<br/>
  ${data.managerName ? `<strong>Line Manager:</strong> ${data.managerName}<br/>` : ""}
  <strong>Assessment Date:</strong> ${formatDate(data.assessmentDate)}<br/>
  <strong>Assessor:</strong> ${data.assessorName}, ${data.assessorRole}${data.assessorOrganisation ? `, ${data.assessorOrganisation}` : ""}
</div>

<div class="legal-ref">
  <strong>Legal Framework:</strong> This report is prepared under the Equality Act 2010
  (Sections 6, 20, and 21). Under this legislation, neurodivergent conditions constitute
  disabilities where they have a substantial and long-term adverse effect on a person's
  ability to carry out normal day-to-day activities. The duty to make reasonable adjustments
  is anticipatory and ongoing.
</div>

<h2>1. Background</h2>
<p>
  ${data.individualName} is employed as ${data.jobTitle} at ${data.organisationName}
  in a ${data.workEnvironment.toLowerCase()} setting.
  ${p.subject.charAt(0).toUpperCase() + p.subject.slice(1)} has been
  ${data.diagnosisStatus === "Formal diagnosis" ? "formally diagnosed" : data.diagnosisStatus === "Awaiting assessment" ? "referred for formal assessment" : "self-identified"}
  with <strong>${neurodivergenceList}</strong>.
  ${data.diagnosticianName ? `The assessment was conducted by ${data.diagnosticianName}${data.diagnosisDate ? ` on ${formatDate(data.diagnosisDate)}` : ""}.` : ""}
</p>

<h2>2. Identified Strengths</h2>
<p>${data.strengths}</p>
<p>
  It is recommended that ${data.individualName}'s line management team recognise
  and leverage these strengths when assigning responsibilities and considering
  career development.
</p>

<h2>3. Functional Impact Assessment</h2>
<p>The following areas have been identified as presenting barriers to ${data.individualName}'s full and equal participation:</p>
<ul>
  ${data.challengeAreas.map((c) => `<li>${c}</li>`).join("\n  ")}
</ul>
${data.challengeDetails ? `<p><strong>Assessor notes:</strong> ${data.challengeDetails}</p>` : ""}

<h2>4. Recommended Reasonable Adjustments</h2>
<p>
  The following adjustments are recommended in accordance with EHRC Statutory Code
  of Practice and ACAS guidance on reasonable adjustments. These are designed to
  level the playing field, not to confer advantage.
</p>
${Object.entries(categorised)
  .map(
    ([cat, items]) => `
<h3>${cat}</h3>
<ul>
  ${items.map((item) => `<li>${item}</li>`).join("\n  ")}
</ul>`
  )
  .join("")}
${data.additionalAdjustments ? `<h3>Additional Recommendations</h3><p>${data.additionalAdjustments}</p>` : ""}

<h2>5. Implementation Timeline</h2>
<table style="width:100%; border-collapse:collapse; margin-top:12px; font-size:11pt;">
  <tr style="background:#f0f7f7;">
    <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Action</td>
    <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Timeframe</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #ddd;">Review of adjustments with ${data.individualName}</td>
    <td style="padding:8px; border:1px solid #ddd;">Within 2 weeks</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #ddd;">Implementation of agreed adjustments</td>
    <td style="padding:8px; border:1px solid #ddd;">Within 4 weeks</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #ddd;">First review of effectiveness</td>
    <td style="padding:8px; border:1px solid #ddd;">6-8 weeks post-implementation</td>
  </tr>
  <tr>
    <td style="padding:8px; border:1px solid #ddd;">Ongoing periodic review</td>
    <td style="padding:8px; border:1px solid #ddd;">Every 6 months or as needed</td>
  </tr>
</table>

<div class="signature-block">
  <p><strong>Assessor:</strong> ${data.assessorName}<br/>
  <strong>Role:</strong> ${data.assessorRole}<br/>
  ${data.assessorOrganisation ? `<strong>Organisation:</strong> ${data.assessorOrganisation}<br/>` : ""}
  <strong>Date:</strong> ${formatDate(data.assessmentDate)}</p>

  <p style="margin-top:24px;"><strong>Signature (individual):</strong> _________________________<br/>
  <strong>Name:</strong> ${data.individualName}<br/>
  <strong>Date:</strong> _________________________</p>

  <p style="margin-top:24px;"><strong>Signature (employer/institution):</strong> _________________________<br/>
  <strong>Name:</strong> ${data.managerName || "_________________________"}<br/>
  <strong>Date:</strong> _________________________</p>
</div>

<div class="footer">
  <p><strong>Confidentiality Notice:</strong> This document contains sensitive personal information
  relating to ${data.individualName}'s neurodivergent conditions. It is shared in confidence
  for the sole purpose of implementing reasonable adjustments under the Equality Act 2010.
  Distribution without explicit consent is a breach of data protection obligations under
  UK GDPR.</p>
  <p>Generated by ClearGuide | Grounded in the UK Equality Act 2010</p>
</div>

</body>
</html>`
}

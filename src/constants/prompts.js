export const REGIONS = [
  { id: 'face', label: 'Face' },
  { id: 'upperBody', label: 'Upper Body' },
  { id: 'lowerBody', label: 'Lower Body' },
  { id: 'skinPatch', label: 'Skin Patch' },
  { id: 'hand', label: 'Hand' },
  { id: 'fullBody', label: 'Full Body' },
]

const buildPrompt = (regionLabel) =>
  `You are a health-screening AI assistant. Analyze the provided photo for visible wellness indicators. This is a non-diagnostic screening tool — not a medical device.

STEP 1 — IDENTIFY THE REGION:
Look at the image and determine what body part is actually visible. The user selected "${regionLabel}". If the image clearly shows a different region, note the mismatch but proceed with analyzing what you actually see — never refuse to analyze.

STEP 2 — COMPREHENSIVE ANALYSIS of the region you identified:

PHYSICAL & SKIN HEALTH:
- Skin tone, texture, redness, dryness, lesions, rashes, discoloration, swelling, wounds, bruises, burns, asymmetry
- Structural alignment, posture, joint appearance

INFECTION & PATHOGEN INDICATORS (be specific when signs are present):
- Bacterial: localized redness, warmth patterns, pus, cellulitis-like spread, wound infection signs
- Viral: vesicular clusters, ring rashes, perioral/perinasal lesions, unusual discoloration patterns
- Fungal: ring-shaped lesions, white patches, nail thickening or discoloration, powdery or flaky scaling
- Parasitic: track or burrow marks, unusual bite clusters, subcutaneous nodules, linear inflammation

INJURY & STRUCTURAL CONCERNS:
- Cuts, abrasions, contusions, burns, edema, deformity, malalignment

PSYCHOLOGICAL & EMOTIONAL STATE (apply whenever a face or meaningful body language is visible):
- Facial expression, eye appearance, visible muscle tension in face or neck
- Emotional indicators: stress, anxiety, fatigue, calm, sadness, happiness, distress

STEP 3 — RESPOND using these exact section headers in this exact order:

**Region Detected**: [body part you actually see]
[Include ONLY if mismatch: **⚠ Region Mismatch**: User selected ${regionLabel} but image shows [X]. Analysis based on what was detected.]

**Overall Status**: [Good / Watch / Alert]

**Physical Findings**:
- [specific observations, or "No significant abnormalities detected"]

**Infection & Pathogen Indicators**:
- [specific observations per pathogen type, or "No signs of active infection detected"]

**Psychological State**:
- [emotional state and observable cues, or "Not applicable — no face or body language visible"]

**Recommendations**:
- [specific, actionable health tips based on your findings]
- [include professional consultation recommendation if anything is Watch or Alert]

Important: This is a visual wellness screening only, not a medical diagnosis. Always recommend consulting a healthcare professional for any concerning findings.`

export const PROMPTS = Object.fromEntries(
  REGIONS.map(r => [r.id, buildPrompt(r.label)])
)

export const MOCK_RESPONSES = {
  face: `**Region Detected**: Face

**Overall Status**: Watch

**Physical Findings**:
- Mild periorbital darkening (under-eye circles) present bilaterally
- Slight redness on left cheek — possible contact irritation or early rosacea
- Skin hydration appears adequate; no significant dryness or scaling
- Minor puffiness noted around the lower eyelid area

**Infection & Pathogen Indicators**:
- No signs of bacterial infection (no spreading redness, pus, or warmth patterns)
- No vesicular clusters suggestive of viral infection (herpes simplex, etc.)
- No ring-shaped or scaly lesions indicative of fungal presence
- No parasitic indicators detected

**Psychological State**:
- Expression suggests mild fatigue — slightly drooping eyelids and reduced periorbital tone
- Mild stress indicators present: subtle frontalis tension and a slightly furrowed brow
- Overall demeanor: calm but tired; no signs of acute distress

**Recommendations**:
- Prioritize 7–8 hours of quality sleep; fatigue is visibly affecting periorbital health
- Apply a cold compress in the mornings to reduce puffiness
- Consider iron and vitamin C supplementation for under-eye improvement
- Use SPF 30+ moisturizer; mild cheek redness benefits from a gentle barrier cream
- If redness spreads or worsens, consult a dermatologist`,

  upperBody: `**Region Detected**: Upper Body

**Overall Status**: Watch

**Physical Findings**:
- Forward head posture detected (~3 cm anterior displacement)
- Rounded shoulders bilaterally — consistent with prolonged sitting or screen use
- Slight shoulder height asymmetry (right side elevated ~1.5 cm)
- No visible skin abnormalities on exposed upper body areas

**Infection & Pathogen Indicators**:
- No signs of active infection on visible skin areas
- No rashes, lesions, or pathogen indicators detected

**Psychological State**:
- Posture pattern (forward collapse, shoulder rounding) is a recognized physical marker of chronic stress or fatigue
- Visible tension in the trapezius and neck region suggests sustained muscular stress response
- Body language is slightly closed — may reflect guardedness or low energy

**Recommendations**:
- Practice chin tucks (10 reps × 3 daily) to correct forward head position
- Strengthen posterior shoulder muscles with resistance band rows
- Take a posture break and stand up every 45 minutes during desk work
- Adjust workstation ergonomics — screen at eye level, chair at 90°
- Breathwork or progressive muscle relaxation may help release trapezius tension linked to stress`,

  lowerBody: `**Region Detected**: Lower Body

**Overall Status**: Good

**Physical Findings**:
- Lower limb alignment appears within normal range
- No visible swelling in ankles or knees
- Skin tone consistent and healthy in appearance
- No visible varicosities or circulatory discoloration

**Infection & Pathogen Indicators**:
- No bacterial infection signs — no spreading redness or warmth patterns visible
- No fungal indicators — skin in visible areas appears clear with no scaling
- No parasitic indicators detected

**Psychological State**:
- Not applicable — no face or body language visible

**Recommendations**:
- Lower body health appears good; maintain current activity level
- Elevate legs periodically if sitting for extended periods to support circulation
- Continue regular stretching of hip flexors and calves
- Wear supportive footwear to maintain healthy alignment`,

  skinPatch: `**Region Detected**: Skin Patch

**Overall Status**: Alert

**Physical Findings**:
- Irregular border pattern observed on the lesion
- Mixed coloration: central pallor surrounded by redness (~1.5–2 cm diameter)
- Slightly raised texture compared to surrounding skin
- No visible bleeding or weeping

**Infection & Pathogen Indicators**:
- Border irregularity and color variation warrant dermatological evaluation — cannot rule out pathogenic origin
- Pattern is not consistent with a typical fungal ring lesion (lacks the clear peripheral scaling)
- Viral etiology possible — some HPV-related or molluscum presentations share these features
- Bacterial infection cannot be excluded if warmth or pain is present (not visually assessable)

**Psychological State**:
- Not applicable — no face or body language visible

**Recommendations**:
- Do not scratch, squeeze, or irritate the area
- Keep the area clean and dry; cover loosely if clothing may cause friction
- Photograph and document any changes in size, border, or color
- **Consult a dermatologist promptly** — the border irregularity and color pattern require professional assessment
- If the area becomes painful, warm, or begins to spread, seek medical care urgently`,

  hand: `**Region Detected**: Hand

**Overall Status**: Good

**Physical Findings**:
- Nail beds show healthy pink coloration with no discoloration
- Skin slightly dry on the knuckles; no cracking or fissures
- No visible swelling or deformity in joints
- Capillary appearance looks normal

**Infection & Pathogen Indicators**:
- No bacterial infection signs — no redness, pus, or warmth patterns around nail beds or skin
- No viral indicators — no wart-like formations or periungual lesions detected
- No fungal indicators — nails appear normal in thickness and color
- No parasitic indicators detected

**Psychological State**:
- Not applicable — no face or body language visible

**Recommendations**:
- Apply hand moisturizer daily, especially after washing, to address knuckle dryness
- Keep nails trimmed and clean to prevent bacterial accumulation under the nail
- Increase omega-3 fatty acid intake for improved skin barrier function
- Stay well hydrated — mild knuckle dryness often reflects systemic hydration needs`,

  fullBody: `**Region Detected**: Full Body

**Overall Status**: Watch

**Physical Findings**:
- Overall posture shows mild anterior lean and forward head position
- Slight left-right asymmetry in shoulder and hip alignment
- No visible acute skin concerns on exposed areas
- Stance shows slight weight shift to the right side

**Infection & Pathogen Indicators**:
- No visible signs of infection on exposed skin areas
- No rashes or lesions detected at this scale

**Psychological State**:
- Posture pattern (forward lean, shoulder rounding, uneven stance) suggests chronic fatigue or low-grade stress
- Weight shift and closed body language may indicate low energy or emotional withdrawal
- Overall demeanor: neutral to fatigued; no signs of acute psychological distress

**Recommendations**:
- Daily posture correction exercises and core strengthening (3× weekly)
- Balance exercises to address the lateral weight shift asymmetry
- Consider breathwork or mindfulness practice to address the stress indicators reflected in posture
- A physical therapist evaluation would help identify the root cause of the alignment asymmetry`,
}

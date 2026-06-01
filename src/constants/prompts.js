export const REGIONS = [
  { id: 'face', label: 'Face' },
  { id: 'upperBody', label: 'Upper Body' },
  { id: 'lowerBody', label: 'Lower Body' },
  { id: 'skinPatch', label: 'Skin Patch' },
  { id: 'hand', label: 'Hand' },
  { id: 'fullBody', label: 'Full Body' },
]

export const PROMPTS = {
  face: `Analyze this face image for visible health indicators. Look for:
- Skin conditions (redness, dryness, blemishes, discoloration)
- Signs of fatigue (dark circles, puffiness)
- Stress indicators and general skin health

Provide a structured response with these sections:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Bullet list of what you see
**Recommendations**: Actionable health tips based on your findings`,

  upperBody: `Analyze this upper body image for health indicators. Look for:
- Posture alignment (head, shoulders, spine)
- Visible skin conditions
- Signs of tension or discomfort

Provide a structured response:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Bullet list of what you see
**Recommendations**: Actionable health tips`,

  lowerBody: `Analyze this lower body image for health indicators. Look for:
- Posture and alignment of lower limbs
- Visible skin conditions
- Signs of swelling or circulatory concerns

Provide a structured response:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Bullet list
**Recommendations**: Actionable tips`,

  skinPatch: `Analyze this skin patch image carefully. Look for:
- Color irregularities, redness, or discoloration
- Texture changes (rough, scaly, raised)
- Signs of irritation, infection, or dermatological concern

Provide:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Detailed bullet list
**Recommendations**: Next steps (topical care, monitoring, or professional consultation)`,

  hand: `Analyze this hand image for health indicators. Look for:
- Nail health (color, texture, growth)
- Skin condition (dryness, redness, lesions)
- Visible joint concerns and circulation indicators

Provide:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Bullet list
**Recommendations**: Care tips`,

  fullBody: `Analyze this full body image for overall health indicators. Look for:
- Overall posture and body alignment
- Visible skin conditions
- Signs of inflammation or asymmetry

Provide:
**Overall Status**: (Good / Watch / Alert)
**Observations**: Bullet list of key findings
**Recommendations**: Actionable wellness suggestions`,
}

export const MOCK_RESPONSES = {
  face: `**Overall Status**: Watch

**Observations**:
- Mild periorbital darkening (under-eye circles) bilaterally
- Slight redness on left cheek, possibly from irritation
- Skin texture appears normal with adequate hydration
- No significant blemishes or lesions detected
- Minor signs of fatigue in facial expression

**Recommendations**:
- Ensure 7–8 hours of quality sleep nightly
- Apply a cold compress to reduce puffiness
- Consider iron and vitamin C rich foods
- Use SPF 30+ moisturizer daily
- Stay hydrated (minimum 2L water/day)`,

  upperBody: `**Overall Status**: Watch

**Observations**:
- Forward head posture detected (~3cm anterior displacement)
- Rounded shoulders bilaterally
- Slight asymmetry in shoulder height (right 1.5cm higher)
- No visible skin abnormalities on upper body
- Muscle tension visible in trapezius area

**Recommendations**:
- Practice chin tucks (10 reps × 3 daily)
- Strengthen posterior shoulder muscles
- Take posture breaks every 45 minutes
- Consider ergonomic workstation adjustment
- Thoracic spine mobility exercises recommended`,

  lowerBody: `**Overall Status**: Good

**Observations**:
- Lower limb alignment appears within normal range
- No visible swelling in ankles or knees
- Skin tone consistent and healthy-looking
- No visible varicosities or circulatory concerns
- Hip alignment appears symmetrical

**Recommendations**:
- Maintain current activity levels
- Elevate legs periodically if sitting for long periods
- Continue regular stretching of hip flexors
- Wear supportive footwear`,

  skinPatch: `**Overall Status**: Alert

**Observations**:
- Irregular border pattern on the observed patch
- Mixed coloration: areas of redness with central pallor
- Slightly raised texture compared to surrounding skin
- Approximate diameter: 1.5–2 cm
- No visible bleeding or weeping

**Recommendations**:
- Do not scratch or irritate the area
- Keep the area clean and dry
- Monitor for changes in size or color over the next 7 days
- **Consult a dermatologist** — this pattern warrants professional evaluation
- Photograph and document any changes`,

  hand: `**Overall Status**: Good

**Observations**:
- Nail beds show healthy pink coloration
- No visible clubbing or discoloration of nails
- Skin appears slightly dry on knuckles
- No visible joint swelling or deformity
- Good capillary refill appearance

**Recommendations**:
- Apply hand moisturizer daily, especially after washing
- Keep nails trimmed and clean
- Increase omega-3 fatty acids for skin health
- Stay hydrated`,

  fullBody: `**Overall Status**: Watch

**Observations**:
- Overall posture shows mild forward lean
- Slight left-right asymmetry in shoulder and hip alignment
- No visible acute skin concerns
- Body proportions appear healthy
- Stance shows slight weight shift to right side

**Recommendations**:
- Daily posture assessment and correction exercises
- Core strengthening routine (3× weekly)
- Balance exercises to address lateral asymmetry
- Consider assessment by a physical therapist for alignment`,
}

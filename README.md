PA Midterm Policy Match

A privacy-first policy matching platform for the 2026 Pennsylvania midterm elections.

Live Demo

https://mouseinahat.github.io/PA-Midterm-Policy-Match/

---

Why This Exists

Most political tools focus on parties, personalities, or endorsements.

This project focuses on policies.

The goal is to help voters:

- Understand their own policy preferences
- Compare those preferences with candidates
- Explore public issues more transparently
- Learn why a match occurs

This project is not intended to persuade users whom to support.

Instead, it aims to make policy positions easier to understand, compare, and evaluate.

---

Current Features

Pennsylvania Governor Match

Compare your policy preferences with:

- Josh Shapiro (Democratic)
- Stacy Garrity (Republican)

Policy Questionnaire

- 25 policy questions
- 12 policy dimensions
- Transparent scoring system

ZIP Code Routing (Prototype)

Users can enter a Pennsylvania ZIP code to preview future district-based matching functionality.

Methodology Page

View:

- Policy dimensions
- Candidate vectors
- Scoring framework

Sources Page

Every candidate score should ultimately be backed by public evidence.

The Sources page documents:

- Position summaries
- Confidence levels
- Supporting sources
- Areas requiring additional verification

Privacy-First Design

Current version:

- No account system
- No email collection
- No phone number collection
- No personal identity collection
- No political profile storage

---

Project Philosophy

This project follows four principles:

1. Transparency

Scoring methods should be visible and understandable.

2. Privacy

Users should not need to reveal their identity to explore policy preferences.

3. Neutrality

The platform should help users understand candidates, not advocate for candidates.

4. Verifiability

Every candidate position should eventually be traceable to a public source.

---

Technology Stack

Frontend:

- HTML
- CSS
- JavaScript

Hosting:

- GitHub Pages

Current Data Layer:

- JSON files

Planned Data Layer:

- PostgreSQL
- Supabase

---

Project Structure

PA-Midterm-Policy-Match/
├── index.html
├── methodology.html
├── sources.html
├── privacy.html
├── data/
│   ├── axis-meta.json
│   ├── candidates.json
│   ├── questions.json
│   ├── position-sources.json
│   └── sample-zip-to-district.json
└── src/
    ├── app.js
    ├── methodology.js
    ├── sources.js
    └── styles.css

---

Roadmap

v0 — Governor Match MVP ✅

- Pennsylvania Governor matching
- 25 policy questions
- ZIP prototype
- Sources page
- Methodology page

v1 — Source-Based Candidate Database

- Candidate citations
- Confidence scoring
- Position evidence viewer
- Stronger verification standards

v2 — Real Ballot Matching

- Real ZIP lookup
- Congressional district detection
- House candidate matching
- State legislature matching

v3 — Privacy-Preserving Profiles

- Anonymous participation keys
- Local-only profile storage
- Policy DNA
- Result sharing

v4 — Civic Statistics Platform

- Issue polling
- Public dashboards
- Anonymous opinion collection
- Aggregate statistics

v5 — Consensus Engine

- AI-generated issue summaries
- Agreement detection
- Common-ground analysis
- Public policy exploration

---

Known Limitations

This project is currently a prototype.

Current limitations include:

- Candidate vectors are partially modeled
- Some policy dimensions require additional sourcing
- ZIP routing is a demonstration dataset
- Congressional matching is not yet implemented
- No anti-bot infrastructure exists yet

---

Contributing

Contributions are welcome.

Particularly valuable areas include:

- Pennsylvania policy research
- Candidate source verification
- UI/UX improvements
- Accessibility
- Civic technology
- Election data integration

---

Disclaimer

This project is an independent educational and civic-technology initiative.

It is not affiliated with:

- Any candidate
- Any political party
- Any campaign
- Any government agency

Users should consult official election resources and candidate materials before making voting decisions.
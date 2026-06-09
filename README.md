# Pennsylvania 2026 Policy Match v0

A privacy-first policy matching MVP for the 2026 Pennsylvania midterm ballot.

## What this includes

- Pennsylvania Governor match: Josh Shapiro vs. Stacy Garrity
- 25 policy questions
- 12 U.S. policy axes
- Methodology page
- Privacy page
- Sample ZIP → congressional district routing
- House race placeholder architecture

## Important limitations

This is an MVP prototype.

- ZIP mapping is only a small sample, not production-grade.
- House candidate matching is not enabled yet.
- Candidate vectors are provisional and must be backed by citations before public launch.
- No server, account system, database, or bot protection is included yet.

## File structure

```text
pa-midterm-policy-match-v0/
├── index.html
├── methodology.html
├── privacy.html
├── data/
│   ├── axis-meta.json
│   ├── candidates.json
│   ├── questions.json
│   ├── sample-zip-to-district.json
│   └── house-placeholders.json
└── src/
    ├── app.js
    ├── methodology.js
    └── styles.css
```

## Local run

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages

Upload the files to a GitHub repository and enable:

Settings → Pages → Deploy from branch → main / root

## Next version

v1 should add:

- Real ZIP/geocoding/civic API
- Confirmed House candidates by district
- Source citations for each candidate vector
- Supabase database
- Anonymous participation key
- Turnstile bot protection
- Aggregated issue statistics

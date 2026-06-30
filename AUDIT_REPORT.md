# Ghost Visualizer VIS-001 Brutal Audit

Date: 2026-06-30

## Executive Verdict

The project has a real thesis and several credible primitives, but it is not yet the premium Remotion scene engine requested in the original brief. It is currently a Vite React visual essay using `motion/react`, CSS keyframes, and interactive app state. That is the largest credibility gap: the work can be reviewed as a cinematic prototype, but not yet as a deterministic Remotion production system.

The strongest material is the mathematical core in `src/math/guardrailComposition.ts`, the deterministic sample rows in `src/evidence/sampleEvaluations.ts`, and the basic story arc in `src/scenes/`. The weakest material was the opening trust beat, ambiguous overlap semantics, decorative interval treatment, inverted atom-table visual semantics, and receipt finale realism. Those high-risk issues were patched in this audit pass.

## Category Scores

| Category | Current score | Brutal assessment |
|---|---:|---|
| Conceptual clarity | 7/10 | Strong thesis, now clearer after shared-miss wording. Still needs a single VIS-001 composition instead of seven app scenes. |
| Visual hierarchy | 6/10 | The opening now gives the 90% score room to become dangerously trustworthy. Later scenes still compete with app chrome outside recording mode. |
| Mathematical faithfulness | 8/10 | The OR bound math is test-backed. Fixed ambiguous overlap fields and atom-table risk styling. Still toy-only. |
| Evidence artifact realism | 6/10 | Added deterministic artifact stack and no-crypto non-claim. Still lacks real hashes, signatures, manifests, and file-backed capsule. |
| Motion timing | 4/10 | Good cinematic intent, but not Remotion-frame deterministic. CSS and `motion/react` remain architectural debt. |
| Component reusability | 5/10 | Components are reusable inside this app, but many requested named Remotion primitives are absent or folded into broader components. |
| Typography and spacing | 7/10 | Switched to Inter / Space Grotesk / JetBrains Mono. Some dense panels still need screenshot-based tuning. |
| Color discipline | 7/10 | Reduced green/gold/purple drift and removed ambient stage sweep. Warning color remains for shared miss and non-claims. |
| Portfolio value | 7/10 | The concept is unusual and memorable. It needs Remotion export, screenshots, and a tighter first 30 seconds. |
| Business/prospect value | 6/10 | Evidence Mode hints at buyer value. It needs real artifact ingestion or at least a manual count builder before enterprise claims. |

## Special Attention Answers

| Question | Answer |
|---|---|
| Does the 90% score feel dangerously trustworthy before it breaks? | Better now. `src/scenes/ColdOpen.tsx` was changed from three cards including a 99% independence baseline to one polished 90% published score plus visible 90/90 marginals. |
| Does the viewer understand that the same score can imply different hidden worlds? | Better now. `src/scenes/SameScoresDifferentWorlds.tsx` explicitly labels World A as complementary misses and World B as aligned misses. |
| Does the dot-world split distinguish complementary vs aligned failures? | Better now. `src/components/DotWorld.tsx` and related labels speak in terms of misses and shared miss overlap. Color/shape encoding still needs visual QA. |
| Does the interval reveal feel like a rigorous claim boundary? | Improved. `src/components/IntervalBand.tsx` now has endpoint ticks, witness labels, and captions tying the band to Fréchet-Hoeffding OR constraints. |
| Does the receipt snap feel like an engineering artifact? | Improved but not done. `src/components/EvidenceArtifactStack.tsx` now shows config, run, receipt, endpoint witness, and non-claim artifacts. It still needs actual file-backed hashes/signature when real provenance exists. |
| Does anything feel like generic AI/SaaS marketing? | Yes: the previous green/gold/purple palette and ambient stage sweep drifted generic. This pass reduced that drift in `src/styles/tokens.css` and `src/styles/global.css`. |

## Weaknesses, Fixes, and Status

| Severity | File / component / scene | Weakness | Why it weakens credibility | Concrete fix | Status |
|---|---|---|---|---|---|
| P0 | `package.json`, `src/App.tsx`, `src/components/SceneStage.tsx` | Not a Remotion project. No `remotion` dependency, no `Root.tsx`, no `Composition`, no `useCurrentFrame`, no `ShatteringPointEstimateScene`, no `ComponentShowcase`. | A Remotion reviewer will immediately reject the delivery as architecturally off-brief, even if the visuals are strong. | Add Remotion runtime and compositions, then port scene timing from app state/CSS to frame-driven cues. | Not implemented in this audit pass; planned in `VIS001_POLISH_PLAN.md`. |
| P0 | `src/components/ScoreCard.tsx`, `src/components/IntervalBand.tsx`, `src/components/ConstraintMachine.tsx`, `src/styles/global.css` | Motion uses `motion/react` and CSS keyframes. | Remotion renders must be deterministic from frame numbers; CSS transitions/animations are specifically unsafe for render parity. | Create frame-driven animation helpers and convert component animation props to `interpolate(frame, ...)`. | Not implemented; too large for safe audit patch. |
| P1 | `src/scenes/ColdOpen.tsx` | Opening showed multiple cards and a 99% combined independence baseline too early. | It diluted the brief's central psychological beat: a single 90% score should feel official before it breaks. | Rebuilt the cold open around one polished 90% published score plus 90/90 marginal tags and "Therefore: safe?" | Implemented. |
| P1 | `src/scenes/PointEstimateCracks.tsx`, `src/components/ConstraintMachine.tsx` | 99% independence point appeared as if it were a supported answer. | It smuggled in an independence assumption and undermined the bounded-claim discipline. | Replaced point-crack number with 90%; removed the 99% point marker from the constraint-machine interval. | Implemented. |
| P1 | `src/components/AtomTable.tsx`, `src/styles/global.css` | `p11` both-block cell was styled as the danger cell; `p00` shared miss was not. | This reverses the risk semantics and would fail mathematical review. | Renamed classes so `p00` is `atom-shared-miss` and `p11` is `atom-both-block`; restyled accordingly. | Implemented. |
| P1 | `src/math/guardrailComposition.ts`, `public/evidence/sample-receipt.json` | Receipt had an ambiguous `overlap` field that represented block overlap, while the story discusses shared-miss overlap. | Ambiguous evidence fields invite misinterpretation and make the artifact look unserious. | Replaced with explicit `blockOverlap` and `sharedMissRate`; regenerated receipt JSON. | Implemented. |
| P1 | `src/components/IntervalBand.tsx` | Interval looked like a decorative uncertainty band. | A bounded claim needs to read as a formal admissible region with witnesses, not as design texture. | Added endpoint ticks, endpoint labels, and optional captions. Updated VIS-001 scenes and Evidence Mode. | Implemented. |
| P1 | `src/components/EvidenceConsole.tsx` | Receipt finale was mostly a pretty metadata console. | An enterprise/security reviewer expects files, scope, run data, non-claims, and artifact boundaries. | Added `EvidenceArtifactStack` with `config.yaml`, `run.json`, `receipt.json`, `endpoint_witnesses.json`, `non_claims.json`. | Implemented. |
| P2 | `src/components/EvidenceConsole.tsx` | Runtime timestamp changed on every load. | A receipt that mutates during viewing looks like theater, not evidence. | Switched timestamp to `sampleReceipt.generatedAt`. | Implemented. |
| P2 | `src/math/guardrailComposition.ts` | Receipt did not explicitly state lack of cryptographic provenance. | The UI visually hints at certificates and sealed artifacts; without a non-claim, that is overclaiming. | Added "This does not provide cryptographic provenance" to `nonClaims`. | Implemented. |
| P2 | `src/scenes/SameScoresDifferentWorlds.tsx`, `src/components/DotWorld.tsx`, `src/scenes/HiddenDependence.tsx` | Labels used generic failure language. | "Failure overlap" is less precise than "shared miss" for harmful OR risk. | Renamed controls, subtitles, chips, and aria text around shared miss overlap. | Implemented. |
| P2 | `src/App.tsx` | Missing `?overlap` query parsed as `0` because `Number(null) === 0`. | The default world split silently showed complementary misses in both worlds, destroying the aligned-failure contrast. | Treat missing `overlap` as `toyExample.maxOverlap`; only parse when the parameter exists. | Implemented. |
| P2 | `src/styles/tokens.css`, `src/styles/global.css` | Palette drifted into green/gold/purple startup/cinema styling. | The brief calls for black field, white truth, blue evidence, restrained warning. Extra hues reduce audit-grade severity. | Switched fonts and major colors; removed purple wash and ambient stage sweep. | Partially implemented. Needs screenshot QA. |
| P2 | `src/components/EvidenceArtifactStack.tsx` | Artifact stack is still derived in memory, not a true file capsule. | It improves realism but is not yet a tamper-evident object. | Later: generate actual artifact files plus manifest and cryptographic hashes. | Partially implemented. |
| P2 | `src/components/*` | Requested primitive names are incomplete: `ScoreObject`, `GuardrailShield`, `WorldPanel`, `FailureOverlapVisualizer`, `ClaimCard`, `FileArtifactStack`, `NonClaimPanel`, `AuditSnapTransition`, `EvidenceCapsuleConcept`. | Reviewers asked for a reusable engine; current components are reusable but not mapped to the requested vocabulary. | Extract/rename primitives and add a primitive showcase composition. | Not implemented. |
| P3 | `src/styles/global.css` | Dense panels can overflow visually in smaller viewports. | Typography/spacing issues signal prototype status. | Added responsive collapse for artifact stack; still needs screenshot-based tuning. | Partially implemented. |
| P3 | `README.md` | README accurately describes Vite app, not Remotion export. | Portfolio viewers may be confused if the project is pitched as Remotion. | Add Remotion section only after Remotion adapter exists. | Not implemented. |

## Implemented Change Log

- `src/scenes/ColdOpen.tsx`: changed opening to a single credible 90% published score plus 90/90 marginals.
- `src/scenes/PointEstimateCracks.tsx`: changed fracture point from 99% independence baseline to 90% point estimate; added rigorous interval caption.
- `src/scenes/SameScoresDifferentWorlds.tsx`: renamed worlds to complementary vs aligned misses; clarified slider and interval language.
- `src/scenes/HiddenDependence.tsx`: renamed hidden layer to shared miss overlap.
- `src/App.tsx`: fixed missing-overlap query parsing so World B defaults to the aligned shared-miss endpoint.
- `src/components/DotWorld.tsx`: changed risk chip/footer semantics to shared miss terminology.
- `src/components/IntervalBand.tsx`: added endpoint ticks, witness labels, and captions.
- `src/components/AtomTable.tsx`: corrected risk atom labeling.
- `src/components/ConstraintMachine.tsx`: removed unsupported 99% point marker.
- `src/components/EvidenceConsole.tsx`: made timestamp deterministic and added artifact stack.
- `src/components/EvidenceArtifactStack.tsx`: added visible config/run/receipt/witness/non-claim artifacts.
- `src/math/guardrailComposition.ts`: replaced ambiguous `overlap` with `blockOverlap` and `sharedMissRate`; added no-crypto non-claim; renamed witness IDs.
- `src/math/guardrailComposition.test.ts`: added assertions for `blockOverlap` and `sharedMissRate`.
- `src/styles/tokens.css`: moved typography toward Inter / Space Grotesk / JetBrains Mono; tightened palette.
- `src/styles/global.css`: corrected atom colors, removed ambient stage sweep, added artifact stack and interval styles.
- `public/evidence/sample-receipt.json`: regenerated from the corrected receipt.

## Verification

- `npm run typecheck`: passed.
- `npm run test`: passed, 6 tests.
- `npm run generate:evidence`: passed and regenerated `public/evidence/sample-receipt.json`.

## Ranked Next 10 Improvements

1. Convert to a real Remotion project with `ShatteringPointEstimateScene` and `ComponentShowcase` compositions.
2. Replace `motion/react` and CSS keyframes with frame-driven Remotion helpers using `useCurrentFrame`, `useVideoConfig`, and explicit easing.
3. Add a VIS-001 timeline/cue schema so beats are inspectable and not distributed across app scene state.
4. Extract requested primitives: `ScoreObject`, `GuardrailShield`, `WorldPanel`, `FailureOverlapVisualizer`, `ClaimCard`, `FileArtifactStack`, `NonClaimPanel`, `AuditSnapTransition`, `EvidenceCapsuleConcept`.
5. Build a true evidence capsule generator that emits `config.yaml`, `run.json`, `receipt.json`, `endpoint_witnesses.json`, `non_claims.json`, plus a manifest.
6. Add real SHA-256 hashes only for generated artifact files and keep the no-crypto non-claim until signing exists.
7. Render desktop/mobile stills for every beat and fix spacing from screenshots, not intuition.
8. Add a proof card for the Fréchet-Hoeffding OR bound with definitions, assumptions, and endpoint construction.
9. Add a manual two-guardrail count builder so business prospects can enter real counts and see bounds/witnesses.
10. Add README screenshots and a short public-facing "what this does not claim" section above the fold.

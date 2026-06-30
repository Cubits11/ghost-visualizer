# VIS-001 Polish Plan

## Objective

Turn the current Ghost Visualizer prototype into a premium, deterministic VIS-001 Remotion scene: "The Shattering Point Estimate." The target is not a generic explainer. The target is a severe, audit-grade cinematic artifact where every visual maps to a claim, assumption, witness, or evidence object.

## Non-Negotiable Acceptance Criteria

- The project has real Remotion compositions named `ShatteringPointEstimateScene` and `ComponentShowcase`.
- All render-critical motion is driven by frame numbers, not CSS keyframes, runtime timers, or `motion/react`.
- The first 20 seconds make a single 90% score feel official, trustworthy, and incomplete.
- The viewer understands that two identical 90% guardrails can imply complementary misses or aligned shared misses.
- The interval reveal reads as a Fréchet-Hoeffding claim boundary with endpoint witnesses.
- The receipt snap shows inspectable engineering artifacts, not decorative metadata.
- The artifact layer never implies cryptographic provenance until actual hashes/signatures exist.
- The palette remains black field, white truth, blue evidence, restrained warning only.

## Workstream 1: Remotion Runtime Conversion

Priority: P0

Files to create or change:
- `package.json`
- `src/Root.tsx`
- `src/remotion/ShatteringPointEstimateScene.tsx`
- `src/remotion/ComponentShowcase.tsx`
- `src/remotion/timeline.ts`
- `src/remotion/motion.ts`

Tasks:
1. Add Remotion dependencies and scripts:
   - `remotion`
   - `@remotion/cli` if needed by the chosen setup
   - `npm run studio`
   - `npm run render:vis001`
   - `npm run still:vis001`
2. Register `ShatteringPointEstimateScene` at 1920x1080, 30fps, exact duration from storyboard.
3. Register `ComponentShowcase` for primitive review.
4. Build a frame cue helper:
   - `seconds(value, fps)`
   - `cue(frame, startSec, durationSec, fps, easing)`
   - `hold(frame, startSec, endSec, fps)`
5. Migrate VIS-001-critical scenes away from `motion/react` and CSS keyframes.

Acceptance check:
- `npx remotion still ShatteringPointEstimateScene --frame=30 --scale=0.25` renders a nonblank first-second frame.
- No VIS-001 render-critical component imports `motion/react`.

## Workstream 2: Beat-Level Story Polish

Priority: P0

Files:
- `src/scenes/ColdOpen.tsx`
- `src/scenes/HiddenDependence.tsx`
- `src/scenes/SameScoresDifferentWorlds.tsx`
- `src/scenes/PointEstimateCracks.tsx`
- `src/components/ScoreCard.tsx`
- future `src/components/ScoreObject.tsx`

Tasks:
1. False certainty:
   - Make the 90% score occupy the center alone for at least 2.5 seconds.
   - Delay guardrail labels until after the score has earned trust.
   - Add a subtle "published safety score" treatment without using badge/compliance cosplay.
2. Wrong inference:
   - Reveal "Guardrail A: 90%" and "Guardrail B: 90%" as marginal facts.
   - Show "Therefore: safe?" as a fragile inference, not as narrator truth.
3. Assumption fracture:
   - Reveal the hidden assumption layer with the exact label `hidden variable: shared miss overlap`.
   - Fracture should be sudden and mechanical, not particle-noise chaos.
4. World split:
   - Use `World A: complementary misses` and `World B: aligned misses`.
   - Keep A/B marginals visibly pinned at 90/90 while only shared miss overlap changes.
5. Interval reveal:
   - Animate point-to-bound as a formal transformation.
   - Endpoint labels must match witness IDs.

Acceptance check:
- A viewer can pause on any major frame and identify the claim being made.
- No frame implies "90% means safe."

## Workstream 3: Primitive Extraction

Priority: P1

Files:
- `src/components/ScoreObject.tsx`
- `src/components/GuardrailShield.tsx`
- `src/components/DotGrid100.tsx`
- `src/components/WorldPanel.tsx`
- `src/components/FailureOverlapVisualizer.tsx`
- `src/components/ClaimCard.tsx`
- `src/components/FileArtifactStack.tsx`
- `src/components/EndpointWitnessPanel.tsx`
- `src/components/NonClaimPanel.tsx`
- `src/components/AuditSnapTransition.tsx`
- `src/components/EvidenceCapsuleConcept.tsx`

Tasks:
1. Keep existing components where useful, but rename/extract around the requested primitive vocabulary.
2. Each primitive should accept data props and animation cue props.
3. Each primitive should include a short code comment mapping visual logic to the AI assurance concept.
4. Build `ComponentShowcase` with every primitive visible and labeled for review.

Acceptance check:
- VIS-001 can be assembled mostly from these primitives without duplicating math or styling logic.
- Component showcase renders without relying on story state.

## Workstream 4: Evidence Capsule Realism

Priority: P1

Files:
- `src/evidence/sampleReceipt.ts`
- `src/evidence/artifacts.ts`
- `scripts/generate-evidence-receipt.mjs`
- `public/evidence/config.yaml`
- `public/evidence/run.json`
- `public/evidence/receipt.json`
- `public/evidence/endpoint_witnesses.json`
- `public/evidence/non_claims.json`
- `public/evidence/manifest.json`

Tasks:
1. Generate actual artifact files rather than only rendering in-memory snippets.
2. Add a manifest with file names, byte sizes, content types, and SHA-256 hashes.
3. Keep signature fields absent until signing exists.
4. Add a non-claim explicitly stating that hashes prove file integrity for the demo bundle only, not deployment validity.
5. Make the audit snap transition land on these exact file names.

Acceptance check:
- Downloaded artifact files match the visual stack.
- `manifest.json` hashes verify locally.

## Workstream 5: Visual System Tightening

Priority: P1

Files:
- `src/styles/tokens.css`
- `src/styles/global.css`
- future `src/theme/tokens.ts`

Tasks:
1. Move core tokens to TypeScript so Remotion components can share exact colors, spacing, and motion constants.
2. Keep CSS custom properties only for the Vite preview shell if it remains.
3. Remove remaining decorative warning color from early scenes unless it encodes shared miss.
4. Ensure all cards are 8px radius or lower.
5. Use monospaced type only for evidence/code/metrics; use Space Grotesk/Inter for score and claim hierarchy.

Acceptance check:
- A CSS color scan shows near-black, white, muted gray, blue evidence, and restrained warning only.
- No purple, green, beige, or generic SaaS gradient survives in VIS-001 frames.

## Workstream 6: Motion Timing

Priority: P1

Motion intent:
- 90% entrance: slow, official, calm.
- Fracture: abrupt, high acceleration, minimal lingering shards.
- Dot sorting: mechanical, grid-preserving, deterministic.
- Interval: calm and inevitable.
- Claim card: heavy lock-in.
- Receipt snap: hard cut plus short impact settle.

Tasks:
1. Define named easing curves:
   - `officialEnter`
   - `mechanicalSort`
   - `fractureSnap`
   - `intervalInevitable`
   - `artifactImpact`
2. Use normalized cue values and derive transforms from those cues.
3. Remove all uncontrolled looping motion from VIS-001.
4. Add still-frame tests at key frames:
   - false certainty
   - hidden assumption revealed
   - world split
   - interval fully revealed
   - receipt snap

Acceptance check:
- Every animated visual can be traced to a cue and frame range.

## Workstream 7: Documentation and Review Assets

Priority: P2

Files:
- `docs/visual_language.md`
- `docs/storyboard_VIS001.md`
- `README.md`
- `AUDIT_REPORT.md`
- `VIS001_POLISH_PLAN.md`

Tasks:
1. Add the missing visual language doc from the original brief.
2. Add a beat-by-beat VIS-001 storyboard with exact text and frame ranges.
3. Update README only after Remotion scripts exist.
4. Add a short "reviewer guide" for professor/security/design audiences.
5. Capture stills from the five key frames and include them in README or docs.

Acceptance check:
- A reviewer can understand what is claimed, what is shown, what is toy, and what is not claimed without reading the code.

## Top 10 Ranked Improvements

1. Add real Remotion compositions and frame-driven rendering.
2. Remove `motion/react` from render-critical VIS-001 components.
3. Generate actual artifact files and a manifest.
4. Extract the requested primitive component set.
5. Add `docs/storyboard_VIS001.md` with exact text and timing.
6. Add `docs/visual_language.md` with palette, typography, motion, and anti-patterns.
7. Build screenshot/still QA at key frames.
8. Add a formal proof card for the OR Fréchet-Hoeffding interval.
9. Add a manual two-guardrail count builder for prospect demos.
10. Add README screenshots and clear export instructions.

## What Not To Do Next

- Do not add 3D before the 2D proof is impeccable.
- Do not add fake signatures.
- Do not imply certification.
- Do not add a generic landing page.
- Do not make the receipt look like compliance theater.
- Do not add more colors to distinguish states; use position, labels, line style, and shape first.

# Remotion Migration Report

## Files Changed

- Added Remotion entry and composition registration: `src/Root.tsx`.
- Added render-specific source files: `src/remotion/ShatteringPointEstimateScene.tsx`, `src/remotion/ComponentShowcase.tsx`, `src/remotion/timeline.ts`, `src/remotion/motion.ts`, `src/remotion/theme.ts`, `src/remotion/primitives.tsx`, and `src/remotion/remotion.css`.
- Added Remotion docs: `docs/storyboard_VIS001.md`, `docs/visual_language.md`, and `docs/ae_handoff.md`.
- Updated `README.md` with Studio, render, still, and Vite-preview-only notes.
- Updated `package.json` and `package-lock.json` with Remotion dependencies and scripts.
- Updated `src/components/EvidenceArtifactStack.tsx` so visible receipt artifacts use `blockOverlap` and `sharedMissRate`.
- Updated `src/components/WitnessCard.tsx` from `verified` to `constraints held`.
- Generated render artifacts under `renders/`.

## Scripts Added

- `npm run studio`
- `npm run render:vis001`
- `npm run still:vis001`
- `npm run still:showcase`

## What Is Now Frame-Driven

- `ShatteringPointEstimateScene` is registered as a real Remotion composition at 1920x1080, 30fps, 62 seconds.
- `ComponentShowcase` is registered as a real Remotion composition at 1920x1080, 30fps, 12 seconds.
- VIS-001 render timing is controlled through `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, and helpers in `src/remotion/timeline.ts`.
- Named curves are defined in `src/remotion/motion.ts`: `officialEnter`, `mechanicalSort`, `fractureSnap`, `intervalInevitable`, and `artifactImpact`.
- The render-specific VIS-001 files do not import `motion/react`, use runtime timers, or rely on CSS keyframes.

## What Remains Browser-Preview-Only

- The original Vite Story Mode shell, keyboard transport, and recording chrome.
- Evidence Mode and receipt download UI.
- The interactive overlap slider in the Vite scene stack.
- Original browser scene components that still use `motion/react` for preview animation.

## Verification Results

- `npm run typecheck`: passed.
- `npx remotion compositions src/Root.tsx`: passed; found `ShatteringPointEstimateScene` and `ComponentShowcase`.
- `npm run test`: passed, 1 test file and 6 tests.
- `npm run build`: passed.
- `npm run generate:evidence`: passed and wrote `public/evidence/sample-receipt.json`.
- `npm run still:vis001`: passed and wrote `renders/stills/vis001.png`.
- `npm run still:showcase`: passed and wrote `renders/stills/component-showcase.png`.
- `npm run render:vis001`: passed and wrote `renders/vis001.mp4`.
- Render-critical scan for `motion/react`, timers, CSS keyframes, and transitions in `src/remotion`/`src/Root.tsx`: clean.

## Generated Artifacts

- `renders/vis001.mp4`
- `renders/stills/vis001.png`
- `renders/stills/component-showcase.png`
- `renders/stills/01_false_certainty.png`
- `renders/stills/02_hidden_assumption.png`
- `renders/stills/03_world_split.png`
- `renders/stills/04_interval_boundary.png`
- `renders/stills/05_receipt_snap.png`

## Next 5 Polish Tasks

1. Tighten the first 20 seconds as a dedicated cold-open pass with sound-design timing.
2. Review all five named stills at full resolution and tune typography spacing where needed.
3. Add optional caption/subtitle tracks for portfolio and conference playback.
4. Export an image sequence or ProRes handoff profile if After Effects finishing becomes the main workflow.
5. Replace the toy sample rows only when a real external evaluation artifact pipeline exists.

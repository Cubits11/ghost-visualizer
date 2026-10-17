# Ghost Visualizer

Ghost Visualizer is a React/Vite visual essay about a narrow but important evaluation problem: two guardrails can each score 90% on harmful examples while their composed OR safety is only bounded, not determined, unless dependence is inspected.

The current demo exists to visualize bounded claims under stated assumptions. Its title is **What AI Guardrail Scores Cannot Tell You**: marginal scores leave shared failures undetermined; that does not establish deception. It is not an AI safety certificate and does not claim deployment readiness.

## What It Does

- Plays a seven-scene cinematic story, “What AI Guardrail Scores Cannot Tell You.”
- Shows how identical marginal guardrail scores can hide shared misses.
- Computes harmful-class atom counts, marginals, OR composition, Frechet-Hoeffding bounds, endpoint witnesses, and a receipt object from deterministic sample rows.
- Provides Evidence Mode for inspecting the computed receipt and downloading JSON.

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. Story Mode is the default route:

```txt
/
```

## Remotion Render Package

The repo now includes a real Remotion entry point at `src/Root.tsx` with two renderable compositions:

- `ShatteringPointEstimateScene` - VIS-001 at 1920x1080, 30fps, 62 seconds.
- `ComponentShowcase` - Remotion-safe component inventory at 1920x1080, 30fps, 12 seconds.

Open Remotion Studio:

```bash
npm run studio
```

Render the VIS-001 video:

```bash
npm run render:vis001
```

Render the default VIS-001 still:

```bash
npm run still:vis001
```

Render the component showcase still:

```bash
npm run still:showcase
```

### VIS-001 Still QA Frames

These still commands target the five review frames from the storyboard:

```bash
npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/01_false_certainty.png --frame=135
npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/02_hidden_assumption.png --frame=495
npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/03_world_split.png --frame=870
npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/04_interval_boundary.png --frame=1260
npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/05_receipt_snap.png --frame=1680
```

The Remotion render path is frame-driven through `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, and cue helpers in `src/remotion/timeline.ts`. VIS-001 render-critical files do not import `motion/react`, use runtime timers, or rely on CSS keyframes.

## Evidence Mode

Open:

```txt
/?mode=evidence
```

Evidence Mode shows the dataset summary, block atom table, marginal scores, observed OR safety/risk, Frechet-Hoeffding interval, endpoint witnesses, assumptions, non-claims, and a receipt JSON download.

The static generated receipt is also available at:

```txt
public/evidence/sample-receipt.json
```

To regenerate it:

```bash
npm run generate:evidence
```

## Recording Mode

Open:

```txt
/?recording=true
```

Keyboard controls in Story Mode:

- Right arrow or space: next scene
- Left arrow: previous scene
- `R`: recording mode
- `P`: pause
- `E`: Evidence Mode

The overlap slider scene also supports shareable state:

```txt
/?overlap=0
/?overlap=10
```

The Vite Story Mode, Evidence Mode, keyboard transport, recording chrome, and interactive overlap slider remain browser-preview-only. They are still useful for exploration, but deterministic exports should use the Remotion compositions.

## Test And Build

```bash
npm run test
npm run build
npm run generate:evidence
```

## What Is Empirical In v0

- `src/evidence/sampleEvaluations.ts` defines 100 deterministic harmful evaluation rows.
- `src/math/guardrailComposition.ts` computes block atoms, marginals, OR composition, bounds, endpoint witnesses, and the receipt.
- `src/math/guardrailComposition.test.ts` proves the core invariants.
- `src/evidence/sampleReceipt.ts` builds the receipt from rows.
- `public/evidence/sample-receipt.json` is generated from the same receipt object.
- Story and Evidence Mode read from the computed model where practical.

## What Is Toy

- The sample rows are constructed for demonstration.
- Only harmful examples are populated.
- The model has two binary guardrails and one OR rule.
- Prompt families are illustrative.
- The cinematic scenes are explanatory renderings of the computed v0 model, not a real deployment evaluation.

## Limitations

- No sampling uncertainty model.
- No benign-class false-positive analysis yet.
- No dataset upload or external artifact ingestion.
- No cryptographic provenance.
- No claim that the model, policy, or guardrails are safe.
- The Remotion VIS-001 scene is the deterministic production render path; the older Vite scene stack remains an interactive preview surface.

## Roadmap

- Add benign rows and classwise false-positive analysis.
- Add CSV import with strict schema validation.
- Add confidence intervals or finite-sample uncertainty where appropriate.
- Add more composition rules after OR is fully documented.
- Add real artifact manifests only when real artifacts exist.

See `docs/research/two-guardrail-or-toy-model.md` for the formal v0 research note.

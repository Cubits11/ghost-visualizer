# Ghost Visualizer

Ghost Visualizer is a React/Vite visual essay about a narrow but important evaluation problem: two guardrails can each score 90% on harmful examples while their composed OR safety is only bounded, not determined, unless dependence is inspected.

The current demo exists to visualize bounded claims under stated assumptions. It is not an AI safety certificate and does not claim deployment readiness.

## What It Does

- Plays a seven-scene cinematic story, “Why AI Safety Scores Lie.”
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

## Test And Build

```bash
npm run test
npm run build
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

## Roadmap

- Add benign rows and classwise false-positive analysis.
- Add CSV import with strict schema validation.
- Add confidence intervals or finite-sample uncertainty where appropriate.
- Add more composition rules after OR is fully documented.
- Add real artifact manifests only when real artifacts exist.

See `docs/research/two-guardrail-or-toy-model.md` for the formal v0 research note.

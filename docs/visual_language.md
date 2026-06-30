# Visual Language

VIS-001 uses a restrained audit-cinema language:

- Black field as the default ground.
- White for truth claims and final boundaries.
- Blue for evidence, apparatus, and declared inputs.
- Warm danger color only for shared misses and rejected overclaims.
- Mechanical motion: entries, sorting, interval expansion, and receipt impact are frame-driven.
- No decorative stock graphics, fake compliance badges, generic SaaS panels, or cryptographic-looking props.

## Component Rules

- Score objects are large, centered, and sparse. They should feel official enough to become suspicious.
- Guardrail shields are labels for marginals, not proof of safety.
- Dot grids always distinguish separated misses from aligned shared misses.
- Atom tables must keep the block semantics visible: `p00` is shared miss, `p11` is both block.
- Interval bands always include lower and upper witness labels.
- Evidence artifacts are shown as inspectable files, not signed provenance.
- Non-claims are first-class visual objects, not footnotes.

## Remotion Constraints

The production scene should remain deterministic:

- Use `useCurrentFrame()` and `useVideoConfig()` for render timing.
- Use `interpolate()` or the helpers in `src/remotion/timeline.ts`.
- Avoid CSS keyframes, browser timers, and `motion/react` in render-critical Remotion files.
- Keep colors and typography within the existing Ghost/CC visual system.

# VIS-001 clarity pass changelog

## Scope

Applied a meaning-first clarity pass to the existing VIS-001 Remotion scene without adding new scenes, colors, stock assets, 3D, fake signatures, or new conceptual material.

## Changes

### Human labels before notation

- Promoted the four atom labels to: Shared Miss, A Only, B Only, Both Block.
- Demoted `p00`, `p10`, `p01`, and `p11` into secondary notation.
- Reframed Shared Miss as “neither guardrail catches it” and “danger cell.”
- Reframed Both Block as “confirmed block overlap.”

### Copy replacement

- Replaced internal/changelog-like phrases with viewer-facing claim language.
- Changed the final semantics card to “Supported claim boundary.”
- Replaced `p00 is the danger cell` with “The shared miss is the danger cell.”
- Replaced overlap wording with: “If overlap is unreported, both worlds remain possible.”
- Replaced default-risk wording with: “The honest claim must keep the aligned-miss world possible.”

### Scene-level improvements

- Hidden variable section now says: “where the misses overlap.”
- Added the caption: “Two guardrails can miss different prompts — or the same ones.”
- World split now states: “Same scores. Different miss overlap. Different risk.”
- World A now reads as separated misses with 0 shared misses.
- World B now reads as aligned misses with 10 shared misses.
- Added footer: “A misses 10. B misses 10. Only the overlap changed.”

### Interval and atom-table bridge

- Added bridge line before the atom table: “The score tells us how many. The overlap tells us where.”
- Changed interval copy to: “The score cannot choose between these worlds.”
- Changed interval label to “composed harmful-block rate.”
- Updated witness labels to aligned-miss and separated-miss endpoints.
- Updated caption to: “The endpoints are possible worlds still allowed by the evidence.”

### Receipt and final bumper

- Receipt panel now leads with evidence meaning: policy, dataset, composition rule, observed overlap, endpoint witnesses, and non-claims.
- JSON/data-model texture remains in the artifact stack, but no longer dominates the receipt panel.
- Added final private-demo bumper: “Private demo build” and “What to judge: clarity · credibility · artifact realism.”

### Internal naming cleanup

- Renamed Remotion dot kinds in `primitives.tsx` where safe:
  - `neutral` → `blocked`
  - `aOnly` → `missedByAOnly`
  - `bOnly` → `missedByBOnly`
  - `shared` → `sharedMiss`

### Cognitive legibility pass

- Added quiet scene-level viewer-question captions across the major VIS-001 beats.
- Added fixed/hidden grammar to the world split: the miss counts stay fixed while shared-miss overlap changes.
- Promoted atom-table human labels before notation and added micro-badges for “danger cell” and “confirmed block.”
- Added claim-boundary labels for known score evidence, hidden overlap, supported range claims, and non-claims.
- Made the interval scene read as “range supported” and “single score rejected,” with the point estimate visually marked as insufficient.
- Made the receipt panel read more like an evidence checklist, with policy, dataset, rule, observed overlap, endpoint witnesses, and non-claims before schema texture.
- Added `VIS001_SILENT_VIEWER_QA.md` as a no-narration reviewer checklist.
- Added `VIS001_STILL_REVIEW.md` to define the intended takeaway and forbidden implication for each QA still.
- Added `npm run lint:vis001-copy` to catch obvious internal/changelog and fake-certification screen-copy regressions.

## Validation notes

- `npm run test` passed.
- `npm run build` passed.
- `npm run generate:evidence` passed.
- `npm run lint:vis001-copy` passed.
- Five VIS-001 QA stills were regenerated.
- Component showcase still was regenerated.
- `npm run render:vis001` completed after the script was hardened to use Remotion Chrome for Testing with lower concurrency and a longer frame timeout.

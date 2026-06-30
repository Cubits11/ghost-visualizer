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

## Validation notes

- `npm run test` passed.
- `npm run build` passed.
- `npm run generate:evidence` passed.
- Five VIS-001 QA stills were regenerated.
- Component showcase still was regenerated at reduced scale after Chromium instability.
- Full MP4 render was attempted, but Chromium repeatedly crashed inside the container during long-frame rendering; see final delivery note.

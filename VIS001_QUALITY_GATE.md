# VIS-001 Quality Gate Review

Date: 2026-06-30

Reviewed artifacts:

- `renders/vis001.mp4`
- `renders/stills/01_false_certainty.png`
- `renders/stills/02_hidden_assumption.png`
- `renders/stills/03_world_split.png`
- `renders/stills/04_interval_boundary.png`
- `renders/stills/05_receipt_snap.png`
- `renders/stills/component-showcase.png`
- `docs/storyboard_VIS001.md`
- `docs/visual_language.md`
- `docs/ae_handoff.md`
- `src/remotion/ShatteringPointEstimateScene.tsx`
- `src/remotion/primitives.tsx`
- `src/remotion/remotion.css`

## Verdict

VIS-001 is now suitable for a private serious-contact demo with context. It is not public teaser ready and not public flagship ready.

The core math is credible: p00 is framed as the shared-miss danger cell, p11 is both-block overlap, and the interval is treated as the honest claim boundary. The piece still has too much dashboard/card grammar and too much dense receipt language to survive a cold public audience without explanation.

## Gate Questions

| # | Question | Gate result |
| ---: | --- | --- |
| 1 | Does the first 10 seconds make the 90% score feel official, trustworthy, and dangerously incomplete? | Mostly. The score is official and sparse. The updated caption "overlap not reported" makes incompleteness visible. It still needs more tension to be unforgettable. |
| 2 | Does the viewer understand that two 90% guardrails can imply different hidden worlds? | Yes by the world split. The side-by-side worlds make this clear after 20s. |
| 3 | Is shared miss overlap visually obvious? | Improved. The orange cluster is readable and the chip now says "shared miss"; still not as visceral as it could be. |
| 4 | Is p00/shared miss correctly framed as the danger cell? | Yes. Hidden card, atom table, receipt, and final boundary all say p00/shared miss is danger. |
| 5 | Does the world split work without narration? | Yes for technical viewers. A nontechnical viewer will understand "same score, different worlds" but may not retain the exact p00 semantics. |
| 6 | Does the interval reveal feel like a formal claim boundary? | Yes. The interval frame is the strongest formal beat. |
| 7 | Do endpoint witnesses feel like evidence, not decoration? | Partly. Witness labels are visible, and `endpoint_witnesses.json` appears in the artifact stack. They still read more like labels than inspectable evidence. |
| 8 | Does the receipt snap feel like real engineering evidence? | Yes, with caveat. It avoids fake provenance and has real-looking files/non-claims. It is still dense and a little debug-console-like. |
| 9 | Is any visible text too dense, too small, or too generic? | Yes. Receipt artifact code is too small to inspect; ComponentShowcase remains dense; some lower-level captions are still generic. |
| 10 | Does anything look like generic SaaS/AI marketing? | Some. The card grid, glowing panels, and shield icons have SaaS residue, though the black-field audit treatment helps. |
| 11 | Does the motion feel frame-driven, intentional, and premium? | Mostly. Timing is deterministic and the 14-15s dead zone is fixed. Some holds remain static. |
| 12 | Does the scene have too much artifact language too early? | No. Artifact language arrives late. Taxonomy arrives early, but the hidden-variable beat now carries fewer words. |
| 13 | Would a professor find the semantics credible? | Yes, likely. p00/p11 semantics and Frechet-Hoeffding interval treatment are defensible. |
| 14 | Would an AWS/security person understand the product direction? | Probably. Receipt, non-claims, bounded claims, and artifacts point toward evidence infrastructure. Product direction is present but not yet crisp. |
| 15 | Would a normal technical viewer remember the central idea? | Likely: "two 90% scores can hide different shared-miss worlds." They may not remember p00 without a second viewing. |

## Implemented Fixes

| Priority | Frame/component | Weakness | Concrete fix implemented |
| --- | --- | --- | --- |
| P1 | Frames 420-450, transition from false inference to hidden variable | The prior render produced an empty/near-empty field around 14-15s, breaking the intended "inference hangs" beat. | Adjusted layer timing: false-certainty holds until 15s, hidden layer starts at 13.8s, hidden variable enters at 14.2s. Verified final MP4 frame at 15s. |
| P1 | Frames 0-300, first 10s | "Official-looking marginal" was too vague; incompleteness was not explicit enough. | Changed score caption to "100 harmful prompts; overlap not reported" and guardrail captions to "marginal only." |
| P1 | Hidden-variable card, frames 426-540 | The card explained p00/p11 correctly but with too much sentence weight. | Shortened the explanation to "p00 is the shared miss: neither guardrail blocks. p11 is both-block overlap." |
| P1 | World split, frames 600-1020 | The chip label `sharedMissRate` looked like an implementation key and weakened the public-facing semantic read. | Changed chip label to "shared miss." |
| P1 | World B shared-miss dots, frames 600-1020 | Shared misses were visible but not forceful enough after compression. | Increased shared-dot radius, reduced neutral-dot prominence, and strengthened the existing danger glow. |
| P1 | Receipt panel, frames 1440-1740 | Receipt rows used raw field names (`blockOverlap`, `sharedMissRate`, `nonClaims`), making the receipt feel like debug output. | Replaced raw keys with readable claim labels: "p11 block overlap", "p00 shared miss", "Endpoint witnesses", and "Non-claims." |
| P1 | ComponentShowcase still | The receipt/non-claims cell clipped text and looked accidental. | Tightened showcase-only layout, scaled the miniature receipt/non-claim panels, and limited the miniature non-claims panel to one representative item. |
| P1 | Storyboard docs | Storyboard still claimed the hidden variable begins at exactly 15s after timing changed. | Updated affected rows to 0:12-0:14.2 and 0:14.2-0:18. |

## Remaining Weaknesses

| Priority | Frame/component | Why it weakens the video | Concrete fix proposed | Status |
| --- | --- | --- | --- | --- |
| P2 | Frames 570-600, `Crack.` title | The word is literal and slightly decorative. It risks feeling like a trailer trope rather than mathematical failure. | Reduce the word's scale/opacity or let the fracture carry the beat without a large text label. | Not implemented; safe but editorial, and lower risk than clarity fixes. |
| P2 | Frames 600-1020, world split hold | The worlds are semantically clear but static after the reveal. The middle can feel like a long still frame. | Tighten the hold or add existing-dot sorting emphasis within the current metaphor. | Not implemented; would require more editorial tuning. |
| P2 | Frames 1185-1440, endpoint witnesses | Witness labels are present, but witnesses do not yet feel fully inspectable as evidence until the later artifact stack. | Bring witness IDs/counts into the interval frame or make `endpoint_witnesses.json` the most readable artifact in the receipt beat. | Not implemented; could create clutter if rushed. |
| P2 | Frames 1260-1440, interval point marker | The yellow 90% marker can pull attention back to the point estimate. The interval endpoints should dominate. | Reduce point-marker scale/saturation after it lands, or fade it under the interval label. | Not implemented; current frame is acceptable. |
| P2 | Frames 1440-1740, artifact stack | Artifact text is too small to inspect. It signals evidence but does not fully prove evidence. | Enlarge one front artifact, preferably `endpoint_witnesses.json` or `receipt.json`, and reduce depth/stack count. | Not implemented; bigger layout change. |
| P2 | Overall visual language | The card/panel system still has generic SaaS residue. It is restrained, but not yet singular. | De-emphasize card borders and make the black audit field plus dot/interval apparatus carry more of the design. | Not implemented; broader design pass. |
| P2 | Public cold-open memorability | The first 20s are clearer but not yet unforgettable for a cold public viewer. | Add sharper editorial pacing around the false inference and hidden-variable replacement, staying within existing metaphors. | Not implemented; not safe as a quick patch. |

## Public Gate

Do not publish as a flagship piece. Do not use as the first public teaser unless paired with a short caption/thread that explains "same 90%, different overlap worlds." Use it privately with serious contacts where you can frame the claim in one sentence before or after playback.

Best current positioning: private serious-contact demo.

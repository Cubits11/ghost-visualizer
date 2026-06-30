# VIS-001 Public Readiness Score

Date: 2026-06-30

Final recommendation: private serious-contact demo.

## Scores

| Dimension | Score / 10 | Rationale |
| --- | ---: | --- |
| Cognitive clarity | 7.2 | The central idea is understandable: a 90% marginal hides overlap. p00/p11 semantics are now repeated clearly. Still heavy for cold viewers. |
| Visual hierarchy | 7.0 | Score, worlds, interval, and receipt each have a clear dominant element. Receipt and showcase remain dense. |
| Mathematical faithfulness | 8.6 | p00 shared miss and p11 both-block overlap are consistently framed. The interval/witness semantics are credible. |
| Motion timing | 7.1 | The dead gap at 14-15s is fixed. Some midsection holds still feel long and less premium. |
| Artifact realism | 7.0 | Receipt avoids fake provenance and shows non-claims. Artifact code is still more texture than inspectable evidence. |
| Emotional impact | 6.7 | The idea has bite, especially at the world split. The execution is intellectually sharp but not yet visceral. |
| Public readiness | 5.8 | Not ready for a cold public audience. It still needs less density and a more memorable first-20-second emotional arc. |
| Portfolio readiness | 6.7 | Good enough as a serious work-in-progress case study. Not yet a flagship reel piece. |
| Business/prospect readiness | 7.2 | Strongest for security, AI safety, and evidence-infrastructure conversations where the viewer already cares about claims and audits. |

## Audience Decision

| Audience | Readiness | Recommendation |
| --- | --- | --- |
| Internal review | Ready | Use it. The render is useful for evaluating semantics, timing, and product direction. |
| Private serious contacts | Ready with context | Good for professors, AI safety/security people, and technical prospects if framed as a bounded-claim visual essay. |
| Public teaser | Not ready | Too dense and too taxonomic for a cold audience. Needs a shorter, sharper teaser cut. |
| Public flagship | Not ready | Needs a stronger original visual language, better endpoint-witness evidence, and less generic card grammar. |

## What Changed In This Pass

- Removed the 14-15s empty transition by retiming the false-inference and hidden-variable layers.
- Made the first 10s more honest by changing the score caption to "overlap not reported" and guardrail captions to "marginal only."
- Replaced raw `sharedMissRate`/receipt variable labels with viewer-facing semantic labels.
- Strengthened the existing shared-miss dot treatment without adding colors or metaphors.
- Cleaned the ComponentShowcase still so it no longer shows clipped text.
- Regenerated `renders/vis001.mp4` and affected stills.

## Verification

- `npm run typecheck` passed.
- `npm run render:vis001` completed successfully.
- Final MP4 probe: 1920x1080, 30fps, 1860 video frames, 62.058667s.
- Visual spot checks performed on rendered MP4 frames at 15s, 29s, and 56s.

## Bottom Line

VIS-001 now clears a private serious-contact bar. It does not clear a public teaser or flagship bar yet. The current best use is a carefully framed demo that proves the Ghost Visualizer can turn a subtle AI safety/math claim into deterministic evidence cinema.

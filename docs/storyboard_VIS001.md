# VIS-001 Storyboard: The Shattering Point Estimate

Composition: `ShatteringPointEstimateScene`

Render settings: 1920x1080, 30fps, 62 seconds, 1860 frames.

Frame ranges below are start-inclusive and end-exclusive.

| Beat | Time | Frames | Dominant idea |
| --- | --- | --- | --- |
| Black field and score arrival | 0:00-0:03 | 0-90 | A dark audit field introduces VIS-001 and lets the number enter. |
| Number feels official | 0:03-0:06 | 90-180 | The published 90% score is centered and treated like an official point estimate. |
| Guardrails appear | 0:06-0:09 | 180-270 | Guardrail A and Guardrail B both show 90% visible marginals. |
| False inference | 0:09-0:12 | 270-360 | "Therefore: safe?" appears as an intentionally fragile inference. |
| Hanging pause | 0:12-0:14.2 | 360-426 | The inference holds without support. |
| Hidden variable revealed | 0:14.2-0:18 | 426-540 | Shared miss overlap enters as the missing variable. |
| Crack | 0:18-0:20 | 540-600 | The point estimate fractures. |
| World split enters | 0:20-0:34 | 600-1020 | Two 100-dot worlds show separated misses versus aligned shared misses. |
| Interval reveal | 0:34-0:48 | 1020-1440 | The 90% point estimate becomes the honest [90%, 100%] composed-safety interval. |
| Atom table and witnesses | 0:39.5-0:48 | 1185-1440 | p00 is highlighted as the shared miss danger cell; p11 is both-block overlap. |
| Receipt snap | 0:48-0:58 | 1440-1740 | Receipt, artifacts, and non-claims assemble without cryptographic-provenance claims. |
| Claim boundary lock | 0:58-1:02 | 1740-1860 | The final card states corrected semantics and witness-labeled interval discipline. |

## QA Still Frames

| Still | Frame | Timestamp | Command |
| --- | ---: | --- | --- |
| `01_false_certainty.png` | 135 | 0:04.5 | `npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/01_false_certainty.png --frame=135` |
| `02_hidden_assumption.png` | 495 | 0:16.5 | `npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/02_hidden_assumption.png --frame=495` |
| `03_world_split.png` | 870 | 0:29.0 | `npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/03_world_split.png --frame=870` |
| `04_interval_boundary.png` | 1260 | 0:42.0 | `npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/04_interval_boundary.png --frame=1260` |
| `05_receipt_snap.png` | 1680 | 0:56.0 | `npx remotion still src/Root.tsx ShatteringPointEstimateScene renders/stills/05_receipt_snap.png --frame=1680` |

## Semantic Locks

- `p00` means neither guardrail blocks. For harmful examples, this is the shared miss danger cell.
- `p11` means both guardrails block. It is block overlap, not the danger cell.
- Missing overlap is not rendered as zero by default. The risk-facing visual default is aligned shared misses until evidence establishes otherwise.
- Receipt language uses `blockOverlap` and `sharedMissRate`.
- Interval bands include witness labels in still frames.
- Artifact panels do not display hashes, signatures, certificates, or provenance badges because the v0 sample receipt does not generate real cryptographic provenance.

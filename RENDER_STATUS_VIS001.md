# VIS-001 render status

## Completed

- Updated VIS-001 Remotion code.
- Regenerated five QA stills:
  - `renders/stills/01_false_certainty.png`
  - `renders/stills/02_hidden_assumption.png`
  - `renders/stills/03_world_split.png`
  - `renders/stills/04_interval_boundary.png`
  - `renders/stills/05_receipt_snap.png`
- Regenerated component showcase still:
  - `renders/stills/component-showcase.png`
- Regenerated full MP4:
  - `renders/vis001.mp4`
- Passed:
  - `npm run test`
  - `npm run build`
  - `npm run generate:evidence`
  - `npm run lint:vis001-copy`
  - `npm run render:vis001`

## Render notes

`npm run render:vis001` initially timed out in the bundled headless shell at frame 1082. A lower-concurrency retry with a longer timeout also timed out at frame 494.

No system Chrome/Chromium executable was present in the usual macOS app paths. The render script now uses Remotion's Chrome for Testing mode, lower concurrency, and a longer frame timeout:

```bash
npm run render:vis001
```

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
- Passed:
  - `npm run test`
  - `npm run build`
  - `npm run generate:evidence`

## Not completed in this container

`renders/vis001.mp4` was not regenerated successfully in this execution environment.

The first render attempt failed because Remotion tried to download Chrome Headless Shell and the container could not resolve `remotion.media`. After switching to the system Chromium executable and clearing a container URL-block policy for local rendering, stills rendered successfully. The full 1,860-frame MP4 render repeatedly crashed/timed out inside Chromium during long-frame rendering, even after lowering concurrency.

## Local render command that should be used on a normal machine

```bash
npm run render:vis001
```

If Remotion cannot find a browser locally, use a system Chrome/Chromium executable:

```bash
npx remotion render src/Root.tsx ShatteringPointEstimateScene renders/vis001.mp4 \
  --browser-executable=/path/to/chrome-or-chromium \
  --chrome-mode=chrome-for-testing \
  --concurrency=2
```

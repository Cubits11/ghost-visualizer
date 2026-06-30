# After Effects Handoff

The Remotion package creates deterministic video and still assets that can be imported into After Effects as footage or reference frames.

## Render Outputs

Render VIS-001:

```bash
npm run render:vis001
```

Default output:

```txt
renders/vis001.mp4
```

Render stills for look review or AE boards:

```bash
npm run still:vis001
npm run still:showcase
```

Named storyboard stills are documented in `docs/storyboard_VIS001.md`.

## AE Import Workflow

1. Import `renders/vis001.mp4` as footage.
2. Set the AE comp to 1920x1080, 30fps.
3. Place the clip at frame 0 to preserve storyboard timing.
4. Import the five QA stills as reference plates for visual review.
5. Add only finishing layers that do not change the math semantics: sound design, editorial cuts, captions, or light color correction.

## Semantic Guardrails

- Do not add hash strings, signature icons, audit seals, or compliance badges unless real provenance data exists.
- Do not relabel `p11` as failure overlap. The danger cell is `p00` shared miss.
- Do not remove witness labels from interval shots.
- Do not turn non-claims into small-print disclaimers; they are part of the claim boundary.

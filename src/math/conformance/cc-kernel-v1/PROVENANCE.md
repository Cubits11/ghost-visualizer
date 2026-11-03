# Vendored corpus: `cc-kernel-v1`

These files are a **pinned, verbatim copy** of the CC composition kernel's
conformance corpus. The authority is `cc-framework`; this copy exists so Ghost
Visualizer is self-contained (no sibling-repo path at test time) while staying
provably faithful to a specific upstream revision.

## Source

| | |
|---|---|
| Repository | `cc-framework` (Cubits11) |
| Path | `conformance/cc-kernel-v1/` |
| Commit | `bf5740c266ff495319442402e0fa7d6aa23ccafa` (2026-09-07), tree clean |
| Vendored on | 2026-10-28 |
| Vendored by | Ghost Visualizer Step 0 (CC ↔ visualizer conformance membrane) |

`SPEC.md` is the normative specification. The TypeScript kernel in
`../../ccKernel.ts` was written from `SPEC.md` and the cases below — **never from
the reference Python source** — exactly as §SPEC requires. `ccKernel.conformance.test.ts`
runs the corpus against that kernel.

## Pinned digests (raw file bytes, SHA-256)

The conformance test asserts these on every run; editing a vendored file breaks
the suite on purpose.

```
composition.json  469484269d10d9b3dd90254c995bf5be486cd773f1175be74c6b3150ef8bdacf
adversarial.json  5d9ee31fc9a47e6b93da3fc1ced76c4a84a89e89593417f712ac46771842989a
```

## Finding: upstream manifest digest drift (not fixed here)

`cc-framework`'s own `manifest.json` records a digest per case file. That digest
is **SHA-256 of canonical-minified JSON** — `json.dumps(obj, sort_keys=True,
separators=(",", ":"))` — not of the raw bytes. Recomputed at the source commit:

| File | manifest digest | recomputed canonical-minified digest | match? |
|---|---|---|---|
| `adversarial.json` | `a394f622…ff71d4` | `a394f622…ff71d4` | ✅ |
| `composition.json` | `71740d53…23b7492` | `4103169f…0b4c24d1` | ❌ |

Full digests — manifest: `adversarial.json` `a394f6220cf04586f20ba1b504e01e51dc0810d8f1c0d79667b2a8b697ff71d4`,
`composition.json` `71740d53edd0b9e9fb297e6b84a6d1c508c1ee2c5fde27e6bf9b496e623b7492`.
Recomputed canonical-minified: `adversarial.json` `a394f6220cf04586f20ba1b504e01e51dc0810d8f1c0d79667b2a8b697ff71d4`
(matches), `composition.json` `4103169ff792a097fc281c5afeca5a4d7fe364720cb571f92922ab8c0b4c24d1` (does not).

So `composition.json` was edited after `manifest.json` was last generated, and
the manifest was not regenerated. Per `SPEC.md` §9 a corpus change must bump the
corpus version and be recorded in the corpus changelog; regenerating the manifest
silently to match a changed file is the precise failure mode that discipline
exists to prevent. A conformance runner that honors the manifest (as the
discipline intends) would currently fail the digest check on `composition.json`.

This is a defect in **`cc-framework`, not in this repository**, and is left for
that repo to resolve (confirm the current case values are intended, then
regenerate the manifest and record the change, or restore the prior file). It is
recorded here because the membrane's trustworthiness depends on the authority's
pinning being coherent, and because this vendored copy is pinned to the **current
bytes at the source commit**, drift and all.

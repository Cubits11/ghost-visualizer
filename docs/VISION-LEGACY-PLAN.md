# Ghost Visualizer: Vision and Legacy Plan

Written 2026-10-24 against `bf8d87b`. Draft for owner review; §2 binds future work once the owner merges it.

Evidence tags `[E#]` point to the table in Appendix A. Each row there names a file, a command, or a commit that reproduces the claim. A sentence in this document with no tag is either a definition, a decision, or a plan, and says so.

## 0. Status

### 0.1 What this document is

A plan for turning one finished visual essay into the instrument other work cites. It fixes four things: the thesis (§1), the rules every on-screen number obeys (§2), the order in which real evidence enters the essay (§3), and the tests that decide whether the plan worked (§4). §5 is the build order. §6 lists what the other repositories pin about this one.

### 0.2 Audit reproduction (2026-10-24, clone at `bf8d87b`)

The owner's audit stated the facts below. Each was re-run in a fresh checkout.

| Audit fact | Reproduced? | Evidence |
|---|---|---|
| Not live: Pages returns 404, `has_pages=false` | Yes | E2 |
| No `LICENSE`, 0 topics, no CI, no `base` in `vite.config.ts` | Yes | E3, E4 |
| 9 stale process docs at root, including `AUDIT_REPORT.md` | Yes | E5 |
| `AUDIT_REPORT.md` (2026-06-30) says there is no Remotion and 6 tests; the current tree contradicts it | **Partly.** The Remotion claim is contradicted. The "6 tests" figure is not: the current tree also has 6. | E6 |
| `src/math` computes atoms, marginals, OR, Fréchet bounds, witnesses, receipt from 100 deterministic rows | Yes | E7, E8 |
| Remotion `ShatteringPointEstimateScene` is 62 s at 1080p; `renders/vis001.mp4` exists and no user-facing doc links it | Yes | E10, E11 |
| Site homepage blurb says "INSPECT SOURCE" and needs a retitle | **No.** `origin/main` of the site has no Ghost Visualizer text on its homepage. The blurb was removed on 2026-10-17. | E17 |

The two partial or failed rows are discrepancies, not interpretations. The first changes nothing in this plan. The second blocks one cross-link PR; §6.3 says what was held and why.

### 0.3 Vocabulary

Three labels are used for every number the essay shows. They are defined once here and again, as rules, in §2.

| Label | Meaning |
|---|---|
| `TOY` | Constructed to teach. The 100 rows in `src/evidence/sampleEvaluations.ts` are the only TOY data today. |
| `MEASURED` | Produced by a pipeline run that passed its gate and left a receipt. Nothing in this repository is MEASURED. |
| `CENSUS` | A count the site publishes about public evaluations, imported with provenance. Nothing in this repository is CENSUS yet. |

## 1. Thesis

### 1.1 The claim

Two guardrails that each block 90% of harmful inputs leave the rate at which both miss the same input anywhere in [0%, 10%].

- If the misses never coincide, both-miss is 0%.
- If the misses coincide as much as 90% marginals allow, both-miss is 10%.
- If the guards fail independently, both-miss is 1% (0.1 × 0.1).

The two 90% scores do not say which of these holds. The missing variable is dependence.

Derivation, in the form the code uses: with block rates a and b, the OR-composed block rate lies in [max(a, b), min(1, a + b)]. For a = b = 0.9 that is [0.9, 1.0]. Both-miss is one minus that: [0, 0.1]. The code is `computeFrechetHoeffdingOrBounds` in `src/math/guardrailComposition.ts` [E7]. cc-framework computes the same two expressions in `union_bounds` [E16]. A position inside the band is the dependence coordinate `lambda`: 1 at the lower witness, 0 at the upper [E7].

### 1.2 What v0 shows and does not show

| Shows | Does not show |
|---|---|
| The band from two marginals, on constructed rows [E7, E8] | A measured dependence value for any real guardrail pair |
| Two witnesses, one per endpoint, that share the 90% marginals [E7] | That any real pair sits near either endpoint |
| A receipt that states its assumptions and non-claims [E9] | That any guardrail is safe, unsafe, or deceptive |

Undetermined is not deceptive. The title is **What AI Guardrail Scores Cannot Tell You**. The README already rejects "Why AI Safety Scores Lie" for this reason [E19]. This plan keeps that rule (§2, R6).

### 1.3 Where it sits in the program

The program's central question, in the owner's words: *can dependence evidence be measured at feasible cost, before it has to be assumed?* This plan does not answer it. The E2 measurement answers it, if it answers it at all [E18]. Ghost Visualizer is the form of the question a stranger can feel in a minute.

| Repository | Role | Relation to this one |
|---|---|---|
| `cc-framework` | The math | Source of truth for the bounds. Link only; no code is shared today [E16]. |
| `cubits11.github.io` | The written record | Claims registry, census, essays. Link only; it pins facts about this repository [E14]. |
| `ghost-visualizer` | The experience | Felt in 62 s of film; verified in Evidence Mode [E7, E9, E10]. |

### 1.4 The one-sentence test

A viewer who has seen the film once should be able to say: *two 90% scores only tell you the shared-miss rate is somewhere between 0% and 10%.* §4 turns this into criterion (iv).

## 2. Epistemic contract

Binding on all future work in this repository once this document is merged. Each rule names its enforcement and its status at `bf8d87b`.

| # | Rule | Enforcement | Status at `bf8d87b` |
|---|---|---|---|
| R1 | Every number on screen is computed by `src/math` from stated inputs. | Phase 2 test P-F: percent-formatted literals in display code fail the build unless allow-listed with a reason. | **Not enforced.** 4 source lines in 3 files hold percent-formatted display literals [E13]. |
| R2 | A number computed from constructed data carries a visible `TOY` or `CONSTRUCTED` label. | Phase 2 test P-G: every route that renders a number renders an evidence-status marker. | **Not enforced.** The receipt and artifact stack name their data "demo"; no on-screen string says TOY or CONSTRUCTED [E13]. |
| R3 | `MEASURED` appears only on output of a gated pipeline run with a receipt. | P-G requires a receipt id wherever status is `measured`. The v0.2 gate in §3 requires the receipt to exist before the code merges. | Holds trivially: no measured data exists. |
| R4 | Receipts are downloadable and byte-stable. | P-C: the receipt serialization equals the committed file and its pinned SHA-256. | Holds for the one receipt [E9]. Unpinned, so a change would not fail CI. |
| R5 | No headline claims more than its band. | Review rule; P-F catches literals that bypass the model. | **Not audited.** The README body conforms [E19]. Scene copy was not read line by line for this plan. Not machine-checked. |
| R6 | Titles and metadata never assert deception, intent, or causation the evidence does not establish. | P-H: a forbidden-phrase check on title surfaces (HTML title, H1, README H1, package and repo description, social metadata). A dated historical mention is allowed, as on the site. | **Partly enforced.** `lint:vis001-copy` forbids 10 phrases, none of them the old title [E7]. `index.html` calls the page a "proof system"; see §5, Phase 2. |
| R7 | No new scene is built until the Phase 1 receipt exists. | Review rule. | Holds trivially: this plan is the first change after `bf8d87b`. |

Two further rules govern history, because other repositories bind to commits here.

- **H1. Never rewrite `main`.** The site's claim GV-001 pins `bf8d87b`, its publication gate records `3fbe3ef` and `bf8d87b`, and its claim history cites `5d4de25` [E14]. A history rewrite strands them. The site's own code records one such incident for another repository [E14].
- **H2. Squash-merge only.** Commit messages say what changed. §5.5 lists the checks.

## 3. Empirical ladder

Each rung is a capability. Rung N ships as semantic version N.0.0 (v0 as 0.1.x). A rung that depends on data does not exist until its gate passes. "Does not exist" is literal: no route, no query parameter, no code path in the production bundle, no disabled control, no "coming soon".

| Rung | What the essay is driven by | Label on screen | Entry gate | State |
|---|---|---|---|---|
| **v0** | 2 binary guards, OR rule, 100 deterministic rows | `TOY` | None. | Exists [E7, E8] |
| **v0.2** E2-MEASURED | Joint outcomes from the E2 wave-1 guards | `MEASURED` | E2 GO criteria (§3.1) | Blocked on a human step [E18] |
| **v0.3** CENSUS-LIVE | The site's census counts, as data | `CENSUS` | Provenance and update rules (§3.2) | Not started |
| **v1.0** canonical | v0, v0.2, v0.3 under the full contract | per rung | §3.3 | Not started |

### 3.1 v0.2: E2-MEASURED

**Source.** The three frozen guards (Llama-Guard-4-12B, Llama-Guard-3-8B, ShieldGemma-2b) on the shared items drawn from AdvBench (harmful) and OR-Bench `or-bench-80k` (benign) [E18]. The same essay is re-driven by the measured joint outcomes. The payoff is the contrast the essay already stages: the band the marginals allow, and where the measured joint falls inside it.

**Hard gate.** The mode ships only after all four GO criteria pass:

| # | Criterion | Defined by |
|---|---|---|
| G1 | Freeze integrity | `experiments/e2/freeze/check_freeze.py` exits 0 [E18] |
| G2 | Schema round-trip | To be bound. Proposed: rows and receipt serialize, parse, and re-serialize to identical bytes under the E2 schema. |
| G3 | STOP sealed | To be bound. The stopping rule is sealed before outcomes are visible. The site treats a change made after outcomes are visible as a forbidden rescue [E14]. |
| G4 | Controls asserted | To be bound. The positive and negative controls ran and their assertions passed. |

The owner named G1 to G4. A machine-readable definition of G2 to G4 was not found in the site, cc-framework, or the two `e2-wave1-*` directories at the time of writing [E18]. The first v0.2 task is to bind each to a file and a command. Until then they are intentions.

**Merge rule.** The PR that adds the mode also adds `docs/receipts/e2-go.json`: the four results and the content hash of the E2 run. CI fails the PR if the file is missing, any result is false, or the hash does not match. Work may proceed on a branch before the gate. It does not merge before it.

**Test that the mode does not exist.** A build-time test greps `dist/` for the mode's identifier and requests `?mode=measured` against the built app. It must find no identifier, and the app must fall through to Story Mode.

**Blocker.** E2 collection runs only on the owner's authorized machine, by the site's own rule [E18]. v0.2 cannot start until that run exists.

### 3.2 v0.3: CENSUS-LIVE

The essay shows the census state as data: today 20 evaluations, 5 that preserve joint evidence, 0 at matched thresholds [E15]. These three numbers are quoted from the site's own bound facts, not retyped here as a plan claim.

Rules:

1. **Imported, not typed.** A script reads the site's published facts and writes `src/data/census.snapshot.json` with `source_url`, `source_commit`, `sha256`, and `fetched_at`. No census number appears in source as a literal.
2. **Refuses on mismatch.** The build fails if the snapshot's hash does not match its recorded hash, or its schema is not the expected one.
3. **Dated on screen.** The essay shows "as of <date>, site commit <sha>".
4. **Updated by receipt.** Each update is a PR containing the hash diff and the site commit it came from.

Open design question, owner's: whether the site already publishes a machine-readable facts file at a stable URL. The site's fact spans are bound in HTML [E15]; a JSON endpoint was not confirmed.

### 3.3 v1.0: canonical

v1.0 is the link a paper cites when it needs a reader to understand dependence in a minute. It ships only when:

- Criteria (i) to (iv) in §4 are all met at the tagged commit.
- `CITATION.cff` exists and a DOI resolves to an archive of the tagged source.
- Deep links are versioned: a cited URL's meaning does not change after publication. Design obligation, not yet designed: per-version paths such as `/v1.0.0/` alongside `/` as latest.
- The property suite (§5.2) is green on the tag.

## 4. Legacy criteria

Ghost Visualizer has succeeded as a legacy artifact if and only if all four hold. A failed criterion is named below as the current gap and stays named until it passes.

| | Criterion | How it is tested | Status at `bf8d87b` |
|---|---|---|---|
| (i) | Live and deep-linkable continuously | A scheduled workflow requests `/`, `/?mode=evidence`, `/?overlap=0`, `/?overlap=10` and the receipt file weekly. A failed run is the receipt. | **Gap.** Pages returns 404 and Pages is not enabled [E2]. No monitor exists [E3]. |
| (ii) | Linked from the site, cc-framework, the profile, and at least one external source | A hyperlink to the live URL, not the repository, in each. | **Gap.** The site links source only, and its registry says "no hosted deployment" [E14]. The site homepage has no mention [E17]. cc-framework and the profile README have none [E16, E20]. No external citation is recorded anywhere I checked. |
| (iii) | Every public number survives its own CI property tests | Phase 2 tests P-A to P-I (§5.2) in a required CI check. | **Gap.** No CI exists [E3]. 6 unit tests exist [E7]. The witness builder fails an integer-count check on 1,552 of 10,201 grid cells [E12]. That path is not reachable from the shipped UI; see below. |
| (iv) | A first-time viewer states the band insight after one viewing: 4 of 5 strangers | Appendix B. | **Gap, unmeasured.** No reader evidence for this repository exists. The site's reader protocol covers its own films, not this essay [E21]. |

**On the witness defect.** `buildEndpointWitnessesForHarmfulOr` computes atom counts as `marginal * n` in floating point. At n = 100 this yields counts such as 7.000000000000001 for 1,552 of the 10,201 integer marginal pairs, and a few slightly negative counts [E12]. The shipped UI only calls it with marginals 0.9 and 0.9, where the product is exact, so no displayed number is wrong and the committed receipt is byte-stable [E9]. Any new input path exposes it: CSV import, the v0.2 measured mode, and census-live all would. Fixing it is Phase 2 work and precedes v0.2.

## 5. Build plan

The order is fixed by one rule: nothing is linked to, or driven by real data, before the check that defends it exists. The one exception is Phase 1b, where inbound links go out with criterion (iii) still a named gap. Those links say TOY.

| Phase | Name | Unlocks |
|---|---|---|
| 0 | Audit and plan | This document |
| 1 | Ship it live | Criterion (i) in part |
| 1b | Inbound links | Criterion (ii) in part |
| 2 | Trust foundation | Criterion (iii); rung v0 release |
| 3 | Legibility evidence | Criterion (iv) |
| 4 | v0.2 E2-MEASURED | Rung v0.2 |
| 5 | v0.3 CENSUS-LIVE | Rung v0.3 |
| 6 | v1.0 canonical | §3.3 |

### Phase 0: audit and plan

Done when this document and `scripts/preflight-witness-grid.mjs` are merged by the owner.

### Phase 1: ship it live

Scope, in full: Vite `base`, a deploy workflow, Pages enabled, an MIT licence, repository homepage, eight topics.

| Step | Change |
|---|---|
| 1 | `vite.config.ts`: `base: "/ghost-visualizer/"` |
| 2 | `.github/workflows/deploy.yml`: test, typecheck, build on every PR; deploy to Pages only on push to `main`. Actions pinned by commit SHA. |
| 3 | `LICENSE`: MIT, matching cc-framework's form [E3] |
| 4 | Pages enabled with `build_type=workflow` |
| 5 | Repository `homepage` set to the live URL, after step 6 passes |
| 6 | Topics: `ai-safety`, `guardrails`, `data-visualization`, `react`, `vite`, `remotion`, `llm-evaluation`, `ai-assurance` |

Deliberately excluded:

- **`README.md` is not touched.** The site's GV-001 has an executable trigger that fails the site's registry run if the README on the default branch differs from the README at `bf8d87b` [E14]. A live-demo link in the README ships in the same change set as the site's re-review (Phase 1b).
- No math, scene, or copy change.
- No release, de-clutter, or property test.

Acceptance tests. The live URL is `https://cubits11.github.io/ghost-visualizer/`.

| # | Test | Passes when |
|---|---|---|
| P1-1 | `npm run build` | Exits 0; every `src`/`href` in `dist/index.html` begins with `/ghost-visualizer/` |
| P1-2 | Workflow on `main` | Run concludes `success`; its URL is recorded |
| P1-3 | Root loads | `GET /` returns 200; every asset URL in the served HTML returns 200 with a matching content type |
| P1-4 | Evidence Mode | `/?mode=evidence` renders the "Evidence Mode" heading; the Receipt JSON link is present; the downloaded bytes equal the committed receipt file minus its final newline (`generate-evidence-receipt.mjs` appends one) |
| P1-5 | Receipt file | `GET /evidence/sample-receipt.json` returns 200; its SHA-256 equals the committed file's (`6b56c1e9…c83a`) [E9] |
| P1-6 | State restore | `/?overlap=10` and `/?overlap=0` restore the slider to 10 and 0 on the overlap scene |
| P1-7 | Console and network | No console error and no failed request on the three pages |
| P1-8 | Repository metadata | `gh repo view` shows the homepage, an MIT licence, and eight topics |

The receipt for this phase is the live URL plus the verification log, in the Phase 1 PR description. It is not recorded in this file, because this file was written before the deployment existed and cannot assert one.

### Phase 1b: inbound links

Each is its own titled PR, in a different repository, opened and not merged by the author.

| Repository | Change | Status |
|---|---|---|
| `cc-framework` | One README line: Ghost Visualizer as an interactive companion to the bounds, on a constructed example | Prepared |
| `Cubits11/Cubits11` (profile) | Add Ghost Visualizer, with the demo link, to "Now" | Prepared |
| `cubits11.github.io` | Retitle and link the live demo | **Held.** See §6.3. |

Every sentence in these PRs says TOY or constructed where it describes the demo's data, and does not call the demo a result.

### Phase 2: trust foundation

Acceptance: a required CI check runs P-A to P-I green; the witness defect is fixed; `v0.1.0` is released; the root is de-cluttered; history rules are enforced.

#### 5.2 Property tests

Written in vitest, `src/math/guardrailComposition.property.test.ts`, run by the same workflow that deploys. Deploy depends on them.

| ID | Property | Notes |
|---|---|---|
| P-A | **Containment.** For every (a, b) in {0..100}², and θ in {0, 0.05, …, 1}: the θ-mixture of the two witnesses is a valid joint (atoms ≥ 0, sum 1), has marginals a/100 and b/100, and an OR rate inside [lower, upper]. The dependence coordinate recovers θ when the band has width. | Mixing two distributions with equal marginals preserves the marginals, so every θ is a legal world. Tolerance 1e-9. |
| P-B | **Witnesses attain the endpoints.** For every (a, b): atom counts are non-negative integers summing to n with margins exactly (a, b); the lower witness has OR rate max(a, b)/n; the upper has min(n, a + b)/n. | Fails today on 1,552 cells [E12]. Fix first: build counts from integer inputs, not from `marginal * n`. |
| P-C | **Receipt byte-stability.** `sampleReceiptJson + "\n"` equals the bytes of `public/evidence/sample-receipt.json`; its SHA-256 is pinned in the test. | Changing the receipt requires changing the pin in the same PR. The pin is `6b56c1e9bf541e83439d8047fbf853307c0f4c8fed8c6b4c2e69f424d680c83a` [E9]. |
| P-D | **Exhaustive containment and sharpness.** For n = 1..12, over every integer table: OR count is within [max(a, b), min(n, a + b)], and every integer in that range is attained by some table with those margins. | Containment half passes today over 1,819 tables [E12]. Sharpness half is new. |
| P-E | **Cross-implementation parity.** Vectors generated by cc-framework's `union_bounds` (two marginals) match `computeFrechetHoeffdingOrBounds` to 1e-12. The vector file records the cc-framework commit and its own SHA-256, and is regenerated by script, never edited. | Makes "cc-framework is the math" a test, not a sentence [E16]. |
| P-F | **Displayed-number provenance.** Percent-formatted literals in display code fail the build unless allow-listed with a reason. | 4 source lines in 3 files today [E13]. |
| P-G | **Label gate.** Every route that renders a number renders an evidence-status marker (`toy`, `measured`, `census`); `measured` requires a receipt id. | Implementation choice deferred. Server-side rendering of each route avoids adding a browser-test dependency. |
| P-H | **Title and metadata lint.** The old title, and phrases asserting deception or intent, fail on title surfaces. | Extends `lint:vis001-copy` [E7]. |
| P-I | **Deep-link contract.** `?mode=evidence`, `?overlap=0..10` (clamped), `?recording=true` round-trip; invalid values fall back to defaults. | By reading `App.tsx:52-60`, not by running it: `?overlap=` with an empty value parses as 0 (`Number("")` is 0), not as the default. Decide which is intended, then test it. |

#### 5.3 Release discipline

- Semantic versioning. Before 1.0, any change to an on-screen number, the receipt schema, or the deep-link contract bumps MINOR. A fix that changes no public number bumps PATCH. The receipt's own `schemaVersion` moves independently.
- Annotated tags `vMAJOR.MINOR.PATCH`. `package.json` `version` equals the tag, checked in CI.
- **`v0.1.0`** tags the Phase 2 exit commit, so the first release carries a green property suite. Assets: `vis001.mp4`, `sample-receipt.json`, `SHA256SUMS`.
- The film ends with a reviewer bumper: "Private demo build" and "What to judge: clarity · credibility · artifact realism", shown from 60.2 s (`src/remotion/ShatteringPointEstimateScene.tsx:332-345`) [E10]. A release asset and a reader-gate stimulus need a public cut. Remove or replace the bumper, re-render, and record the change in the notes. This is a copy change to an existing scene, allowed after the Phase 1 receipt.
- The video must be the video of the tagged source. Release notes record the commit at which `vis001.mp4` was rendered. If `src/remotion/**` differs between that commit and the tag, re-render and replace before tagging. Determinism of the render across machines is not assumed; the five QA-frame stills (frames 135, 495, 870, 1260, 1680) are regenerated from the tag and compared with the committed stills, with the tolerance stated in the notes.
- Release notes carry a "What is TOY / What is MEASURED" pair, copied from the README's discipline.

#### 5.4 Root de-clutter

Nine process documents move from the repository root to `docs/process/` with `git mv`, so history follows. `docs/process/README.md` indexes them with date and status [E5]. `AUDIT_REPORT.md` is marked a superseded 2026-06-30 snapshot: it reports no Remotion, and the tree now has a Remotion entry point [E6].

| File | Last commit date | Disposition |
|---|---|---|
| `AUDIT_REPORT.md` | 2026-06-30 | Superseded snapshot |
| `VIS001_POLISH_PLAN.md` | 2026-06-30 | Historical |
| `VIS001_QUALITY_GATE.md` | 2026-06-30 | Historical |
| `REMOTION_MIGRATION_REPORT.md` | 2026-06-30 | Historical |
| `CHANGELOG_VIS001_CLARITY_PASS.md` | 2026-07-01 | Historical |
| `VIS001_PUBLIC_READINESS_SCORE.md` | 2026-07-01 | Historical |
| `RENDER_STATUS_VIS001.md` | 2026-07-01 | Historical |
| `VIS001_SILENT_VIEWER_QA.md` | 2026-07-01 | Historical |
| `VIS001_STILL_REVIEW.md` | 2026-07-01 | Historical |

Not moved: `README.md` (pinned by the site's trigger, §6.1) and `docs/ghost-visualizer-repository-vision.md` (its hash is recorded in the site's publication gate, §6.1). Dates from `git log -1 --format=%ad` per file at `bf8d87b`.

#### 5.5 Commit hygiene

- Squash-merge only. Merge commits and rebase merges disabled in repository settings.
- A workflow checks each PR title against `^(feat|fix|docs|ci|build|test|chore|refactor|perf|deploy)(\([a-z0-9-]+\))?: .{12,}$` and rejects a short list of known bad titles ("wip", "update", "fixes", "final", "all good now").
- A PR body needs an `## Evidence` section with at least one command or link.
- History is not rewritten (H1). The existing messages ("Fixing some issues. All good now!", "Phase 2", "Phase 1 complete") stay; they are bound commits.

#### Other Phase 2 items

- Metadata pass on `index.html`. Its description reads "A cinematic proof system showing why isolated AI safety scores can hide dependent failures." "Proof" overstates a toy model, and "hide" suggests concealment. Rewrite to state the band. Add Open Graph and Twitter card metadata so the link previews as a link, not a bare URL. The site's publication gate records a hash of `index.html` at `bf8d87b`; that gate is offline and checks the recorded value, not the current file [E14].
- Required status check on `main` once CI exists.
- Weekly link-check workflow for criterion (i).

### Phase 3: legibility evidence

- Run the reader gate (Appendix B) on the film at the Phase 2 tag. Record raw answers.
- The README live-demo link and the site's GV-001 re-review ship as one pair (§6.1).
- `CITATION.cff` without a DOI.
- Outcome: criterion (iv) is met, or its gap is rewritten with the failing answers quoted.

### Phase 4: v0.2 E2-MEASURED

Gate in §3.1. Starts when the owner's authorized-machine E2 run exists and G2 to G4 are bound to files. Before it starts, fix any new gap that the first real joint dataset would expose; P-B is the known one.

### Phase 5: v0.3 CENSUS-LIVE

Rules in §3.2. Requires a decision on the facts-file endpoint.

### Phase 6: v1.0 canonical

Conditions in §3.3. DOI minting needs the owner to connect the repository to Zenodo.

## 6. What the other repositories pin about this one

### 6.1 Constraints that bind Phase 1 and later

| Pin | Where | Effect here |
|---|---|---|
| GV-001 `remote_content_change` on `README.md` at `bf8d87b` | `cubits11.github.io/claims.yaml` [E14] | Any README change on the default branch fails the site's registry run until GV-001 is re-pinned. README edits ship with the site PR that re-pins. |
| GV-001 scope text: "there is no hosted deployment, so the site links source, not a live demo" | same | False once Phase 1 deploys. The site must re-review the claim. |
| GV-001 forbidden rescue: do not recast a local-only source project as a hosted interactive demo | same | The re-review must record the deployment as evidence (run URL, commit), not as an assertion. |
| GV-001 manual trigger: hosted deployment added | same | Fires on Phase 1. Manual triggers are not checked by the site's CI. |
| Source hashes of `index.html`, `CinematicShell.tsx`, `README.md`, `docs/ghost-visualizer-repository-vision.md` at `bf8d87b` | `publication/readiness.json` [E14] | Recorded attestation of a published revision. Offline. Does not require these files to stay unchanged. |

### 6.2 What this plan does not touch

The site's registry, generators, and homepage. cc-framework's code. `main` history in any repository.

### 6.3 The held site PR

The owner's instruction was to retitle the site's homepage blurb and link the live demo. On the site's `origin/main` there is no such blurb [E17]. Three ways to proceed, none of them taken here:

1. Re-add a homepage entry that names the essay and links the live demo. This needs a homepage design decision, and the owner's local branch `claude/design-system-2026-10-24` has uncommitted changes to `index.html` [E17].
2. Re-review GV-001 only: update the scope sentence, re-pin to a commit after the deployment, regenerate the ledger and claim pages. This is the change §6.1 requires whatever else is decided.
3. Both, as one change set.

Whichever is chosen, any census number on the homepage uses the site's bound fact spans, not retyped values [E15].

## 7. Standing rules and non-goals

- No new scene before the Phase 1 receipt exists (R7).
- No framework change.
- No claim that an essay result is a deployment finding, a certificate, or evidence about any specific guardrail. The README's three sections (What Is Empirical, What Is Toy, Limitations) stay and are extended, not weakened [E19].
- Not a platform, not a course, not a dashboard. The repository's own vision note says the same [E22].
- No cryptographic claim. The receipt states it provides no cryptographic provenance [E9].

## 8. Decisions that are the owner's

| Decision | Why it is the owner's | Needed by |
|---|---|---|
| Licence holder name in `LICENSE` | Phase 1 uses "Cubits11", matching cc-framework [E3]. A legal name is a personal choice. | Phase 1 |
| Homepage design for the site entry (§6.3) | Uncommitted changes to the site's `index.html` on a local branch | Phase 1b |
| E2 run on the authorized machine | Site rule: collection runs only there [E18] | Phase 4 |
| Binding G2 to G4 to files | The criteria are the owner's definition | Phase 4 |
| Zenodo link for a DOI | Requires the owner's account action | Phase 6 |
| Squash-only and required checks | Repository settings | Phase 2 |
| Recruit five unfamiliar readers | Human recruitment; facilitator attestation cannot be automated [E21] | Phase 3 |
| Whether `renders/vis001.mp4` stays tracked in git or moves to release assets | 10,726,115 bytes in history either way [E11] | Phase 2 |

## Appendix A: Evidence index

Commands run in `~/Developer/GitHub/ghost-visualizer` unless a repository is named. Date of capture: 2026-10-24.

| Tag | Claim | How to reproduce |
|---|---|---|
| E1 | Repository at `bf8d87b` | `git rev-parse --short HEAD` |
| E2 | Not live; Pages not enabled | `curl -s -o /dev/null -w "%{http_code}" https://cubits11.github.io/ghost-visualizer/` returned 404 before Phase 1. `gh api repos/Cubits11/ghost-visualizer/pages` returned HTTP 404. |
| E3 | No `LICENSE`, no `.github/`, no `base` in Vite config; cc-framework's licence is "MIT License / Copyright (c) 2025 Cubits11" | `ls`; `cat vite.config.ts`; `head -3 ~/Developer/GitHub/cc-framework/LICENSE` |
| E4 | No topics, no homepage, no licence on the GitHub repository | `gh repo view Cubits11/ghost-visualizer --json repositoryTopics,homepageUrl,licenseInfo` returned `null`, `""`, `null` |
| E5 | Nine process documents at root | `ls *.md` lists `AUDIT_REPORT.md`, `CHANGELOG_VIS001_CLARITY_PASS.md`, `REMOTION_MIGRATION_REPORT.md`, `RENDER_STATUS_VIS001.md`, `VIS001_POLISH_PLAN.md`, `VIS001_PUBLIC_READINESS_SCORE.md`, `VIS001_QUALITY_GATE.md`, `VIS001_SILENT_VIEWER_QA.md`, `VIS001_STILL_REVIEW.md`, plus `README.md`. Dates in §5.4 from `git log -1 --format=%ad --date=short -- <file>`. |
| E6 | `AUDIT_REPORT.md` dated 2026-06-30 says it is not a Remotion project and records "passed, 6 tests"; the tree has `src/Root.tsx` and a `remotion` dependency; `npm test` reports 6 passed | `AUDIT_REPORT.md` line 3 (date), line 41 (the P0 row: no `remotion` dependency, no `Root.tsx`), line 81 ("passed, 6 tests"). `cat src/Root.tsx`; `grep remotion package.json`; `npm test` |
| E7 | Math module, 6 unit tests, copy lint with 10 forbidden phrases | `src/math/guardrailComposition.ts`; `npm test` (1 file, 6 tests passed); `npm run lint:vis001-copy` (30 files); `scripts/check-vis001-copy.mjs` |
| E8 | 100 deterministic rows | `src/evidence/sampleEvaluations.ts` line 3: `SAMPLE_HARMFUL_COUNT = 100` |
| E9 | Receipt regenerates byte-identically; receipt states non-claims | `npm run generate:evidence`, then `shasum -a 256 public/evidence/sample-receipt.json` before and after: `6b56c1e9bf541e83439d8047fbf853307c0f4c8fed8c6b4c2e69f424d680c83a` both times; `git status` clean. `nonClaims` in the receipt include "This does not provide cryptographic provenance." |
| E10 | Remotion: 1920×1080, 30 fps, 62 s; two compositions; the film's last frames carry a "Private demo build" bumper | `src/remotion/timeline.ts` lines 1-9; `src/Root.tsx`; `src/remotion/ShatteringPointEstimateScene.tsx` lines 333-346 |
| E11 | `renders/vis001.mp4` is 10,726,115 bytes; referenced only by process docs and `docs/ae_handoff.md`, not by the README | `ls -l renders/vis001.mp4`; `grep -rn vis001.mp4 --include=*.md .` |
| E12 | Witness grid and exhaustive containment | `node scripts/preflight-witness-grid.mjs` at `bf8d87b`: n=100, 10,201 cells, 1,552 failing; 3,104 non-integer witnesses, 6 negative witnesses, 0 endpoint misses; exhaustive containment n=1..12 over 1,819 tables, 0 out of band; exit 1. Reachability: `grep -rn buildEndpointWitnessesForHarmfulOr src` shows one non-test caller chain, `sampleReceipt.ts:4` calling `buildEvidenceReceipt(sampleEvaluationRows)`. |
| E13 | Percent-formatted display literals; no on-screen TOY label | `grep -rnE "[0-9]+(\.[0-9]+)?%" src/scenes src/components src/remotion src/views src/data`: display literals on 4 lines, at `SameScoresDifferentWorlds.tsx:118`, `ComponentShowcase.tsx:38`, `ComponentShowcase.tsx:44`, `primitives.tsx:232`; the other 5 matches are CSS. `grep -rniE "\btoy\b\|constructed" src` with identifiers excluded finds no visible string; "demo" appears in ids and in `EvidenceMode.tsx:128`. |
| E14 | Site pins | `cubits11.github.io/claims.yaml` GV-001 (scope, `remote_content_change` on `README.md` at `bf8d87b`, manual trigger, forbidden rescues); `scripts/verify_claims.py` lines 15-40 and 235-250; `publication/readiness.json`; `CLAUDE.md` ("Hard boundaries"; the site's account of a stranded commit is in `scripts/verify_claims.py` lines 15-17) |
| E15 | Census N/M/K = 20/14/5; matched-threshold count 0; bound spans in homepage | In a fresh clone of `cubits11.github.io` at `e2cec7b`: `python3 scripts/verify_facts.py` prints "100 pages agree with the census (… K=5 … M3=0 … N=20)"; `python3 scripts/verify_census.py --counts` prints "N/M/K 20/14/5". `index.html` lines 87-88 carry the bound spans `MC-001.N` (20), `MC-001.K` (Five), `MC-001.M3` (zero) |
| E16 | `union_bounds` computes max pᵢ and min(1, Σ pᵢ); no Ghost Visualizer mention in cc-framework | `cc-framework/theory/fh_bounds.py` `union_bounds` at `bf5740c`; `grep -rniE "ghost-visualizer\|ghost visualizer"` over md, yml, yaml, py, json, toml returned nothing |
| E17 | Site homepage has no Ghost Visualizer text; blurb removed 2026-10-17; owner's local branch has uncommitted `index.html` changes | `git show origin/main:index.html \| grep -ci ghost` returned 0 at `e2cec7b`; `git show 2949acd:index.html` has 0 occurrences of "Why AI Safety Scores Lie" and `2949acd^` has 1; the old blurb remains in `.claude/worktrees/keen-jemison-cfd59b/index.html` lines 499-504; the owner's working tree on `claude/design-system-2026-10-24` shows `index.html` modified |
| E18 | E2 guards, pools, and run boundary | `cubits11.github.io/experiments/e2/freeze/sources.json` (Llama-Guard-4-12B, Llama-Guard-3-8B, shieldgemma-2b; AdvBench; `or-bench-80k`); `experiments/e2/freeze/FREEZE.md`; `experiments/e2/freeze/check_freeze.py` exists; `CLAUDE.md` "Hard boundaries". A search for "GO criteria" in the site, cc-framework, and both `e2-wave1-*` directories found no definition of G2 to G4. |
| E19 | README body discipline and title rejection | `README.md` ("What Is Empirical In v0", "What Is Toy", "Limitations"; second paragraph on the title) |
| E20 | Profile README has no Ghost Visualizer mention | `Cubits11/Cubits11` `README.md` at `4c92781` |
| E21 | Site reader-gate precedent | `cubits11.github.io/publication/readiness.json` `protocol` and `limits` |
| E22 | Vision note's identity statement | `docs/ghost-visualizer-repository-vision.md` §1 and §3 |

## Appendix B: Reader gate for criterion (iv)

Modelled on the site's protocol [E21].

- **Sample.** Exactly five distinct unfamiliar people. Not collaborators, not people who have seen the essay.
- **Stimulus.** One viewing of the 62-second film at the tagged release, without pausing or seeking.
- **Task.** Within 60 seconds of the film ending, write one sentence: what do the two 90% scores tell you about how often both guardrails miss the same harmful input?
- **Pass.** At least 4 of 5 answers pass.

A passing answer states both:

1. The two scores do not determine how often both guards miss the same input.
2. The rate is bounded: somewhere between none and all of the misses, or between 0% and 10%, or equivalent plain language.

| Answer | Result | Why |
|---|---|---|
| "Two 90% scores leave the shared-miss rate anywhere between 0 and 10 percent." | Pass | States both parts |
| "You can't tell from the scores whether they miss the same things; it could be none or all of them." | Pass | States both in plain language |
| "Guards fail together sometimes." | Fail | No statement that the scores leave it open, and no range |
| "The scores are misleading." | Fail | Asserts misdirection; the claim is undeterminedness |
| "Together they catch 99%." | Fail | Assumes independence |

**Limits.** Unfamiliarity, authenticity, and raw-answer fidelity are facilitator attestations. Automation cannot verify them. Record raw answers verbatim, with the facilitator's name and date.

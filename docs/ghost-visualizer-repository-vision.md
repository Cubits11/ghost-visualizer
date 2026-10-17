# Ghost Visualizer: Repository Vision Beyond the First Video

## 1. Executive Verdict

Ghost Visualizer is not yet a platform. It is a strong, handcrafted cinematic proof-of-concept: one mathematically disciplined visual essay with a unusually clear aesthetic and a real thesis. That is already valuable. The danger is mistaking the intensity of one artifact for an extensible engine.

The repo's highest-potential identity is: **a visual evidence engine for bounded claims**. Not "AI safety education." Not "interactive courses." Not "dashboard for governance." The sharper thesis is that it turns fragile claims into inspectable mathematical objects: feasible worlds, assumptions, witnesses, hashes, non-claims, and receipts.

What is strong:
- The visual soul is distinct: forensic cinema, mathematical proof theater, dark editorial data lab.
- The current story has a clean conceptual arc: score, dependence, counterexample, interval, constraints, witnesses, receipt.
- The toy model is simple enough for normal humans and serious enough to reveal a real statistical pathology.
- The app already has scene timing, recording mode, keyboard controls, and reusable atoms like dot worlds, interval bands, atom tables, witness cards, and evidence consoles.

What is immature:
- The engine is still embedded in one video. Scene selection, math, timeline, interaction state, and story content are coupled.
- The math layer is a toy example, not yet a formal library of partial-identification objects.
- Evidence artifacts are cinematic props, not reproducible capsules.
- There is no authoring model, lesson schema, export pipeline, test suite for math invariants, or public-facing repository narrative.

What may be delusional:
- Building Studio Mode soon.
- Building paid enterprise tooling before the evidence model is credible.
- Turning every metaphor into a feature.
- Assuming "interactive visual essay platform" is a product by itself. It is not. The product is claim discipline made visible.

The flagship should be: **What AI Guardrail Scores Cannot Tell You** as the canonical public demo, followed by **The Correlation Cliff** as the second artifact and **How to Read an AI Safety Receipt** as the credibility bridge.

What would impress different audiences:
- A professor: formal definitions, proof sketches, Fréchet-Hoeffding bounds, endpoint witnesses, invariant tests, citations, and no overclaiming.
- An AWS contact: a deployable demo showing why aggregate safety metrics are dangerous for enterprise governance, with reproducible receipts and exportable evidence.
- A YouTube viewer: a cold open where a comforting 99% score visibly fractures into multiple possible worlds.
- An enterprise buyer: a Builder Mode that ingests real evaluation data and returns bounded claims, witness cases, non-claims, and audit-ready receipts.

## 2. What This Repo Really Is

Today this is a cinematic React/Vite/TypeScript explainer app. The code shape is compact: `src/scenes/` contains seven story beats, `src/components/` contains visualization pieces, `src/data/` contains the scene registry and toy math, and `src/styles/` defines the visual atmosphere.

It is best described as **an artisanal theorem animation**. It does not merely explain a topic; it stages a counterexample. The current demo teaches one core idea: identical marginal guardrail scores can imply radically different composed safety when dependence is unobserved.

The repo is currently three things at once:
- A video prototype: fixed scene order, durations, recording mode.
- An explorable toy model: dependence-overlap slider, atom table, dot-world visualizations.
- A claim-discipline manifesto: endpoint witnesses, bounded interval, Ghost receipt, non-claim rhetoric.

The repo is not yet:
- A general visualization engine.
- A research artifact.
- A course platform.
- A governance product.
- A content studio.

That is fine. The next step is not to pretend it is all of those. The next step is to extract the minimum reusable spine that lets the second and third visual essays happen without rebuilding the universe.

## 3. What It Must Not Become

Do not build generic edtech. If the UI starts looking like modules, progress bars, badges, and pastel lesson cards, the project loses its force.

Do not build a generic dashboard. The repo should not become a grid of KPIs with filters. Dashboards normalize ambiguity; Ghost Visualizer should interrogate it.

Do not build generic AI governance SaaS. The world has enough policy checklists. This project wins only if it shows why a claim is or is not justified.

Do not build a visual essay factory too early. Studio Mode is seductive, but an editor for weak primitives will multiply weak artifacts.

Do not chase broad subject matter immediately. Stay near partial identification, guardrail composition, benchmark uncertainty, red-team evidence, and safety claims until the engine has a reason to exist.

Do not make the math decorative. Equations cannot be wallpaper. Every visual transformation should be backed by a formal object: a constraint, distribution, witness, bound, estimator, or assumption.

Do not overbuild 3D. Use spatial metaphors only when geometry clarifies feasible regions, not because cinematic depth looks impressive.

## 4. The Long-Term Platform Thesis

The long-term platform is a **cinematic evidence lab** for complex claims.

Its core loop:
1. A user or author proposes a claim.
2. The system reveals the assumptions under that claim.
3. The math engine computes what the evidence actually identifies.
4. The visualization engine renders possible worlds, bounds, witnesses, counterexamples, and non-claims.
5. The evidence layer produces a receipt: inputs, hashes, constraints, theorem references, endpoints, and reproducibility notes.

The important sentence is not "learn AI safety visually." It is: **claims become objects you can inspect**.

In one week, it can become a public cinematic demo.

In one month, it can become a serious ecosystem seed: several reusable theorem/visualization primitives, a second essay, and a research notes layer.

In three months, it can become portfolio/research/enterprise-grade: public docs, test-backed math engine, evidence capsules, deployable demo, and a small builder flow.

In one year, it could become a genuinely unusual platform: a library of cinematic proof modules for AI governance, statistics, safety evaluation, and scientific claim discipline.

## 5. Product Modes

| Mode | Purpose | User | UI | Technical requirements | Build first | Avoid |
|---|---|---|---|---|---|---|
| Story Mode | Deliver a fixed cinematic proof arc. | Viewer, recruiter, professor, YouTube audience. | Fullscreen scenes, timeline, captions, recording/export controls. | Scene registry, timeline engine, deterministic animations, transcript/caption support. | Stabilize current video and add shareable public route. | Branching story logic, course chrome, noisy controls. |
| Explore Mode | Let users perturb assumptions and see worlds change. | Curious viewer, student, technical evaluator. | Sliders, toggles, linked charts, "same marginals/different worlds" controls. | Shared state model, parameter schema, math recomputation, URL-serializable params. | Dependence/correlation playground from the current slider. | Endless knobs without narrative consequence. |
| Proof Mode | Reveal the formal claim step by step. | Professor, researcher, serious student. | Definition cards, theorem steps, equation reveals, proof sketch timeline. | Math object schema, theorem blocks, LaTeX rendering, citation hooks, invariant tests. | FH bounds proof block for the current example. | Pretending full rigor where only intuition exists. |
| Evidence Mode | Show receipts, hashes, witnesses, data lineage, non-claims. | Enterprise evaluator, research reviewer, governance buyer. | Inspectable receipt, witness museum, downloadable capsule, provenance chain. | Evidence schema, hashing, artifact manifest, reproducibility script, dataset/model metadata. | Turn the current Ghost receipt into a real JSON-backed artifact. | Fake hashes, decorative compliance language. |
| Builder Mode | Let users enter evaluation data and generate bounded claims. | Safety team, auditor, advanced instructor. | Data upload/table, metric mapping, bounds output, witness cases, receipt export. | Parser, validation, math engine, privacy boundaries, export formats. | Manual 2-guardrail count input before uploads. | Enterprise upload flow before math credibility exists. |
| Instructor Mode | Package visual proofs as teachable lessons. | Teacher, workshop leader, technical communicator. | Lesson playlist, pause prompts, instructor notes, exercises. | Lesson registry, learning objectives, prompts, answer states. | One instructor guide for the existing essay. | LMS features, quizzes as filler, generic pedagogy. |
| Studio Mode | Author new visual essays from reusable primitives. | Creator, researcher, internal team. | Timeline editor, scene templates, parameter bindings, preview/export. | Content DSL, primitive registry, timeline graph, asset manager. | Defer until 3+ essays share primitives. | Building an editor before you know the grammar. |

## 6. Next-Level Visualization Library

The visual library should be organized around mathematical honesty: every image maps to a claim, assumption, distribution, constraint, or witness.

| Visualization | Concept taught | Motion/data/math | Fit | Difficulty | Worth building |
|---|---|---|---|---|---|
| Dependence Genome | Failures share hidden structure. | Double helix where prompt rungs develop aligned red lesions; driven by co-failure matrix. | Explore/Story. | Medium. | Yes, second-wave flagship. |
| Possible Worlds Polytope | Marginals define a feasible set, not one truth. | Constraints carve a glowing region; endpoints light up as witnesses. | Proof/Explore. | Hard. | Yes, but after 2D version. |
| Correlation Cliff | Safety collapses as dependence increases. | Plateau cracks and drops as overlap/correlation rises. | Story/Explore. | Medium. | Yes, best next video. |
| Atom Table Fluid Machine | Mass moves among p00, p01, p10, p11. | Probability fluid sloshes through four chambers while marginals remain pinned. | Proof/Explore. | Medium. | Yes, immediate. |
| Guardrail Circuit Theater | Composition logic changes risk. | AND/OR gates route harmful/benign flow; shared failures short-circuit. | Story/Proof. | Medium. | Yes. |
| Assumption Furnace | Claims depend on assumptions. | Claim bars pass through heat; removing assumptions melts points into intervals. | Proof. | Medium. | Yes. |
| Witness Museum | Bounds require actual worlds. | Endpoint distributions displayed as inspectable artifacts in dark cases. | Evidence. | Low/Medium. | Yes, near-term. |
| Non-Claim Firewall | Unsupported assertions must be rejected. | Claims strike a receipt boundary; unsupported ones burn away. | Evidence/Story. | Low. | Yes, high rhetorical value. |
| Evidence Chain Galaxy | Provenance is connected, not decorative. | Hashes orbit as constellations; missing links dim the claim. | Evidence. | Medium. | Yes, if backed by real artifacts. |
| Adversary Pressure Field | Attacks deform feasible worlds. | Prompt clusters push on constraint surfaces; weak regions buckle. | Explore. | Hard. | Later. |
| Threshold Tuning Observatory | Threshold changes TPR/FPR and bound width. | Telescope/observatory dials shift ROC, confusion regions, intervals. | Explore/Instructor. | Medium. | Yes after core engine. |
| Risk Weather Map | Deployment contexts have different dependence structures. | Regions show fronts, pressure, storm cells of co-failure risk. | Enterprise/Story. | Hard. | Later, powerful for buyers. |
| Theorem MRI | A theorem scans hidden layers of a claim. | Slices reveal marginals, overlap, FH envelope, lambda coordinate, interval. | Proof. | Medium. | Yes. |
| Causal Mirage | Apparent improvement can be selection bias. | A clean oasis collapses as sample selection layer appears. | Future video. | Hard. | Yes, later. |
| Constraint Loom | Claims are woven from constraints; loose threads widen intervals. | Threads tighten into bands; removing one causes slack. | Proof. | Medium. | Yes. |
| Benchmark Autopsy Table | A benchmark score is dissected into hidden organs. | Score body opens into dataset, labels, threshold, dependence, sampling. | Story/Evidence. | Medium. | Yes, strong metaphor. |
| Claim Courtroom | Evidence must survive cross-examination. | Claims enter a courtroom; witnesses, objections, and admissibility animate. | Evidence/Instructor. | Medium. | Maybe, risk of kitsch. |
| Uncertainty Seismograph | Evaluation instability produces tremors. | Model/prompt changes shake a trace; confidence claims crack under high amplitude. | Explore. | Low/Medium. | Yes. |
| Red-Team Minefield | Sparse tests miss structured failure regions. | A grid looks clear until mines align under a policy path. | Story. | Medium. | Yes. |
| Safety Shadowgraph | Hidden dependence casts a shadow larger than the visible object. | Guardrail scores project shadows showing unseen overlap. | Story. | Low. | Yes, elegant. |
| Assumption Switchboard | Each assumption routes power to a claim. | Pulling switches widens/invalidates result lights. | Proof/Explore. | Low. | Yes. |
| Evidence Aquarium | Samples are fish in a tank; biased nets catch the wrong population. | Sampling net changes observed colors while population differs. | Instructor. | Medium. | Maybe, less on-brand. |
| Interval Guillotine | Point estimates are cut down to legal bounds. | A point estimate is sliced into an interval with endpoint labels. | Story. | Low. | Yes, if restrained. |
| Reproducibility Black Box | A result without artifacts cannot be inspected. | Box opens only when policy/data/model/witness hashes are present. | Evidence. | Low. | Yes. |

Immediate visualization priorities: Atom Table Fluid Machine, Correlation Cliff, Assumption Furnace, Witness Museum, and Theorem MRI. These extend the current artifact without bloating the product surface.

## 7. Future Video Slate

| Title | Thesis | Hook + metaphor | Required visuals | Why people care / why experts respect it | Difficulty | Length |
|---|---|---|---|---|---|---|
| What AI Guardrail Scores Cannot Tell You | Marginal scores can hide shared failure. | "Two 90% guardrails can still fail together." Dot worlds. | Current scenes. | Clear public shock; valid partial-identification lesson. | Done-ish. | 5 min. |
| The Correlation Cliff | Small dependence changes can destroy comfort. | A safety plateau collapses. | Correlation Cliff, fluid atoms. | Makes risk visceral; formal dependence sensitivity. | Medium. | 5 min. |
| The Hidden Geometry of Guardrails | Safety claims live in feasible regions. | A score becomes a polytope. | Possible Worlds Polytope, endpoint witnesses. | Visual math spectacle; credible convex-constraint framing. | Hard. | 12 min. |
| Why "99% Safe" Can Be Meaningless | A point score without assumptions is not a guarantee. | A shining number casts a long shadow. | Safety Shadowgraph, Assumption Furnace. | Destroys false certainty; respects identification limits. | Medium. | 5 min. |
| The Problem With Benchmarks | Benchmarks measure a slice, not deployment truth. | Benchmark autopsy table. | Dataset organs, sampling layers, threshold observatory. | Everyone sees leaderboard hype; experts see external validity. | Medium. | 12 min. |
| What Is a Safety Claim? | A claim is evidence plus assumptions plus scope. | Claim courtroom. | Non-claim firewall, receipt, assumption switchboard. | Useful for normal buyers; rigorous for governance people. | Medium. | 5 min. |
| Evidence vs Vibes | Confidence language is not evidence. | Vibes evaporate at the receipt boundary. | Evidence Chain Galaxy, Reproducibility Black Box. | Memeable; audit-friendly. | Low/Medium. | 90 sec. |
| Why Guardrails Fail Together | Shared blind spots dominate composition. | Dependence Genome. | Genome, co-failure heatmap, red-team minefield. | Intuitive and technical. | Medium. | 5 min. |
| Partial Identification Visually | Honest results are often intervals. | The point estimate dies on screen. | Theorem MRI, interval guillotine, endpoints. | Teaches a deep concept accessibly. | Hard. | 12 min. |
| The Mathematics of Not Overclaiming | Rigor is knowing what evidence cannot say. | Non-claims become first-class objects. | Firewall, receipt, proof mode. | Culturally sharp; methodologically serious. | Medium. | 5 min. |
| How to Read an AI Safety Receipt | Auditable claims need provenance and witnesses. | A receipt turns into a constellation. | Evidence Chain Galaxy, Witness Museum. | Buyers need this; researchers respect artifact discipline. | Medium. | 5 min. |
| Why Red Teams Need Statistics | Anecdotes need sampling and bounds. | Red-team minefield. | Minefield, seismograph, confidence bands. | Red teaming is popular; stats makes it serious. | Medium. | 12 min. |
| What Enterprises Get Wrong About AI Governance | Checklist compliance can miss dependence risk. | A clean dashboard catches fire at the edges. | Risk Weather Map, receipt. | Enterprise relevance; avoids vague policy talk. | Hard. | 5 min. |
| Why More Guardrails Can Still Fail | More components can share one blind spot. | A circuit with many gates still shorts. | Guardrail Circuit Theater. | Counterintuitive; composition math. | Medium. | 5 min. |
| The Four Atoms Behind a Safety Claim | p00/p01/p10/p11 determine the world. | Four chambers hold the truth. | Atom Table Fluid Machine. | Simple and memorable; exact. | Low/Medium. | 90 sec. |
| The Day the Point Estimate Died | A single number collapses under admissible worlds. | A score fractures into witnesses. | Interval guillotine, endpoint museum. | Cinematic; statistically honest. | Medium. | 5 min. |
| When Leaderboards Lie | Ranking can invert under distribution shift. | Medals melt as test population changes. | Benchmark autopsy, causal mirage. | Timely; experts respect selection bias framing. | Hard. | 12 min. |
| The Adversary Has a Shape | Attack prompts reveal geometry, not chaos. | Pressure fields deform the safe region. | Adversary Pressure Field. | Makes red-team structure visible. | Hard. | 12 min. |
| Safety Theater | Controls can look impressive while proving little. | A stage set collapses behind the curtain. | Non-claim firewall, receipt black box. | Broad resonance; must avoid cynicism. | Medium. | 5 min. |
| The Receipt Is the Product | Governance value lives in bounded, reproducible claims. | A receipt becomes an artifact people can trust. | Evidence galaxy, witness museum, builder output. | Enterprise bridge; rigorous if real. | Medium. | 5 min. |

The best series arc is: **Guardrail Score Limits -> Correlation Cliff -> Four Atoms -> Safety Claim -> Receipt -> Benchmarks -> Red Teams -> Partial Identification**.

## 8. Repository Architecture Evolution

The next architecture should make one distinction sacred: **content, math, choreography, rendering, and evidence are separate layers**.

Proposed structure:

```text
src/
  app/
  engine/
  primitives/
  visualizations/
  scenes/
  stories/
  lessons/
  math/
  evidence/
  recorder/
  studio/
  content/
  themes/
  test/
docs/
  research/
  receipts/
  storyboards/
```

Folder intent:
- `app/`: routing, shells, mode switching, global state. Not math or scene-specific visuals.
- `engine/`: timeline, cue system, scene registry, playback state, parameter binding. Not React-specific component styling if avoidable.
- `primitives/`: low-level reusable visual marks: dots, bands, chambers, gates, hash nodes, equation tokens. Not domain concepts.
- `visualizations/`: composed reusable concepts like DotWorld, AtomFluidMachine, CorrelationCliff, WitnessMuseum. Not one-off scene copy.
- `scenes/`: cinematic arrangements for a specific story beat. Not core math.
- `stories/`: ordered scripts, durations, voiceover/caption text, scene metadata. Not visual implementation.
- `lessons/`: instructor objectives, prompts, exercises, discussion notes. Not product marketing.
- `math/`: distributions, bounds, constraints, witnesses, theorem utilities, invariant tests. Not display formatting.
- `evidence/`: receipt schema, artifact manifests, hash utilities, provenance types, example capsules. Not fake proof props.
- `recorder/`: recording mode, frame/export hooks, later Remotion integration. Not timeline logic.
- `studio/`: future authoring UI. Empty or absent until primitives are proven.
- `content/`: essays, transcripts, citations, glossary, markdown/MDX content. Not TypeScript business logic.
- `themes/`: design tokens, motion tokens, typography, scene palettes. Not component behavior.
- `docs/research/`: formal notes and citations.
- `docs/receipts/`: example evidence artifacts.
- `docs/storyboards/`: planned essays and visual direction.

Missing engine abstractions:
- Scene spec with `id`, `title`, `duration`, `modes`, `parameters`, `cues`, `captions`, `citations`.
- Parameter schema with URL serialization.
- Timeline cue system independent of CSS animation timing.
- Math object model: atoms, marginals, feasible sets, constraints, bounds, witnesses.
- Evidence receipt schema with real hashes and reproducibility notes.
- Visualization primitive registry.
- Theorem/proof block component.
- Recorder/export adapter.
- Fixture-driven visual tests and math invariant tests.

Open-source seriousness requires a README that states the thesis, a `docs/research` note that formalizes the first example, a contributing guide only after external interest exists, and examples that can be run without understanding the whole app.

## 9. Research Credibility Layer

The credibility layer must prevent the project from becoming beautiful misinformation.

Build:
- A formal note for the current toy example: definitions of guardrail failures, joint distribution atoms, observed marginals, composed failure, Fréchet-Hoeffding bounds, endpoint witnesses.
- A theorem card format: statement, assumptions, identified quantity, bound, proof sketch, limitations.
- Math invariant tests: atom counts sum to total, marginals remain fixed, endpoints satisfy constraints, reported intervals match computed bounds.
- A receipt schema: claim, scope, dataset, policy/model version, metric definition, assumptions, constraints, computed interval, endpoint witnesses, non-claims.
- Citation discipline: partial identification, dependence bounds, evaluation validity, red-team statistics, benchmark external validity.
- Reproducibility capsules: JSON inputs, generated witness JSON, rendered receipt, hash manifest.

Do not cite-wash. A reference is useful only if it supports a displayed mathematical or methodological move.

## 10. Free/Paid Ecosystem Possibilities

Free/open layer:
- Cinematic demos.
- Research notes.
- Reusable visualization primitives.
- Example receipts.
- Small local playground for two-guardrail examples.
- Instructor guides for workshops.

Paid/pro layer later:
- Builder Mode for private eval data.
- Multi-guardrail composition analysis.
- Receipt export with organization branding and audit metadata.
- Scenario libraries for enterprise AI governance.
- Private evidence capsules and reproducibility bundles.
- Team review workflow for claims/non-claims.
- White-label cinematic explainers for companies or labs.

The paid product is not "videos." It is **bounded claim infrastructure with unusually legible visuals**.

Do not charge for vague education. Charge, eventually, for generating credible evidence artifacts from real data and helping teams communicate risk without overclaiming.

## 11. Roadmap

### Today / Next 24 Hours

| Task | Difficulty | Impact | Risk | Avoid |
|---|---:|---:|---|---|
| Write README with exact thesis, demo instructions, and current limitations. | Low | High | Low | Marketing fluff. |
| Add research note for the current two-guardrail toy model. | Medium | High | Low | Overformalizing beyond the example. |
| Add a real sample receipt JSON matching the finale. | Low | High | Low | Fake hashes presented as real provenance. |
| Capture screenshots/GIFs for the public repo. | Low | Medium | Low | Dark illegible thumbnails. |
| Open issues for engine extraction instead of refactoring immediately. | Low | Medium | Low | Premature architecture churn. |

### This Week

| Task | Difficulty | Impact | Risk | Avoid |
|---|---:|---:|---|---|
| Ship public demo route and clean README. | Low | High | Low | Hiding the app behind explanation. |
| Extract `math/` for atoms, bounds, witnesses, and tests. | Medium | High | Medium | Abstracting every visualization. |
| Build Atom Table Fluid Machine. | Medium | High | Low | Making it decorative instead of explanatory. |
| Add Proof Mode overlay for current theorem. | Medium | High | Medium | Too much text on screen. |
| Add receipt download/viewer from JSON. | Medium | High | Medium | Compliance cosplay. |

### This Month

| Task | Difficulty | Impact | Risk | Avoid |
|---|---:|---:|---|---|
| Build second video: The Correlation Cliff. | Medium | Very high | Medium | Creating unrelated visual grammar. |
| Add `engine/` scene registry and parameter schema. | Medium | High | Medium | Big-bang rewrite. |
| Add `docs/research/` with formal notes and citations. | Medium | High | Low | Citation padding. |
| Add Builder v0: manual counts input -> interval + witnesses. | Medium | Very high | Medium | File upload before validation is excellent. |
| Add visual regression and math invariant tests. | Medium | High | Medium | Snapshot noise. |

### 3 Months

| Task | Difficulty | Impact | Risk | Avoid |
|---|---:|---:|---|---|
| Three-essay public library with shared primitives. | Hard | Very high | Medium | Weak filler episodes. |
| Evidence capsules with downloadable artifacts. | Hard | Very high | Medium | Security/privacy promises. |
| Multi-guardrail prototype for composition cases. | Hard | High | High | Unsupported math claims. |
| Instructor package for one workshop. | Medium | Medium | Low | LMS bloat. |
| Deploy polished demo with press/research landing README. | Medium | High | Low | Generic landing page aesthetics. |

### 1 Year

| Task | Difficulty | Impact | Risk | Avoid |
|---|---:|---:|---|---|
| A library of 8-12 visual proof essays. | Hard | Very high | Medium | Content treadmill. |
| Credible Builder Mode for bounded safety claims. | Very hard | Very high | High | Enterprise claims before validation. |
| Studio Mode for internal authoring. | Very hard | High | High | Public editor too early. |
| Research collaborations / citations / workshop use. | Hard | Very high | Medium | Trying to sound academic without peer feedback. |
| Paid pilots around evidence receipts. | Hard | High | High | Selling dashboards instead of claim receipts. |

## 12. Top 5 Next Actions

Brutal prioritization, scored 1-5 where higher is more of that property:

| Rank | Task | Impact | Effort | Risk | Wow | Education | Repo | Portfolio |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | Public README + screenshots + limitations | 5 | 1 | 1 | 3 | 4 | 5 | 5 |
| 2 | Formal research note for current toy model | 5 | 3 | 2 | 3 | 5 | 5 | 5 |
| 3 | Extract tested math core | 5 | 3 | 3 | 2 | 5 | 5 | 4 |
| 4 | Real receipt JSON + Evidence Mode viewer | 5 | 3 | 3 | 4 | 4 | 5 | 5 |
| 5 | Atom Table Fluid Machine | 4 | 3 | 2 | 5 | 5 | 4 | 5 |
| 6 | Correlation Cliff second video | 5 | 4 | 3 | 5 | 5 | 4 | 5 |
| 7 | Proof Mode theorem overlay | 4 | 3 | 3 | 4 | 5 | 4 | 4 |
| 8 | Parameter schema + URL state | 4 | 3 | 2 | 2 | 4 | 5 | 3 |
| 9 | Witness Museum expansion | 4 | 2 | 2 | 4 | 4 | 3 | 4 |
| 10 | Demo deployment polish | 4 | 2 | 2 | 3 | 3 | 4 | 5 |
| 11 | Instructor guide | 3 | 2 | 1 | 2 | 4 | 3 | 3 |
| 12 | Threshold Tuning Observatory | 4 | 4 | 3 | 4 | 5 | 4 | 4 |
| 13 | Evidence Chain Galaxy | 3 | 3 | 3 | 5 | 3 | 3 | 4 |
| 14 | Possible Worlds Polytope | 5 | 5 | 4 | 5 | 5 | 4 | 5 |
| 15 | Builder manual input v0 | 5 | 4 | 4 | 3 | 4 | 5 | 5 |
| 16 | Remotion export | 3 | 4 | 3 | 3 | 2 | 4 | 3 |
| 17 | Multi-guardrail math | 5 | 5 | 5 | 3 | 5 | 5 | 4 |
| 18 | Studio Mode | 3 | 5 | 5 | 4 | 3 | 4 | 4 |
| 19 | Course system | 2 | 5 | 4 | 2 | 3 | 2 | 2 |
| 20 | Enterprise dashboard | 2 | 5 | 5 | 2 | 2 | 2 | 3 |

Recommended top 5 only:
1. Public README + screenshots + limitations.
2. Formal research note for the current toy model.
3. Extract tested math core.
4. Real receipt JSON + Evidence Mode viewer.
5. Atom Table Fluid Machine.

The second video is not in the top five only because the engine and credibility floor should land first. Build it immediately after those five.

## 13. Kill List

Kill for now:
- Studio Mode.
- Paid/pro UI.
- Generic course platform.
- Enterprise dashboard.
- Multi-user accounts.
- Upload-anything Builder Mode.
- 3D polytope as the next task.
- Broad "AI safety curriculum."
- Blog engine.
- Plugin marketplace.
- AI-generated visual essays.
- Decorative hashes and fake provenance.
- Vague "trust center" language.
- Overexplaining UI with instructional text.
- More scenes for the current video unless they sharpen the proof.

Kill permanently unless the thesis changes:
- Badges, gamification, and learner streaks.
- Generic SaaS sidebar navigation as the primary identity.
- Claiming to certify safety.
- Any feature that produces a comforting score without a bounded claim and non-claims.

## 14. Final Founder-Level Recommendation

For the next month, do not build a platform. Build **one undeniable public artifact and one credible reusable spine**.

The artifact is the current video, polished into the best possible public demo of "hard truths made visually undeniable."

The reusable spine is smaller than it sounds: math objects, evidence receipts, theorem/proof blocks, parameterized visualizations, and a scene registry. That is enough to make the second essay faster and more credible.

The emotional target is not wonder alone. It is the moment where a viewer realizes that a number they trusted was never the object of truth. The unforgettable feeling is: **the comfort collapses, but the replacement is more honest**.

If this repo stays disciplined, it can become something rare: not an explainer site, not a governance dashboard, not an edtech app, but a forensic theater where claims are forced to show their witnesses.

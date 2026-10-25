// Preflight for the Phase 2 property tests in docs/VISION-LEGACY-PLAN.md (P-B, P-D).
// Read-only: loads src/math/guardrailComposition.ts and writes nothing.
//
//   node scripts/preflight-witness-grid.mjs
//
// Exit 0 only if every check holds. At bf8d87b this exits 1 on the witness-grid
// check (see the plan, section 4, criterion iii). It is not wired to CI; Phase 2
// replaces it with a vitest property test after the defect it reports is fixed.
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const server = await createServer({
  root,
  appType: "custom",
  logLevel: "error",
  optimizeDeps: { noDiscovery: true },
  server: { middlewareMode: true },
});

let failed = false;

try {
  const math = await server.ssrLoadModule("/src/math/guardrailComposition.ts");

  // Check 1 (P-B): for n = 100 and every integer marginal pair (a, b), both endpoint
  // witnesses must have non-negative integer atom counts that sum to n, reproduce the
  // margins (a, b), and hit the Frechet-Hoeffding OR endpoints.
  const n = 100;
  const bad = { nonInteger: 0, negative: 0, sum: 0, margins: 0, lowerEndpoint: 0, upperEndpoint: 0 };
  const firstFailures = [];
  let cells = 0;
  let cellsFailing = 0;

  for (let a = 0; a <= n; a++) {
    for (let b = 0; b <= n; b++) {
      cells++;
      const [lower, upper] = math.buildEndpointWitnessesForHarmfulOr({
        n,
        marginalA: a / n,
        marginalB: b / n,
      });
      const bounds = math.computeFrechetHoeffdingOrBounds(a / n, b / n);
      const before = JSON.stringify(bad);

      for (const witness of [lower, upper]) {
        const c = witness.atomCounts;
        const values = Object.values(c);
        if (values.some((v) => !Number.isInteger(v))) bad.nonInteger++;
        if (values.some((v) => v < 0)) bad.negative++;
        if (values.reduce((s, v) => s + v, 0) !== n) bad.sum++;
        if (c.p10 + c.p11 !== a || c.p01 + c.p11 !== b) bad.margins++;
      }
      if (Math.abs(lower.composedOrBlockRate - bounds.lower) > 1e-9) bad.lowerEndpoint++;
      if (Math.abs(upper.composedOrBlockRate - bounds.upper) > 1e-9) bad.upperEndpoint++;

      if (JSON.stringify(bad) !== before) {
        cellsFailing++;
        if (firstFailures.length < 3) {
          firstFailures.push({ a, b, lower: lower.atomCounts, upper: upper.atomCounts });
        }
      }
    }
  }

  console.log(`witness grid: n=${n}, cells=${cells}, cellsFailing=${cellsFailing}`);
  console.log(`  violations by kind: ${JSON.stringify(bad)}`);
  if (firstFailures.length > 0) {
    console.log(`  first failures: ${JSON.stringify(firstFailures)}`);
  }
  if (cellsFailing > 0) failed = true;

  // Check 2 (P-D, containment half): every integer joint table over n items has its OR
  // count inside [max(a, b), min(n, a + b)]. Exhaustive for n = 1..12; no sampling.
  let tables = 0;
  let outOfBand = 0;
  for (let size = 1; size <= 12; size++) {
    for (let p00 = 0; p00 <= size; p00++) {
      for (let p01 = 0; p00 + p01 <= size; p01++) {
        for (let p10 = 0; p00 + p01 + p10 <= size; p10++) {
          const p11 = size - p00 - p01 - p10;
          const a = p10 + p11;
          const b = p01 + p11;
          const or = p01 + p10 + p11;
          tables++;
          if (or < Math.max(a, b) || or > Math.min(size, a + b)) outOfBand++;
        }
      }
    }
  }
  console.log(`exhaustive containment: n=1..12, tables=${tables}, outOfBand=${outOfBand}`);
  if (outOfBand > 0) failed = true;
} finally {
  await server.close();
}

process.exit(failed ? 1 : 0);

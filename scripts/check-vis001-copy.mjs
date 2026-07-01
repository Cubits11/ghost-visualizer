import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const scanRoots = [
  "src/remotion",
  "src/components",
  "src/scenes",
  "src/views",
  "src/data",
  "src/evidence",
  "public/evidence",
];

const extensions = new Set([".ts", ".tsx", ".json", ".md"]);

const forbiddenPhrases = [
  "Corrected VIS-001 semantics",
  "p00 is the danger cell",
  "The missing overlap is not zero",
  "VIS-001 defaults the risk view",
  "certified safe",
  "officially certified",
  "cryptographically guaranteed",
  "verified safe",
  "approval certificate",
  "signed by authority",
];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = scanRoots
  .map((rootPath) => path.join(root, rootPath))
  .filter((scanRoot) => statSync(scanRoot, { throwIfNoEntry: false })?.isDirectory())
  .flatMap(walk);

const findings = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lower = text.toLowerCase();

  for (const phrase of forbiddenPhrases) {
    const index = lower.indexOf(phrase.toLowerCase());

    if (index === -1) {
      continue;
    }

    const line = text.slice(0, index).split("\n").length;
    findings.push({
      file: path.relative(root, file),
      line,
      phrase,
    });
  }
}

if (findings.length > 0) {
  console.error("VIS-001 copy safety check failed:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} contains "${finding.phrase}"`);
  }
  process.exit(1);
}

console.log(`VIS-001 copy safety check passed across ${files.length} files.`);

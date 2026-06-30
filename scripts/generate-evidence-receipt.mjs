import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(root, "public/evidence/sample-receipt.json");

const server = await createServer({
  root,
  appType: "custom",
  logLevel: "error",
  optimizeDeps: {
    noDiscovery: true,
  },
  server: { middlewareMode: true },
});

try {
  const { sampleReceiptJson } = await server.ssrLoadModule("/src/evidence/sampleReceipt.ts");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${sampleReceiptJson}\n`, "utf8");
  console.log(`wrote ${outputPath}`);
} finally {
  await server.close();
}

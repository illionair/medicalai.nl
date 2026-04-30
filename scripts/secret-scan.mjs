import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", ".next", "node_modules", "coverage", "out", "build"]);
const ignoredFiles = new Set(["package-lock.json", "dev.db"]);
const suspiciousPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /re_[A-Za-z0-9_-]{20,}/,
  /AIza[0-9A-Za-z_-]{20,}/,
  /AUTH_SECRET\s*=\s*["'][^"']{16,}["']/,
  /DATABASE_URL\s*=\s*["']postgres(?:ql)?:\/\/[^"']+["']/,
  /(?:API_KEY|SECRET|TOKEN|PASSWORD)\s*=\s*["'][^"']{12,}["']/i,
];

const findings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const rel = relative(root, fullPath).replaceAll("\\", "/");
    let stat;

    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      if (!ignoredDirs.has(entry)) walk(fullPath);
      continue;
    }

    if (stat.isSymbolicLink()) continue;
    if (ignoredFiles.has(entry) || entry.startsWith(".env") || rel === ".env.example") continue;
    if (stat.size > 1024 * 1024) continue;

    let text;
    try {
      text = readFileSync(fullPath, "utf8");
    } catch {
      continue;
    }

    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (suspiciousPatterns.some((pattern) => pattern.test(line))) {
        findings.push(`${rel}:${index + 1}`);
      }
    });
  }
}

walk(root);

if (findings.length > 0) {
  console.error("Potential secrets found:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("No obvious secrets found.");

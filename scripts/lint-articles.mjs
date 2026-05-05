#!/usr/bin/env node
// Validates inline `<interactive ... data-props='...'>` JSON blobs in all article drafts.
// Fails non-zero on broken JSON so the build catches it.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DRAFTS_DIR = join(process.cwd(), "docs", "articles", "drafts");
const TAG_RE = /<interactive\b[^>]*\bdata-props\s*=\s*'([^']*)'/g;

let errors = 0;

const files = readdirSync(DRAFTS_DIR).filter((f) => f.endsWith(".md"));

for (const file of files) {
    const content = readFileSync(join(DRAFTS_DIR, file), "utf8");
    let match;
    while ((match = TAG_RE.exec(content)) !== null) {
        const raw = match[1];
        try {
            JSON.parse(raw);
        } catch (err) {
            errors += 1;
            console.error(`[lint-articles] ${file}: invalid data-props JSON: ${err.message}`);
            console.error(`  payload: ${raw}`);
        }
    }
}

if (errors > 0) {
    console.error(`\n[lint-articles] ${errors} invalid data-props JSON blob(s).`);
    process.exit(1);
}

console.log(`[lint-articles] ${files.length} drafts scanned, all data-props JSON valid.`);

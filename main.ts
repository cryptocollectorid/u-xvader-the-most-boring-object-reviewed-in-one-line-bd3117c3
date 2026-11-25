// The Most Boring Object, Reviewed in One Line
// Writes a single review line (<= 200 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "The tea towel: it dries everything in the kitchen except itself, which has been damp since 2019.";

// Gate: the scorer only accepts UTF-8 text of 1-200 chars, not only whitespace,
// on a single line. Refuse to write anything that fails it.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry is ${ENTRY.length} chars, must be 1-200.`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("Entry must be a single non-blank line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);

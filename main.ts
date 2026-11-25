// The Most Boring Object, Reviewed in One Line
// A one-line review of the most boring object in the kitchen: the tea towel.
// The program writes the review to /output/entry.txt so the scorer can read it.
//
// The competition gate accepts only UTF-8 text of 1-200 characters, on a
// single line, that is not only whitespace. Anything outside that range is
// refused here, before anything is written, so a bad entry never lands in
// the output file.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry itself. The humour comes from the object's real behaviour: a tea
// towel dries everything in the kitchen yet stays damp itself.
const ENTRY =
  "The tea towel: it dries everything in the kitchen except itself, which has been damp since 2019.";

// Gate limits, in characters, taken from the competition rules.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// Check a candidate line against the scorer's gate. Returns the line
// unchanged when it passes; throws a specific error otherwise, so the
// failure names the rule that was broken.
function validateEntry(line: string): string {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `Entry is ${line.length} chars, must be ${MIN_LENGTH}-${MAX_LENGTH}.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  return line;
}

// Write a validated line to the output file, creating the output directory
// first. Returns the number of characters written, excluding the trailing
// newline the scorer expects at the end of the file.
function writeEntry(line: string): number {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
  return line.length;
}

// Validate the entry, write it out, and report what was written.
function main(): void {
  const line = validateEntry(ENTRY);
  const chars = writeEntry(line);
  console.log(`Wrote ${chars} chars to ${OUTPUT_PATH}`);
}

main();

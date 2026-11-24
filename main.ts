// Famous Last Words at 1 Percent — make.fun entry (program/v1, node22).
// Writes the phone's last words to /output/entry.txt.
//
// The line: a phone at 1% spends its dying breath doing the one favour
// only it can do — deleting its owner's search history — and signs off
// with a cheeky "You're welcome." First-person phone voice, the twist
// lands in the middle, the punch lands at the end, and it avoids the
// genre's stock moves (no will reading, no goodbye to the charger,
// no pun on 1 percent).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT =
  "I'm spending my last 1% deleting your search history. You're welcome.";

const MIN_CHARS = 1;
const MAX_CHARS = 199;

function validate(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // The gate reads the file as UTF-8: prove the line survives a
  // UTF-8 round trip byte-for-byte, and report its byte size too,
  // so a multi-byte character can never silently change the entry.
  const bytes = Buffer.from(text, "utf8");
  if (bytes.toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8");
  }
  console.log(`entry: ${text.length} chars, ${bytes.length} bytes`);
}

function main(): void {
  validate(OUTPUT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is exactly the line, nothing else.
  writeFileSync(join(outDir, "entry.txt"), OUTPUT, "utf8");
  console.log(`wrote entry (${OUTPUT.length} chars) to ${join(outDir, "entry.txt")}`);
}

main();

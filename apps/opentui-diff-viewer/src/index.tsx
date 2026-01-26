import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./App";
import type { DiffData } from "./data/sampleDiff";
import { sampleDiffs } from "./data/sampleDiff";
import { loadGitDiff } from "./data/gitDiff";

const args = process.argv.slice(2);
const useSample = args.includes("--sample");
const useStaged = args.includes("--staged");

let diffs: DiffData[];

if (useSample) {
  diffs = sampleDiffs;
} else {
  diffs = await loadGitDiff(useStaged);
  if (diffs.length === 0) {
    const mode = useStaged ? "staged" : "unstaged";
    console.log(`No ${mode} changes found. Use --sample for sample data.`);
    process.exit(0);
  }
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App diffs={diffs} />);

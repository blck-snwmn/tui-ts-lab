import type { DiffData } from "./sampleDiff";

function parseDiffOutput(output: string): DiffData[] {
  if (!output.trim()) return [];

  const files: DiffData[] = [];
  const fileDiffs = output.split(/^diff --git /m).filter(Boolean);

  for (const fileDiff of fileDiffs) {
    const lines = fileDiff.split("\n");
    const headerLine = lines[0];
    const match = headerLine?.match(/a\/(.+?) b\/(.+)/);
    if (!match) continue;

    const filename = match[2] ?? match[1] ?? "unknown";
    const ext = filename.split(".").pop() ?? "";
    const language = extToLanguage(ext);

    const diffStartIndex = lines.findIndex((line) => line.startsWith("---"));
    if (diffStartIndex === -1) continue;

    const diffContent = lines.slice(diffStartIndex).join("\n");
    files.push({ filename, language, diff: diffContent });
  }

  return files;
}

function extToLanguage(ext: string): string {
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    py: "python",
    rs: "rust",
    go: "go",
    rb: "ruby",
    java: "java",
    c: "c",
    cpp: "cpp",
    h: "c",
    hpp: "cpp",
    css: "css",
    html: "html",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    sh: "bash",
    toml: "toml",
  };
  return map[ext] ?? ext;
}

async function runGit(...args: string[]): Promise<string> {
  const proc = Bun.spawn(["git", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const output = await new Response(proc.stdout).text();
  await proc.exited;
  return output;
}

async function loadUntrackedFiles(): Promise<DiffData[]> {
  const output = await runGit("ls-files", "--others", "--exclude-standard");
  const files = output.trim().split("\n").filter(Boolean);
  const results: DiffData[] = [];

  for (const filepath of files) {
    const file = Bun.file(filepath);
    if (!(await file.exists())) continue;

    const content = await file.text();
    const lines = content.split("\n");
    const ext = filepath.split(".").pop() ?? "";
    const language = extToLanguage(ext);

    const addedLines = lines.map((line) => `+${line}`).join("\n");
    const diff = `--- /dev/null\n+++ b/${filepath}\n@@ -0,0 +1,${lines.length} @@\n${addedLines}`;

    results.push({ filename: `${filepath} (new)`, language, diff });
  }

  return results;
}

export async function loadGitDiff(staged: boolean): Promise<DiffData[]> {
  const args = staged ? ["diff", "--staged"] : ["diff"];
  const output = await runGit(...args);
  const trackedDiffs = parseDiffOutput(output);

  if (staged) return trackedDiffs;

  const untrackedDiffs = await loadUntrackedFiles();
  return [...trackedDiffs, ...untrackedDiffs];
}

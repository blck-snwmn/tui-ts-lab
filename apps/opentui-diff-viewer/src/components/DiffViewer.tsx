import type { DiffData } from "../data/sampleDiff";

interface DiffViewerProps {
  diffData: DiffData;
  mode: "unified" | "split";
}

export function DiffViewer({ diffData, mode }: DiffViewerProps) {
  return (
    <scrollbox flexGrow={1} borderStyle="single" borderColor="blue">
      <diff diff={diffData.diff} view={mode} filetype={diffData.language} showLineNumbers={true} />
    </scrollbox>
  );
}

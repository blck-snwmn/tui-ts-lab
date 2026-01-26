import { useState } from "react";
import { useKeyboard, useRenderer, useTerminalDimensions } from "@opentui/react";
import { DiffViewer } from "./components/DiffViewer";
import { FileSelector } from "./components/FileSelector";
import { StatusBar } from "./components/StatusBar";
import { HelpPanel } from "./components/HelpPanel";
import type { DiffData } from "./data/sampleDiff";

type ViewMode = "unified" | "split";

interface AppProps {
  diffs: DiffData[];
}

export function App({ diffs }: AppProps) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("unified");
  const [showHelp, setShowHelp] = useState(false);
  const { width, height } = useTerminalDimensions();
  const renderer = useRenderer();

  useKeyboard((key) => {
    if (key.name === "q") renderer.destroy();
    if (key.name === "?") setShowHelp((prev) => !prev);
    if (key.name === "j" || key.name === "down") {
      setSelectedFileIndex((prev) => Math.max(0, prev - 1));
    }
    if (key.name === "k" || key.name === "up") {
      setSelectedFileIndex((prev) => Math.min(diffs.length - 1, prev + 1));
    }
    if (key.name === "m") {
      setViewMode((prev) => (prev === "unified" ? "split" : "unified"));
    }
  });

  const currentDiff = diffs[selectedFileIndex];
  if (!currentDiff) {
    return <text>No diff data available</text>;
  }

  return (
    <box flexDirection="column" width={width} height={height}>
      <FileSelector files={diffs.map((d) => d.filename)} selectedIndex={selectedFileIndex} />
      <DiffViewer key={currentDiff.filename} diffData={currentDiff} mode={viewMode} />
      <StatusBar viewMode={viewMode} filename={currentDiff.filename} />
      {showHelp && <HelpPanel />}
    </box>
  );
}

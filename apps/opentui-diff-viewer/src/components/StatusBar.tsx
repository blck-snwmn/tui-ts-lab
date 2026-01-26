interface StatusBarProps {
  viewMode: "unified" | "split";
  filename: string;
}

export function StatusBar({ viewMode, filename }: StatusBarProps) {
  return (
    <box borderStyle="single" borderColor="green" padding={1} flexDirection="row" gap={1}>
      <text fg="yellow">{filename}</text>
      <text fg="gray">|</text>
      <text>Mode:</text>
      <text fg="cyan">{viewMode}</text>
      <text fg="gray">|</text>
      <text fg="white">j/k</text>
      <text fg="gray">navigate</text>
      <text fg="white">m</text>
      <text fg="gray">mode</text>
      <text fg="white">?</text>
      <text fg="gray">help</text>
      <text fg="white">q</text>
      <text fg="gray">quit</text>
    </box>
  );
}

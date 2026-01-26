export function HelpPanel() {
  return (
    <box
      position="absolute"
      top={5}
      left={10}
      width={50}
      borderStyle="double"
      borderColor="yellow"
      backgroundColor="black"
      padding={1}
    >
      <box flexDirection="column" gap={1}>
        <text fg="yellow">Keyboard Shortcuts</text>
        <box flexDirection="row" gap={1}>
          <text fg="cyan">j / Down</text>
          <text fg="gray">- Previous file</text>
        </box>
        <box flexDirection="row" gap={1}>
          <text fg="cyan">k / Up</text>
          <text fg="gray">- Next file</text>
        </box>
        <box flexDirection="row" gap={1}>
          <text fg="cyan">m</text>
          <text fg="gray">- Toggle view mode (unified/split)</text>
        </box>
        <box flexDirection="row" gap={1}>
          <text fg="cyan">?</text>
          <text fg="gray">- Toggle this help panel</text>
        </box>
        <box flexDirection="row" gap={1}>
          <text fg="cyan">q</text>
          <text fg="gray">- Quit application</text>
        </box>
        <text fg="gray">Press ? to close this panel</text>
      </box>
    </box>
  );
}

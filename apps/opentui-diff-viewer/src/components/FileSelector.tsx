interface FileSelectorProps {
  files: string[];
  selectedIndex: number;
}

export function FileSelector({ files, selectedIndex }: FileSelectorProps) {
  return (
    <box borderStyle="single" borderColor="cyan" padding={1} flexDirection="row" gap={1}>
      <text>Files:</text>
      {files.map((file, index) => (
        <box key={file} flexDirection="row">
          {index === selectedIndex ? (
            <text bg="blue" fg="white">
              {` ${file} `}
            </text>
          ) : (
            <text fg="gray">{` ${file} `}</text>
          )}
          {index < files.length - 1 && <text fg="gray">|</text>}
        </box>
      ))}
    </box>
  );
}

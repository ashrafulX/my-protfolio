export function AbdulRehmanWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" {...props}>
      <text
        x="256"
        y="178"
        fill="currentColor"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="174"
        fontWeight="700"
        letterSpacing="-16"
        textAnchor="middle"
      >
        RHAF
      </text>
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256"><text x="256" y="178" fill="${color}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="174" font-weight="700" letter-spacing="-16" text-anchor="middle">RHAF</text></svg>`;
}

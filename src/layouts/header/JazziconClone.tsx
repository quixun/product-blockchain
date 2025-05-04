import React from "react";

interface JazziconCloneProps {
  address: string;
  size?: number;
}

const generateColors = (seed: string, count = 5): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hash = [...seed].reduce((acc, c, idx) => acc + c.charCodeAt(0) * (i + idx + 1), 0);
    const hue = hash % 360;
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
};

const JazziconClone: React.FC<JazziconCloneProps> = ({ address, size = 48 }) => {
  const colors = generateColors(address);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="rounded-full overflow-hidden"
    >
      <circle cx="50" cy="50" r="50" fill={colors[0]} />
      <path d="M0,0 L100,0 L50,100 Z" fill={colors[1]} />
      <path d="M0,100 L100,100 L50,0 Z" fill={colors[2]} />
      <path d="M0,0 L0,100 L100,50 Z" fill={colors[3]} />
    </svg>
  );
};

export default JazziconClone;

import React from "react";

interface GradeGaugeProps {
  grade: number;
  size?: number;
}

export const GradeGauge: React.FC<GradeGaugeProps> = ({
  grade,
  size = 200,
}) => {
  const angle = (grade / 100) * 180;
  const radius = size / 2;
  const strokeWidth = size / 20;

  return (
    <div className="relative" style={{ width: size, height: size / 2 }}>
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius - strokeWidth / 2},${
            radius - strokeWidth / 2
          } 0 0 1 ${size - strokeWidth / 2},${size / 2}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Colored arc */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius - strokeWidth / 2},${
            radius - strokeWidth / 2
          } 0 0 1 ${size / 2},${strokeWidth / 2}`}
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth={strokeWidth}
        />
        <path
          d={`M ${size / 2},${strokeWidth / 2} A ${radius - strokeWidth / 2},${
            radius - strokeWidth / 2
          } 0 0 1 ${size - strokeWidth / 2},${size / 2}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
        />
        {/* Grade indicator */}
        <path
          d={`M ${size / 2},${size / 2} L ${
            size / 2 +
            Math.cos(((angle - 90) * Math.PI) / 180) * (radius - strokeWidth)
          },${
            size / 2 +
            Math.sin(((angle - 90) * Math.PI) / 180) * (radius - strokeWidth)
          }`}
          stroke="hsl(var(--foreground))"
          strokeWidth={strokeWidth / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary-foreground">
        {grade}
      </div>
    </div>
  );
};

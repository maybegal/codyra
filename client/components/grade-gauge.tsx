import React, { useEffect, useState } from "react";

interface GradeGaugeProps {
  grade: number;
}

export const GradeGauge: React.FC<GradeGaugeProps> = ({ grade }) => {
  const [animatedGrade, setAnimatedGrade] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedGrade(grade);
    }, 100);

    return () => clearTimeout(timer);
  }, [grade]);

  const circumference = 332; // 2 * Math.PI * 53
  const valueInCircumference = (animatedGrade / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const getColor = (value: number) => {
    if (value < 50) return "text-red-500";
    if (value < 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height="144"
        width="144"
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="transform -rotate-90"
      >
        <circle
          className="text-gray-700"
          strokeWidth="7"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className={`transition-all duration-1000 ease-in-out ${getColor(
            animatedGrade
          )}`}
          strokeWidth="7"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute flex">
        <p className={`text-3xl font-bold ${getColor(animatedGrade)}`}>
          {animatedGrade}
        </p>
      </div>
    </div>
  );
};

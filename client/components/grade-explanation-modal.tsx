import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GradeGauge } from "./grade-gauge";

type GradeExplanationProps = {
  grade: number;
};

const gradeExplanations = [
  {
    range: "90-100",
    explanation:
      "Excellent: Near-perfect solution with optimal efficiency and clarity.",
    symbol: "🏆",
  },
  {
    range: "80-89",
    explanation: "Very Good: Strong solution with minor improvements possible.",
    symbol: "🌟",
  },
  {
    range: "70-79",
    explanation:
      "Good: Solid solution but with room for optimization or clarity improvements.",
    symbol: "👍",
  },
  {
    range: "60-69",
    explanation:
      "Fair: Functional solution but significant improvements needed.",
    symbol: "🔨",
  },
  {
    range: "0-59",
    explanation:
      "Needs Improvement: Major issues present, requires substantial revision.",
    symbol: "📚",
  },
];

export function GradeExplanationModal({ grade }: GradeExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary-foreground bg-primary hover:bg-primary/90"
        >
          Explain Grade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Grade Explanation</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <GradeGauge grade={grade} size={300} />
          <div className="mt-8 relative">
            <div className="h-2 bg-gradient-to-r from-destructive via-secondary to-primary rounded-full"></div>
            <div className="flex justify-between mt-2">
              {gradeExplanations.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">{item.symbol}</div>
                  <div className="text-sm font-semibold">{item.range}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {gradeExplanations.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  grade >= parseInt(item.range.split("-")[0])
                    ? "bg-primary/20"
                    : "bg-secondary/20"
                }`}
              >
                <h3 className="font-semibold mb-2">
                  {item.symbol} {item.range}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { GradeGauge } from "./grade-gauge";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    overview: string;
    strategy: string;
    solution: string;
    code_solution: string;
    growth_opportunities: string;
  };
}


export default function AIFeedback({ feedback }: AIFeedbackProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState({
    grade: 0,
    overview: "",
    strategy: "",
    solution: "",
    code_solution: "",
    growth_opportunities: "",
  });

  useEffect(() => {
    const animateText = async (
      key: keyof typeof feedback,
      value: string | number
    ) => {
      if (typeof value === "number") {
        setDisplayedFeedback((prev) => ({ ...prev, [key]: value }));
      } else {
        const words = value.split(" ");
        for (let i = 0; i <= words.length; i++) {
          setDisplayedFeedback((prev) => ({
            ...prev,
            [key]: words.slice(0, i).join(" "),
          }));
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      }
    };

    const animateFeedback = async () => {
      await animateText("grade", feedback.grade);
      await animateText("overview", feedback.overview);
      await animateText("strategy", feedback.strategy);
      await animateText("solution", feedback.solution);
      await animateText("code_solution", feedback.code_solution);
      await animateText("growth_opportunities", feedback.growth_opportunities);
    };

    animateFeedback();
  }, [feedback]);

  return (
    <Card id="ai-feedback" className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground flex items-center justify-between">
          AI Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <GradeGauge grade={displayedFeedback.grade} />
          <div className="mt-4 flex items-center gap-4"></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <h2>Overview</h2>
          <p>{displayedFeedback.overview}</p>
          <h2>Strategy</h2>
          <p>{displayedFeedback.strategy}</p>
          <h2>Solution</h2>
          <p>{displayedFeedback.solution}</p>
          <h2>Code Solution</h2>
          <pre>{displayedFeedback.code_solution}</pre>
          <h2>Growth Opportunities</h2>
          <p>{displayedFeedback.growth_opportunities}</p>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          Model: GPT-4 | Date: {new Date().toLocaleDateString()} | Codyra
          Version: 1.0
        </p>
      </CardFooter>
    </Card>
  );
}

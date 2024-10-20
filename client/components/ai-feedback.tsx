import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradeGauge } from "./grade-gauge";
import { GradeExplanationModal } from "./grade-explanation-modal";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    overview: string;
    strategy: string;
    solution: string;
    codeSolution: string;
    growth: string;
  };
}

export default function AIFeedback({ feedback }: AIFeedbackProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState({
    grade: 0,
    overview: "",
    strategy: "",
    solution: "",
    codeSolution: "",
    growth: "",
  });

  useEffect(() => {
    const animateFeedback = async () => {
      await animateText("grade", feedback.grade);
      await animateText("overview", feedback.overview);
      await animateText("strategy", feedback.strategy);
      await animateText("solution", feedback.solution);
      await animateText("codeSolution", feedback.codeSolution);
      await animateText("growth", feedback.growth);
    };

    animateFeedback();
  }, [feedback]);

  const animateText = async (
    key: keyof typeof feedback,
    value: string | number
  ) => {
    if (typeof value === "number") {
      for (let i = 0; i <= value; i++) {
        setDisplayedFeedback((prev) => ({ ...prev, [key]: i }));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    } else {
      for (let i = 0; i <= value.length; i++) {
        setDisplayedFeedback((prev) => ({ ...prev, [key]: value.slice(0, i) }));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }
  };

  return (
    <Card className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">AI Feedback</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <GradeGauge grade={displayedFeedback.grade} size={250} />
          <div className="mt-4 flex items-center gap-4">
            <GradeExplanationModal grade={displayedFeedback.grade} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Overview
          </h3>
          <p className="text-muted-foreground">{displayedFeedback.overview}</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Strategy
          </h3>
          <p className="text-muted-foreground">{displayedFeedback.strategy}</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Solution
          </h3>
          <p className="text-muted-foreground">{displayedFeedback.solution}</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Code Solution
          </h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm text-muted-foreground">
            <code>{displayedFeedback.codeSolution}</code>
          </pre>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Growth Opportunities
          </h3>
          <p className="text-muted-foreground">{displayedFeedback.growth}</p>
        </div>
      </CardContent>
    </Card>
  );
}

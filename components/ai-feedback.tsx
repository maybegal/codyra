import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import { GradeGauge } from "./grade-gauge";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    overview: string;
    strategy: string;
    solution: string;
    code_solution: string;
    growth_opportunities: string;
    model: string;
    date: string;
    version: string;
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
    model: feedback.model,
    date: feedback.date,
    version: feedback.version,
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
          <ReactMarkdown>{displayedFeedback.overview}</ReactMarkdown>
          <h2>Strategy</h2>
          <ReactMarkdown>{displayedFeedback.strategy}</ReactMarkdown>
          <h2>Solution</h2>
          <ReactMarkdown>{displayedFeedback.solution}</ReactMarkdown>
          <h2>Code Solution</h2>
          <pre><ReactMarkdown>{displayedFeedback.code_solution}</ReactMarkdown></pre>
          <h2>Growth Opportunities</h2>
          <ReactMarkdown>{displayedFeedback.growth_opportunities}</ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          Model: {displayedFeedback.model} | Date: {displayedFeedback.date} | Codyra
          Version: {displayedFeedback.version}
        </p>
      </CardFooter>
    </Card>
  );
}

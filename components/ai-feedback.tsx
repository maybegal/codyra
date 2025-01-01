import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Target, TrendingUp, Puzzle, Code } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { GradeGauge } from "./grade-gauge";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    overview: string;
    strategy: string;
    growth_opportunities: string;
    solution: string;
    code_solution: string;
    programming_language: string;
    model: string;
    date: string;
    version: string;
  };
}

interface FeedbackSectionProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function FeedbackSection({ icon, title, content }: FeedbackSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-secondary rounded-md">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className={cn("prose prose-invert max-w-none", 
        typeof content === 'string' ? "pl-11" : "")}>
        {typeof content === 'string' ? <ReactMarkdown>{content}</ReactMarkdown> : content}
      </div>
    </div>
  );
}

export default function AIFeedback({ feedback }: AIFeedbackProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState({
    grade: feedback.grade,
    overview: feedback.overview,
    strategy: feedback.strategy,
    growth_opportunities: feedback.growth_opportunities,
    solution: feedback.solution,
    code_solution: feedback.code_solution,
    programming_language: feedback.programming_language,
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
      await animateText("growth_opportunities", feedback.growth_opportunities);
      await animateText("solution", feedback.solution);
      await animateText("code_solution", feedback.code_solution);
    };

    animateFeedback();
  }, [feedback]);

  return (
    <Card id="ai-feedback" className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold">AI Feedback</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="flex justify-center">
          <GradeGauge grade={displayedFeedback.grade} />
        </div>
        <div className="space-y-8">
          <FeedbackSection
            icon={<Lightbulb className="w-5 h-5" />}
            title="Overview"
            content={displayedFeedback.overview}
          />
          <FeedbackSection
            icon={<Target className="w-5 h-5" />}
            title="Strategy"
            content={displayedFeedback.strategy}
          />
          <FeedbackSection
            icon={<TrendingUp className="w-5 h-5" />}
            title="Growth Opportunities"
            content={displayedFeedback.growth_opportunities}
          />
          <FeedbackSection
            icon={<Puzzle className="w-5 h-5" />}
            title="Solution"
            content={displayedFeedback.solution}
          />
          <FeedbackSection
            icon={<Code className="w-5 h-5" />}
            title="Code Solution"
            content={
              <div className="h-[400px] w-full mt-4">
                <Editor
                  height="100%"
                  language={displayedFeedback.programming_language}
                  theme="vs-dark"
                  value={displayedFeedback.code_solution}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                  }}
                />
              </div>
            }
          />
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


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradeGauge } from "./grade-gauge";
import { GradeExplanationModal } from "./grade-explanation-modal";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    content: string;
  };
}

function formatFeedbackContent(content: string): JSX.Element {
  const sections = content.split("\n\n");
  return (
    <>
      {sections.map((section, index) => {
        const [title, ...contentLines] = section.split("\n");
        return (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-primary-foreground text-xl mb-2">
              {title.replace("#", "").trim()}
            </h3>
            {contentLines.map((line, lineIndex) => (
              <p key={lineIndex} className="text-muted-foreground mb-2">
                {line.trim()}
              </p>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default function AIFeedback({ feedback }: AIFeedbackProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState({
    grade: 0,
    content: "",
  });

  useEffect(() => {
    setDisplayedFeedback({ grade: 0, content: "" });
    const animateFeedback = async () => {
      await animateText("grade", feedback.grade);
      await animateText("content", feedback.content);
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
    <Card id="ai-feedback" className="mb-24 bg-card shadow-lg">
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
        {formatFeedbackContent(displayedFeedback.content)}
      </CardContent>
    </Card>
  );
}

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { GradeGauge } from "./grade-gauge";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface AIFeedbackProps {
  feedback: {
    grade: number;
    content: string;
  };
}

const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h1: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
  ),
};

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

  return (
    <Card id="ai-feedback" className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">AI Feedback</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <GradeGauge grade={displayedFeedback.grade} />
          <div className="mt-4 flex items-center gap-4"></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {displayedFeedback.content}
          </ReactMarkdown>
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

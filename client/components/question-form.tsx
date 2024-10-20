import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, FileQuestion, Paperclip, Zap, Terminal } from "lucide-react";
import {
  getGrade,
  getOverview,
  getStrategy,
  getSolution,
  getCodeSolution,
  getGrowth,
} from "@/lib/api";

interface QuestionFormProps {
  onSubmit: (feedback: {
    grade: number;
    overview: string;
    strategy: string;
    solution: string;
    codeSolution: string;
    growth: string;
  }) => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const requestData = {
      programming_language: programmingLanguage,
      question,
      answer,
      notes,
    };

    try {
      const [grade, overview, strategy, solution, codeSolution, growth] =
        await Promise.all([
          getGrade(requestData),
          getOverview(requestData),
          getStrategy(requestData),
          getSolution(requestData),
          getCodeSolution(requestData),
          getGrowth(requestData),
        ]);

      onSubmit({ grade, overview, strategy, solution, codeSolution, growth });
    } catch (error) {
      console.error("Failed to get feedback:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground">
          Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="programming_language"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Programming Language
              </Label>
              <Select onValueChange={setProgrammingLanguage} required>
                <SelectTrigger
                  id="programming_language"
                  className="bg-input border-input text-primary-foreground"
                >
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="question"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <FileQuestion className="w-4 h-4" />
                The Question
              </Label>
              <Textarea
                id="question"
                placeholder="Type your programming question here..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[120px]"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="answer"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                Your Answer
              </Label>
              <Textarea
                id="answer"
                placeholder="Paste your code solution here..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[120px] font-mono"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <Paperclip className="w-4 h-4" />
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional context or clarification..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Illuminate Solution
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

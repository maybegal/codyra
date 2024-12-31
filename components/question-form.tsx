import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, FileQuestion, Paperclip, Zap, Terminal } from "lucide-react";
import { getFeedback } from "@/lib/api";

interface QuestionFormProps {
  onSubmit: (feedback: {
    grade: number;
    overview: string;
    strategy: string;
    solution: string;
    code_solution: string;
    growth_opportunities: string;
  }) => void;
  onResetFeedback: () => void;
}

export default function QuestionForm({
  onSubmit,
  onResetFeedback,
}: QuestionFormProps) {
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    onResetFeedback();

    const requestData = {
      programming_language: programmingLanguage,
      question,
      answer,
      notes,
    };

    try {
      const feedback = await getFeedback(requestData);
      onSubmit(feedback);

      const aiFeedbackElement = document.getElementById("ai-feedback");
      if (aiFeedbackElement) {
        aiFeedbackElement.scrollIntoView({ behavior: "smooth" });
      }
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
          Submit Your Coding Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="programming_language"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Programming Language or Framework
              </Label>
              <Select onValueChange={setProgrammingLanguage} required>
                <SelectTrigger
                  id="programming_language"
                  className="bg-input border-input text-primary-foreground"
                >
                  <SelectValue placeholder="Select a language or framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="kotlin">Kotlin</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Frameworks</SelectLabel>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="django">Django</SelectItem>
                    <SelectItem value="flask">Flask</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="aspnet">ASP.NET</SelectItem>
                    <SelectItem value="express">Express.js</SelectItem>
                    <SelectItem value="laravel">Laravel</SelectItem>
                    <SelectItem value="rails">Ruby on Rails</SelectItem>
                  </SelectGroup>
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
                placeholder="E.g., Write a function that finds the longest palindromic substring in a given string."
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
                placeholder={`E.g., 
def longest_palindrome(s):
    if not s:
        return ""
    
    start, max_len = 0, 1
    for i in range(len(s)):
        len1 = expand_around_center(s, i, i)
        len2 = expand_around_center(s, i, i + 1)
        length = max(len1, len2)
        if length > max_len:
            start = i - (length - 1) // 2
            max_len = length
    
    return s[start:start + max_len]

def expand_around_center(s, left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]:
        left -= 1
        right += 1
    return right - left - 1`}
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[300px] font-mono"
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
                placeholder="E.g., I'm not sure if this solution is optimal. Can you suggest any improvements for time or space complexity?"
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="relative">
            <Button
              type="submit"
              className={`w-full bg-primary text-primary-foreground flex items-center justify-center gap-2 transition-all duration-300 ease-in-out ${
                isLoading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:bg-primary/90 hover:shadow-md"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>Analyzing...</span>
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  </div>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Get AI Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

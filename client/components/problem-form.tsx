import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function ChallengeForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Card className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground">
          Decode Your Challenge
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Let our AI unravel your programming enigmas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="language"
                className="text-sm font-medium text-primary-foreground flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Programming Language
              </Label>
              <Select>
                <SelectTrigger
                  id="language"
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
                Your Question
              </Label>
              <Textarea
                id="question"
                placeholder="Type your programming question here..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[120px]"
                required
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
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Illuminate Solution
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

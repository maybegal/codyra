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
                className="text-sm font-medium text-primary-foreground"
              >
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
                className="text-sm font-medium text-primary-foreground"
              >
                Your Question
              </Label>
              <Textarea
                id="question"
                placeholder="Type your programming question here..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-primary-foreground"
              >
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional context or clarification..."
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground min-h-[80px]"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Illuminate Solution
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AIInsight() {
  const [showSolution, setShowSolution] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  const handleFollowUp = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Follow-up question:", followUpQuestion);
    setFollowUpQuestion("");
  };

  return (
    <Card className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground">
          AI-Crafted Insight
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Confidence Score: 85%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Brief Illumination:
          </h3>
          <p className="text-muted-foreground">
            This question delves into the realm of array manipulation in Python.
            Mastery of list comprehension and fundamental loop structures is the
            key to efficiently unlocking this problem.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Thought Catalyst:
          </h3>
          <p className="text-muted-foreground">
            Envision a journey through the array, where each element is a
            checkpoint. At each stop, we must decide its fate based on a
            condition, ultimately crafting a new array from these decisions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Ascension Steps:
          </h3>
          <p className="text-muted-foreground">
            Immerse yourself in the art of list comprehensions. Contemplate the
            time complexity as you navigate array problems. Challenge yourself
            to solve this riddle using both a traditional for loop and the
            elegant list comprehension to truly grasp their nuances.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2">
            Encoded Solution:
          </h3>
          {showSolution ? (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm text-muted-foreground">
              <code>
                {`# Using a for loop
result = []
for num in numbers:
    if num % 2 == 0:
        result.append(num * 2)
    else:
        result.append(num * 3)

# Using list comprehension
result = [num * 2 if num % 2 == 0 else num * 3 for num in numbers]`}
              </code>
            </pre>
          ) : (
            <Button
              onClick={() => setShowSolution(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Unveil the Code
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleFollowUp} className="w-full">
          <div className="space-y-2">
            <Label
              htmlFor="followup"
              className="text-sm font-medium text-primary-foreground"
            >
              Seek Further Enlightenment
            </Label>
            <div className="flex space-x-2">
              <Input
                id="followup"
                placeholder="What other mysteries shall we unravel?"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                className="bg-input border-input text-primary-foreground placeholder-muted-foreground flex-grow"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Ask
              </Button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

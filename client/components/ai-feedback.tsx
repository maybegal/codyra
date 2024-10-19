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
import { Lightbulb, Zap, TrendingUp, Code, Send } from "lucide-react";
import { GradeExplanationModal } from "./grade-explanation-modal";
import { GradeGauge } from "./grade-gauge";

export default function AIInsight() {
  const [showSolution, setShowSolution] = useState(false);
  const [showCodeSolution, setShowCodeSolution] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const grade = 85; // This would typically come from your AI grading system

  return (
    <Card className="mb-24 bg-card shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-6 h-6" />
            AI Feedback
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <GradeGauge grade={grade} size={250} />
          <div className="mt-4 flex items-center gap-4">
            <GradeExplanationModal grade={grade} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Concept Overview
          </h3>
          <p className="text-muted-foreground">
            This question delves into the realm of array manipulation in Python.
            Mastery of list comprehension and fundamental loop structures is the
            key to efficiently unlocking this problem.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Problem-Solving Strategy
          </h3>
          <p className="text-muted-foreground">
            Envision a journey through the array, where each element is a
            checkpoint. At each stop, we must decide its fate based on a
            condition, ultimately crafting a new array from these decisions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Solution
          </h3>
          {showSolution ? (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm text-muted-foreground">
              <code>
                {`Use a loop to iterate over the numbers in the list. If the number is even, multiply it by 2. Otherwise, multiply it by 3.`}
              </code>
            </pre>
          ) : (
            <Button
              onClick={() => setShowSolution(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Solution
            </Button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Code Solution
          </h3>
          {showCodeSolution ? (
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
              onClick={() => setShowCodeSolution(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Code Solution
            </Button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground text-lg mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Areas for Growth
          </h3>
          <p className="text-muted-foreground">
            Immerse yourself in the art of list comprehensions. Contemplate the
            time complexity as you navigate array problems. Challenge yourself
            to solve this riddle using both a traditional for loop and the
            elegant list comprehension to truly grasp their nuances.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

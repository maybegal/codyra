"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [showSolution, setShowSolution] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowResults(true);
  };

  const handleFollowUp = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the follow-up question to your AI backend
    console.log("Follow-up question:", followUpQuestion);
    setFollowUpQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Codyra - Programming Question Solver
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Your Question</CardTitle>
            <CardDescription>
              Get AI-powered explanations and solutions for your programming
              questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Type your programming question here..."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional context or clarification..."
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Submit Question
              </Button>
            </form>
          </CardContent>
        </Card>

        {showResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI-Generated Solution</CardTitle>
              <CardDescription>Confidence Score: 85/100</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Brief Explanation:</h3>
                  <p>
                    This question relates to array manipulation in Python.
                    Understanding list comprehension and basic loop structures
                    is crucial for solving this problem efficiently.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Thought Process:</h3>
                  <p>
                    To approach this problem, we need to think about iterating
                    through the array, checking each element against a
                    condition, and constructing a new array based on that
                    condition.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Improvement Tips:</h3>
                  <p>
                    Practice more with list comprehensions and consider time
                    complexity when solving array problems. Try to solve this
                    problem using both a for loop and a list comprehension to
                    understand the differences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Solution:</h3>
                  {showSolution ? (
                    <pre className="bg-gray-100 p-4 rounded-md">
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
                    <Button onClick={() => setShowSolution(true)}>
                      Reveal Solution
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleFollowUp} className="w-full">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="followup">Follow-up Question</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="followup"
                      placeholder="Any additional questions?"
                      value={followUpQuestion}
                      onChange={(e) => setFollowUpQuestion(e.target.value)}
                    />
                    <Button type="submit">Ask</Button>
                  </div>
                </div>
              </form>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}

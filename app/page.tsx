"use client";

import { useState } from "react";
import Header from "@/components/header";
import QuestionForm from "@/components/question-form";
import AIFeedback from "@/components/ai-feedback";
import Footer from "@/components/footer";

export default function Home() {
  const [feedback, setFeedback] = useState<{
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
  } | null>(null);

  const handleSubmit = (newFeedback: {
    grade: number;
    overview: string;
    strategy: string;
    growth_opportunities: string;
    solution: string;
    code_solution: string;
    programming_language: string;
    model: string;
    date: string;
    version: string; }) => {
    setFeedback(newFeedback);
  };

  const handleResetFeedback = () => {
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <Header />
        <QuestionForm
          onSubmit={handleSubmit}
          onResetFeedback={handleResetFeedback}
        />
        {feedback && <AIFeedback feedback={feedback} />}
      </main>
      <Footer />
    </div>
  );
}

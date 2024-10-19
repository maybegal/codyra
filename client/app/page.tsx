"use client";

import { useState } from "react";
import Header from "@/components/header";
import ChallengeForm from "@/components/question-form";
import AIInsight from "@/components/ai-feedback";
import Footer from "@/components/footer";

export default function Home() {
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <Header />
        <ChallengeForm onSubmit={handleSubmit} />
        {showResults && <AIInsight />}
      </main>
      <Footer />
    </div>
  );
}

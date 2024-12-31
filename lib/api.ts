interface FeedbackRequest {
  programming_language: string;
  question: string;
  answer: string;
  notes: string;
}

interface FeedbackResponse {
  grade: number;
  overview: string;
  strategy: string;
  solution: string;
  code_solution: string;
  growth_opportunities: string;
  model: string;
  date: string;
  version: string;
}

export async function getFeedback(
  data: FeedbackRequest
): Promise<FeedbackResponse> {
  const response = await fetch("http://127.0.0.1:8000/feedback/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch feedback");
  }

  return response.json();
}

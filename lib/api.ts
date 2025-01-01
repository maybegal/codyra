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
  growth_opportunities: string;
  solution: string;
  code_solution: string;
  programming_language: string;
  model: string;
  date: string;
  version: string;
}

export async function getFeedback(
  data: FeedbackRequest
): Promise<FeedbackResponse> {
  try {
    const response = await fetch("https://codyra-api.vercel.app/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch feedback: ${errorData.message || response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw new Error("An error occurred while fetching feedback. Please try again later.");
  }
}

interface FeedbackRequest {
  programming_language: string;
  question: string;
  answer: string;
  notes: string;
}

interface FeedbackResponse {
  grade: number;
  content: string;
}

async function fetchFeedback(data: FeedbackRequest): Promise<FeedbackResponse> {
  const response = await fetch(`https://codyra-api.vercel.app/feedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch feedback");
  }

  return response.json();
}

export async function getFeedback(
  data: FeedbackRequest
): Promise<FeedbackResponse> {
  return fetchFeedback(data);
}

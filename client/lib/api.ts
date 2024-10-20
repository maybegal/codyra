interface FeedbackRequest {
  programming_language: string;
  question: string;
  answer: string;
  notes: string;
}

interface FeedbackResponse {
  feedback_type: string;
  content: string | number;
}

async function fetchFeedback(
  feedbackType: string,
  data: FeedbackRequest
): Promise<FeedbackResponse> {
  const response = await fetch(
    `https://codyra-api.vercel.app/feedback/${feedbackType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch feedback");
  }

  return response.json();
}

export async function getGrade(data: FeedbackRequest): Promise<number> {
  const response = await fetchFeedback("grade", data);
  return response.content as number;
}

export async function getOverview(data: FeedbackRequest): Promise<string> {
  const response = await fetchFeedback("overview", data);
  return response.content as string;
}

export async function getStrategy(data: FeedbackRequest): Promise<string> {
  const response = await fetchFeedback("strategy", data);
  return response.content as string;
}

export async function getSolution(data: FeedbackRequest): Promise<string> {
  const response = await fetchFeedback("solution", data);
  return response.content as string;
}

export async function getCodeSolution(data: FeedbackRequest): Promise<string> {
  const response = await fetchFeedback("code_solution", data);
  return response.content as string;
}

export async function getGrowth(data: FeedbackRequest): Promise<string> {
  const response = await fetchFeedback("growth", data);
  return response.content as string;
}

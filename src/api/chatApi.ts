import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getLlamaResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/llama`, {
      message,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with the backend:", error);
    throw new Error("Failed to communicate with the backend.");
  }
};

export const getDeepseekResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/deepseek`, {
      message,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with the backend:", error);
    throw new Error("Failed to communicate with the backend.");
  }
};

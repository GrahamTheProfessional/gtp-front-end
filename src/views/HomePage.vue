<script setup>
import { ref } from "vue";
import { getLlamaResponse, getDeepseekResponse } from "../api/chatApi";

// Reactive variables
const userInput = ref("");
const response = ref("");
const selectedModel = ref("llama");

// Function to send the user's message to the backend
const sendMessage = async () => {
  if (!userInput.value.trim()) {
    alert("Please enter a message!");
    return;
  }
  try {
    // Call the appropriate API function based on the selected model
    if (selectedModel.value === "llama") {
      response.value = await getLlamaResponse(userInput.value);
    } else if (selectedModel.value === "deepseek") {
      response.value = await getDeepseekResponse(userInput.value);
    }

    // Clear the input field
    userInput.value = "";
  } catch (error) {
    response.value = "Oops! Something went wrong: " + error;
  }
};
</script>

<template>
  <div class="home-page">
    <!-- Header -->
    <header class="home-page__header">
      <h1>Graham the Professional</h1>
      <p>Chat with the AI professional below!</p>
    </header>

    <!-- Model Selector (Dropdown) -->
    <div class="model-selector">
      <label for="model">Select AI Model:</label>
      <select
        id="model"
        v-model="selectedModel"
        class="model-selector__dropdown"
      >
        <option value="llama">Llama</option>
        <option value="deepseek">Deepseek</option>
      </select>
    </div>

    <!-- Chat Area -->
    <main class="home-page__chat">
      <div class="chat-box">
        <!-- User Input -->
        <input
          v-model="userInput"
          type="text"
          placeholder="Type your message here..."
          class="chat-box__input"
        />
        <button @click="sendMessage" class="chat-box__button">Send</button>
      </div>

      <!-- Response Area -->
      <div v-if="response" class="chat-box__response">
        <strong>AI:</strong> {{ response }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
}

.home-page__header {
  margin-bottom: 2rem;
}

.model-selector {
  margin-bottom: 1rem;
}

.model-selector__dropdown {
  margin-left: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.home-page__chat {
  max-width: 600px;
  margin: 0 auto;
}

.chat-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.chat-box__input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-box__button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-box__button:hover {
  background-color: #0056b3;
}

.chat-box__response {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
}
</style>

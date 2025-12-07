import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// Create OpenAI-compatible provider for GLM (Z.AI Coding Plan)
// Uses ZHIPU_API_KEY environment variable
const glm = createOpenAICompatible({
  name: "zai-coding-plan",
  baseURL: "https://api.z.ai/api/coding/paas/v4",
  apiKey: process.env.ZHIPU_API_KEY,
});

// Create Google Generative AI provider for Gemini models
// Uses GOOGLE_GENERATIVE_AI_API_KEY environment variable
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
          "chat-model-gemini": chatModel,
          "chat-model-gemini-reasoning": reasoningModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // GLM models
        "chat-model": glm.chatModel("glm-4.6"),
        "chat-model-reasoning": wrapLanguageModel({
          model: glm.chatModel("glm-4.6"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": glm.chatModel("glm-4.5-air"),
        "artifact-model": google("gemini-2.0-flash"),
        // Gemini models
        "chat-model-gemini": google("gemini-2.0-flash"),
        "chat-model-gemini-reasoning": wrapLanguageModel({
          model: google("gemini-2.5-flash"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
      },
    });

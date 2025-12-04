export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "GLM-4.6",
    description: "Advanced GLM model for coding and general tasks",
  },
  {
    id: "chat-model-reasoning",
    name: "GLM-4.6 Reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
  {
    id: "chat-model-gemini",
    name: "Gemini 2.0 Flash",
    description: "Fast and capable Gemini model for general tasks",
  },
  {
    id: "chat-model-gemini-reasoning",
    name: "Gemini 2.5 Flash (Reasoning)",
    description: "Advanced reasoning capabilities with thinking process",
  },
];

export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "glm-4.6",
    description: "Advanced GLM model for coding and general tasks",
  },
  {
    id: "chat-model-reasoning",
    name: "glm-4.6 Reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];

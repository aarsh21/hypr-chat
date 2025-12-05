import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlements: Entitlements = {
  maxMessagesPerDay: 20,
  availableChatModelIds: ["chat-model", "chat-model-reasoning"],
};

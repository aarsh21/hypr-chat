import { streamObject } from "ai";
import { z } from "zod";
import { codePrompt, updateDocumentPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";

export const codeDocumentHandler = createDocumentHandler<"code">({
  kind: "code",
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";

    const { fullStream } = streamObject({
      model: myProvider.languageModel("artifact-model"),
      system:
        codePrompt +
        '\n\nYou MUST respond with a valid JSON object in this exact format: {"code": "your code here"}',
      prompt: title,
      schema: z.object({
        code: z.string(),
      }),
      providerOptions: {
        openaiCompatible: {
          structuredOutputs: false,
        },
      },
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === "object") {
        const { object } = delta;
        const { code } = object;

        if (code) {
          dataStream.write({
            type: "data-codeDelta",
            data: code ?? "",
            transient: true,
          });

          draftContent = code;
        }
      }
    }

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";

    const { fullStream } = streamObject({
      model: myProvider.languageModel("artifact-model"),
      system:
        updateDocumentPrompt(document.content, "code") +
        '\n\nYou MUST respond with a valid JSON object in this exact format: {"code": "your code here"}',
      prompt: description,
      schema: z.object({
        code: z.string(),
      }),
      providerOptions: {
        openaiCompatible: {
          structuredOutputs: false,
        },
      },
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === "object") {
        const { object } = delta;
        const { code } = object;

        if (code) {
          dataStream.write({
            type: "data-codeDelta",
            data: code ?? "",
            transient: true,
          });

          draftContent = code;
        }
      }
    }

    return draftContent;
  },
});

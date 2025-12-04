import { streamObject } from "ai";
import { z } from "zod";
import { sheetPrompt, updateDocumentPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";

export const sheetDocumentHandler = createDocumentHandler<"sheet">({
  kind: "sheet",
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";

    const { fullStream } = streamObject({
      model: myProvider.languageModel("artifact-model"),
      system:
        sheetPrompt +
        '\n\nYou MUST respond with a valid JSON object in this exact format: {"csv": "your csv data here"}',
      prompt: title,
      schema: z.object({
        csv: z.string().describe("CSV data"),
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
        const { csv } = object;

        if (csv) {
          dataStream.write({
            type: "data-sheetDelta",
            data: csv,
            transient: true,
          });

          draftContent = csv;
        }
      }
    }

    dataStream.write({
      type: "data-sheetDelta",
      data: draftContent,
      transient: true,
    });

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";

    const { fullStream } = streamObject({
      model: myProvider.languageModel("artifact-model"),
      system:
        updateDocumentPrompt(document.content, "sheet") +
        '\n\nYou MUST respond with a valid JSON object in this exact format: {"csv": "your csv data here"}',
      prompt: description,
      schema: z.object({
        csv: z.string(),
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
        const { csv } = object;

        if (csv) {
          dataStream.write({
            type: "data-sheetDelta",
            data: csv,
            transient: true,
          });

          draftContent = csv;
        }
      }
    }

    return draftContent;
  },
});

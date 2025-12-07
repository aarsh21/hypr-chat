import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

const handler = toNextJsHandler(auth);

export const GET = async (request: Request) => {
  try {
    return await handler.GET(request);
  } catch (error) {
    console.error("Auth GET error:", error);
    throw error;
  }
};

export const POST = async (request: Request) => {
  try {
    return await handler.POST(request);
  } catch (error) {
    console.error("Auth POST error:", error);
    throw error;
  }
};

import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { z } from "zod";

import { auth } from "@/lib/auth";

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    // Update the file type based on the kind of files you want to accept
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "File type should be JPEG or PNG",
    }),
});

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Get filename from formData since Blob doesn't have name property
    const originalFilename = (formData.get("file") as File).name;
    const fileBuffer = await file.arrayBuffer();

    try {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      // Generate unique filename to avoid collisions
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const ext = path.extname(originalFilename);
      const baseName = path.basename(originalFilename, ext);
      const uniqueFilename = `${baseName}-${timestamp}-${randomSuffix}${ext}`;

      // Write file to public/uploads directory
      const filePath = path.join(uploadsDir, uniqueFilename);
      await writeFile(filePath, Buffer.from(fileBuffer));

      // Return URL that can be accessed publicly
      const url = `/uploads/${uniqueFilename}`;

      return NextResponse.json({
        url,
        pathname: uniqueFilename,
        contentType: file.type,
      });
    } catch (_error) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

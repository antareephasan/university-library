import ImageKit from "imagekit";
import dummyBooks from "../dummybooks.json";

import { books } from "./schema";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.log("Error uploading image/video to ImageKit: ", error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      console.log("Attempting to seed book: ", book.title);
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      console.log("Cover Image uploaded successfully: ", coverUrl);
      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/trailers"
      )) as string;
      console.log("Video Trailer uploaded successfully: ", videoUrl);
      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });

      console.log("Book seeded successfully: ", book.title);
    }

    console.log("All Data seeded successfully!");
  } catch (error) {
    console.log("Error seeding data: ", error);
  }
};

seed();

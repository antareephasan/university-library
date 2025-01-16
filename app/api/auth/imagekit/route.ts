import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const imageKit = new ImageKit({
  publicKey: config.env.imagekit.publicKey!,
  privateKey: config.env.imagekit.privateKey!,
  urlEndpoint: config.env.imagekit.urlEndpoint!,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}

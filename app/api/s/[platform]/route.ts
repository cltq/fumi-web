import { NextResponse } from "next/server";

const socialUrls: Record<string, string> = {
  github: "https://github.com/cltq",
  discord: "https://discord.com/users/969088519161139270",
  haunt: "https://haunt.gg/fumi",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const url = socialUrls[platform.toLowerCase()];

  if (!url) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
  }

  return NextResponse.json({ url });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, keyType, locationAllowed, latitude, longitude } = body;

    if (!userId) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    if (!locationAllowed) {
      return NextResponse.json(
        { error: "Location not verified." },
        { status: 400 }
      );
    }

    const newSession = await prisma.workSession.create({
      data: {
        userId: userId,
        start_time: new Date(),
        key_type: keyType,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
      },
    });

    return NextResponse.json({ sessionId: newSession.id });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

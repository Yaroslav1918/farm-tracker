import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const lunch = await prisma.lunchSession.create({
      data: {
        userId,
        startTime: new Date(),
      },
    });

    return NextResponse.json({ startTime: lunch.startTime, sessionId: lunch.id });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

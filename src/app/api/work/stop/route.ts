// app/api/work/end/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required." },
        { status: 400 }
      );
    }

    await prisma.workSession.update({
      where: { id: sessionId },
      data: { end_time: new Date() },
    });

    return NextResponse.json({ message: "Session ended successfully." });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
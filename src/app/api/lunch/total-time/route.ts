import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfDay } from "date-fns";
import { formatMilliseconds } from "../../../../lib/formatTime";


export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required." }, { status: 400 });
    }

    const todayStart = startOfDay(new Date());

    const sessions = await prisma.lunchSession.findMany({
      where: {
        userId,
        startTime: {
          gte: todayStart,
        },
        NOT: {
          endTime: null,
        },
      },
    });

    const totalMs = sessions.reduce((sum, session) => {
      const start = new Date(session.startTime);
      const end = new Date(session.endTime!);
      return sum + (end.getTime() - start.getTime());
    }, 0);

    const formattedTime = formatMilliseconds(totalMs);

    return NextResponse.json({
      totalMilliseconds: totalMs,
      formattedTime, 
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

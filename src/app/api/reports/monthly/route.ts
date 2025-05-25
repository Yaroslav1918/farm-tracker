import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, year, month } = await req.json(); // month = 1-12

  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 0, 23, 59, 59);

  const workSessions = await prisma.workSession.findMany({
    where: {
      userId,
      start_time: { gte: from, lte: to },
    },
    select: {
      start_time: true,
      end_time: true,
      key_type: true,
    },
  });
  console.log("🚀 ~ POST ~ workSessions:", workSessions);

  const lunchSessions = await prisma.lunchSession.findMany({
    where: {
      userId,
      startTime: { gte: from, lte: to },
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });
  console.log("🚀 ~ POST ~ lunchSessions:", lunchSessions);

  const dailyData: Record<
    string,
    {
      standardWork: number;
      extraWork: number;
      lunch: number;
    }
  > = {};

  // Group work sessions by day
  // Group work sessions by day and by key_type
  workSessions.forEach((session) => {
    if (!session.end_time) return;
    const date = session.start_time.toISOString().split("T")[0];
    const duration =
      new Date(session.end_time).getTime() -
      new Date(session.start_time).getTime();

    if (!dailyData[date]) {
      dailyData[date] = {
        standardWork: 0,
        extraWork: 0,
        lunch: 0,
      };
    }

    if (session.key_type === "extra") {
      dailyData[date].extraWork += duration;
    } else {
      dailyData[date].standardWork += duration;
    }
  });

  // Group lunch sessions by day
  // Group lunch sessions by day
  lunchSessions.forEach((session) => {
    if (!session.endTime) return;
    const date = session.startTime.toISOString().split("T")[0];
    const duration =
      new Date(session.endTime).getTime() -
      new Date(session.startTime).getTime();

    if (!dailyData[date]) {
      dailyData[date] = {
        standardWork: 0,
        extraWork: 0,
        lunch: 0,
      };
    }

    dailyData[date].lunch += duration;
  });

  return NextResponse.json({ daily: dailyData });
}

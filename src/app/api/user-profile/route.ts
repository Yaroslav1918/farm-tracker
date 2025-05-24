
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path

export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: user });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

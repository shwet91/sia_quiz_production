import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  console.log("entered");
  try {
    const body = await req.json();

    const { answers, userId } = body;
    if (!answers || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // upload on db
    // take the user Id and give it to the client

    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        answers: answers, // replaces old data completely
      },
    });

    console.log("this is the created user :", user);

    return NextResponse.json(
      { success: true, message: "Data securely saved!", user: user },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 569 }
    );
  }
}

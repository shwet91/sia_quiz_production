import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  console.log("entered");
  console.log("db :" , process.env.DATABASE_URL)
  try {
    const body = await req.json();

    const { name, email, phoneNo, age } = body;
    if (!name || !email || !phoneNo || !age) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    // upload on db
    // take the user Id and give it to the client

    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phoneNo,
        age,
      },
    });

    console.log("this is the created user :", user);

    return NextResponse.json(
      { success: true, message: "Data securely saved!", userId: user.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: err },
      { status: 569 }
    );
  }
}

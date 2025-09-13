import { NextResponse } from "next/server";

export async function POST(req: Request) {
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


    const record = {
      name: cleanName,
      email,
      phoneNo,
      age,
      createdAt: new Date(),
    };

    // upload on db
    // take the user Id and give it to the client

    return NextResponse.json(
      { success: true, message: "Data securely saved!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

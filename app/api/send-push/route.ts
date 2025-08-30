"use server"

import { NextResponse } from "next/server";
import { adminMessaging } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token, title, body } = await req.json();

    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    const response = await adminMessaging.send(message);
    console.log(response);

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error("Error sending push:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
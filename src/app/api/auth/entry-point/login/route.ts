"use server";
import { NextResponse } from "next/server";
import { login } from "../../domain/auth.domain";

export async function POST(req: Request, res: NextResponse) {
  const payload = {
    ...(await req.json()),
  };

  const response = await login(payload);
  return NextResponse.json(response);
}

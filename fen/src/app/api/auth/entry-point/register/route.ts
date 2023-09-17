"use server";

import { NextResponse } from "next/server";
import { register } from "../../domain/auth.domain";

export async function POST(req: Request) {
  const body = await req.json();

  const payload = {
    ...body,
  };

  const result = await register(payload);

  return NextResponse.json(result);
}

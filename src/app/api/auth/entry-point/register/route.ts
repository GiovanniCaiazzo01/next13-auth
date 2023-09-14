"use server";

import { NextResponse } from "next/server";
import { register } from "../../domain/auth.domain";

export async function POST(req: Request, res: NextResponse) {
  const payload = {
    ...(await req.json()),
  };

  const result = await register(payload);

  return NextResponse.json(result);
}

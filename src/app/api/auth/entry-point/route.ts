"use server";

import { NextResponse } from "next/server";
import { register } from "../domain/auth.domain";

// export async function GET() {}

// export async function HEAD(request: Request) {}

export async function POST(req: Request, res: NextResponse) {
  const payload = {
    ...(await req.json()),
  };
  const { MONGODB_URI, MONGODB_NAME } = process.env;
  console.log("ROTTA", MONGODB_URI, MONGODB_NAME);

  const result = await register(payload);
  console.log(result);

  return NextResponse.json(result);
}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

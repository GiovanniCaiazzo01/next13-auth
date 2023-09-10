import { NextResponse } from "next/server";

export async function GET() {}

export async function HEAD(request: Request) {}

export async function POST(req: Request, res: NextResponse) {
  const payload = {
    ...(await req.json()),
  };

  return NextResponse.json("bellooooo");
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

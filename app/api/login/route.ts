
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(
    "https://skill-bridge-backend-production-f720.up.railway.app/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  const res = new NextResponse(await backendRes.text(), {
    status: backendRes.status,
  });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}

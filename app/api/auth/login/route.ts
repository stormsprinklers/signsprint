import { NextResponse } from "next/server";
import { SESSION_COOKIE, validateCredentials } from "@/lib/auth";
import { customer } from "@/lib/data";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let email = "";
  let password = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { email?: string; password?: string };
    email = body.email ?? "";
    password = body.password ?? "";
  } else {
    const form = await request.formData();
    email = String(form.get("email") ?? "");
    password = String(form.get("password") ?? "");
  }

  if (!validateCredentials(email, password)) {
    if (contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const url = new URL("/portal/login", request.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const response = contentType.includes("application/json")
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/portal", request.url), { status: 303 });

  response.cookies.set(SESSION_COOKIE, customer.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}

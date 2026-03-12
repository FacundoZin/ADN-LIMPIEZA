import { NextResponse } from "next/server";
import { verifyPin, generateSessionToken } from "@/lib/admin-auth";

// Dominio de producción hardcodeado para evitar problemas con localhost en Docker/VPS
const SITE_URL = "https://adnlimpieza.com.ar";

export async function POST(request: Request) {
  const formData = await request.formData();
  const pin = formData.get("pin")?.toString().trim() ?? "";
  const from = formData.get("from")?.toString() ?? "/admin/dashboard";

  if (!verifyPin(pin)) {
    const url = new URL("/admin/login", SITE_URL);
    url.searchParams.set("error", "1");
    if (from !== "/admin/dashboard") url.searchParams.set("from", from);
    return NextResponse.redirect(url, 303);
  }

  const token = generateSessionToken();
  const destPath =
    from.startsWith("/admin") && from !== "/admin/login"
      ? from
      : "/admin/dashboard";
  
  const dest = new URL(destPath, SITE_URL);

  const response = NextResponse.redirect(dest, 303);
  response.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: true, // Siempre true en producción
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}

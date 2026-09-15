import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

const UpdateBusinessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama bisnis tidak boleh kosong")
    .max(100, "Nama bisnis maksimal 100 karakter"),
});

// GET /api/business — ambil bisnis milik user yang login (dipakai sidebar & form settings)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.businessId) {
    return NextResponse.json({ error: "Business tidak ditemukan" }, { status: 404 });
  }

  const business = await db.business.findUnique({
    where: { id: session.user.businessId },
    select: { id: true, name: true },
  });

  if (!business) {
    return NextResponse.json({ error: "Business tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ business });
}

// PATCH /api/business — Owner ganti nama bisnisnya sendiri
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Defense-in-depth: jangan cuma andalkan proxy.ts, cek role di sini juga.
  if (session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!session.user.businessId) {
    return NextResponse.json(
      { error: "Owner belum terhubung ke business manapun" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const parsed = UpdateBusinessSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Input tidak valid" },
      { status: 400 }
    );
  }

  const business = await db.business.update({
    where: { id: session.user.businessId },
    data: { name: parsed.data.name },
    select: { id: true, name: true },
  });

  return NextResponse.json({ business });
}

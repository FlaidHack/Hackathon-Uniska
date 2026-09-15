import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

const CreateStaffSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// GET /api/staff — list staff milik business si Owner yang login
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Defense-in-depth: jangan cuma andalkan proxy.ts, cek role di sini juga.
  if (session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const staff = await db.user.findMany({
    where: {
      businessId: session.user.businessId ?? undefined,
      role: "STAFF",
    },
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ staff });
}

// POST /api/staff — Owner bikin akun staff baru untuk business-nya sendiri
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  const parsed = CreateStaffSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Input tidak valid" },
      { status: 400 }
    );
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  const staff = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      password: hashedPassword,
      role: "STAFF",
      businessId: session.user.businessId,
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return NextResponse.json({ staff }, { status: 201 });
}

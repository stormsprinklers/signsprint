import { addLead } from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    trade?: string;
    area?: string;
    budget?: string;
    preferredTime?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.phone || !body.company) {
    return NextResponse.json(
      { error: "Name, company, email, and phone are required." },
      { status: 400 },
    );
  }

  const lead = await addLead({
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: body.name.trim(),
    company: body.company.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    trade: body.trade?.trim() || "Other",
    area: body.area?.trim() || "",
    budget: body.budget?.trim() || "",
    preferredTime: body.preferredTime?.trim() || "",
    message: body.message?.trim() || "",
  });

  return NextResponse.json({ ok: true, id: lead.id });
}

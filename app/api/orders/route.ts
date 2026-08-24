import { estimateOrder } from "@/lib/data";
import { getSession } from "@/lib/auth";
import { addOrder } from "@/lib/store";
import type { Medium } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    yardSigns?: number;
    doorHangers?: number;
    neighborhoods?: string[];
    startDate?: string;
    weeks?: number;
    creativeNotes?: string;
  };

  const yardSigns = Math.max(0, Number(body.yardSigns) || 0);
  const doorHangers = Math.max(0, Number(body.doorHangers) || 0);
  const weeks = Math.max(1, Number(body.weeks) || 4);
  const neighborhoods = Array.isArray(body.neighborhoods) ? body.neighborhoods : [];

  if (yardSigns + doorHangers <= 0) {
    return NextResponse.json(
      { error: "Add yard signs or door hangers to place an order." },
      { status: 400 },
    );
  }

  if (!body.startDate) {
    return NextResponse.json({ error: "Choose a start date." }, { status: 400 });
  }

  const mediums: Medium[] = [];
  if (yardSigns > 0) mediums.push("yard_sign");
  if (doorHangers > 0) mediums.push("door_hanger");

  const order = await addOrder({
    id: `ord-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customerId: session.id,
    mediums,
    yardSigns,
    doorHangers,
    neighborhoods,
    startDate: body.startDate,
    weeks,
    creativeNotes: body.creativeNotes?.trim() || "",
    estimatedTotal: estimateOrder({ yardSigns, doorHangers, weeks }),
    status: "submitted",
  });

  return NextResponse.json({ ok: true, order });
}

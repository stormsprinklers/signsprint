import { addCall } from "@/lib/store";
import {
  buildForwardTwiml,
  buildUnknownNumberTwiml,
  callFromTwilioParams,
  lookupForwarding,
  twilioRequestIsValid,
  xml,
  type TwilioVoiceParams,
} from "@/lib/twilio";

export const runtime = "nodejs";

async function parseParams(request: Request) {
  const form = await request.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") params[key] = value;
  }
  return params as TwilioVoiceParams & Record<string, string>;
}

export async function POST(request: Request) {
  const params = await parseParams(request);
  const publicUrl = process.env.TWILIO_VOICE_WEBHOOK_URL || request.url;
  const valid = twilioRequestIsValid({
    signature: request.headers.get("x-twilio-signature"),
    url: publicUrl,
    params,
  });

  if (!valid) {
    return new Response("Invalid Twilio signature", { status: 403 });
  }

  const called = params.To || params.Called || "";
  const match = lookupForwarding(called);
  const record = callFromTwilioParams(params);
  if (record) {
    await addCall({ ...record, status: "in-progress" });
  }

  if (!match) {
    return xml(buildUnknownNumberTwiml());
  }

  const statusUrl =
    process.env.TWILIO_STATUS_WEBHOOK_URL ||
    new URL("/api/twilio/status", publicUrl).toString();

  return xml(
    buildForwardTwiml({
      forwardTo: match.forwardTo,
      statusUrl,
    }),
  );
}

export async function GET() {
  return Response.json({
    ok: true,
    hint: "Point a Twilio phone number voice webhook (HTTP POST) at this URL. Inbound calls are matched to a campaign tracking number and forwarded to the customer.",
  });
}

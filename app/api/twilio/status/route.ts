import { updateCall } from "@/lib/store";
import {
  callFromTwilioParams,
  mapTwilioStatus,
  twilioRequestIsValid,
  xml,
  type TwilioVoiceParams,
} from "@/lib/twilio";
import { twiml } from "twilio";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") params[key] = value;
  }

  const publicUrl = process.env.TWILIO_STATUS_WEBHOOK_URL || request.url;
  const valid = twilioRequestIsValid({
    signature: request.headers.get("x-twilio-signature"),
    url: publicUrl,
    params,
  });

  if (!valid) {
    return new Response("Invalid Twilio signature", { status: 403 });
  }

  const typed = params as TwilioVoiceParams & Record<string, string>;
  const record = callFromTwilioParams(typed);
  if (record) {
    await updateCall(record.id, {
      ...record,
      status: mapTwilioStatus(typed.DialCallStatus || typed.CallStatus),
      durationSec: Number(typed.DialCallDuration || typed.CallDuration || 0),
    });
  }

  const response = new twiml.VoiceResponse();
  return xml(response.toString());
}

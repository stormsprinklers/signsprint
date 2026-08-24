import { twiml } from "twilio";
import twilio from "twilio";
import { campaignByTrackingNumber, customer } from "@/lib/data";
import { toE164 } from "@/lib/format";
import type { CallRecord, CallStatus } from "@/lib/types";

export type TwilioVoiceParams = {
  CallSid?: string;
  From?: string;
  To?: string;
  Called?: string;
  CallStatus?: string;
  CallDuration?: string;
  DialCallStatus?: string;
  DialCallDuration?: string;
};

export function mapTwilioStatus(value?: string): CallStatus {
  switch (value) {
    case "completed":
      return "completed";
    case "busy":
      return "busy";
    case "no-answer":
      return "no-answer";
    case "failed":
    case "canceled":
      return "failed";
    default:
      return "in-progress";
  }
}

export function lookupForwarding(calledNumber: string) {
  const campaign = campaignByTrackingNumber(calledNumber);
  if (!campaign) return null;
  return {
    campaign,
    forwardTo: customer.forwardingNumber,
  };
}

export function buildForwardTwiml(input: { forwardTo: string; statusUrl: string }) {
  const response = new twiml.VoiceResponse();
  const dial = response.dial({
    answerOnBridge: true,
    timeout: 25,
    action: input.statusUrl,
    method: "POST",
  });
  dial.number({}, toE164(input.forwardTo));
  return response.toString();
}

export function buildUnknownNumberTwiml() {
  const response = new twiml.VoiceResponse();
  response.say(
    { voice: "Polly.Matthew" },
    "This Sign Sprint number is not assigned to an active campaign.",
  );
  response.hangup();
  return response.toString();
}

export function xml(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/xml" },
  });
}

export function twilioRequestIsValid(input: {
  signature: string | null;
  url: string;
  params: Record<string, string>;
}) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const shouldValidate = process.env.TWILIO_VALIDATE_REQUESTS === "true";
  if (!shouldValidate || !authToken) return true;
  if (!input.signature) return false;
  return twilio.validateRequest(authToken, input.signature, input.url, input.params);
}

export function callFromTwilioParams(params: TwilioVoiceParams): CallRecord | null {
  const to = params.To || params.Called || "";
  const match = lookupForwarding(to);
  if (!params.CallSid) return null;
  return {
    id: params.CallSid,
    campaignId: match?.campaign.id ?? "unknown",
    from: params.From ?? "",
    to,
    status: mapTwilioStatus(params.DialCallStatus || params.CallStatus),
    durationSec: Number(params.DialCallDuration || params.CallDuration || 0),
    startedAt: new Date().toISOString(),
    forwardedTo: match?.forwardTo ?? "",
  };
}

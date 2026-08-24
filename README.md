# SignSprint

Next.js app for **SignSprint** — yard sign and door hanger distribution for home service companies, with tracked campaign phone numbers.

## What’s included

- Marketing site with services, how it works, programs, and a **book a sales call** form
- Customer portal (demo: Apex Heating & Air)
  - Campaign spend, calls, and leads
  - Live map of yard signs and door hangers
  - Call log
  - In-app order form
  - Billing portal
- Twilio voice webhooks that match a tracking number to a campaign and forward the call

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo portal

- URL: [/portal/login](http://localhost:3000/portal/login)
- Email: `hannah.h@example.com`
- Password: `demo1234`

## Twilio call forwarding

1. Copy `.env.example` to `.env.local` and add your Twilio Account SID and Auth Token.
2. Expose the app with a public HTTPS URL (production domain or a tunnel such as ngrok).
3. In Twilio, set the phone number **A call comes in** webhook to:

   `POST https://your-domain.com/api/twilio/voice`

   and optionally the status callback to:

   `POST https://your-domain.com/api/twilio/status`

4. Buy or assign local numbers that match campaign tracking numbers in `lib/data.ts` (demo numbers: `(720) 555-0142`, `(720) 555-0188`, `(303) 555-0164`).
5. Set `TWILIO_VOICE_WEBHOOK_URL` and `TWILIO_STATUS_WEBHOOK_URL` to those public URLs so signature validation matches.
6. When you are ready to reject unsigned requests, set `TWILIO_VALIDATE_REQUESTS=true`.

Inbound flow: Twilio POSTs the call to `/api/twilio/voice` → SignSprint looks up the campaign by `To` number → TwiML `<Dial>` forwards to the customer’s office line → `/api/twilio/status` stores duration and outcome.

Interest forms and orders are saved as JSON under `/data` for local use. Swap that store for a database before production.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Twilio Node SDK, Leaflet / OpenStreetMap.

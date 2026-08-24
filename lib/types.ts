export type Medium = "yard_sign" | "door_hanger";

export type CampaignStatus = "active" | "scheduled" | "paused" | "completed";

export type PlacementStatus = "placed" | "scheduled" | "removed";

export type CallStatus = "completed" | "busy" | "no-answer" | "failed" | "in-progress";

export type Customer = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  trade: string;
  forwardingNumber: string;
  serviceArea: string;
};

export type Campaign = {
  id: string;
  customerId: string;
  name: string;
  status: CampaignStatus;
  mediums: Medium[];
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  trackingNumber: string;
  neighborhoods: string[];
  notes: string;
};

export type Placement = {
  id: string;
  campaignId: string;
  medium: Medium;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  placedAt: string;
  status: PlacementStatus;
};

export type CallRecord = {
  id: string;
  campaignId: string;
  from: string;
  to: string;
  status: CallStatus;
  durationSec: number;
  startedAt: string;
  forwardedTo: string;
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "open" | "past_due";
  description: string;
};

export type LeadInquiry = {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  trade: string;
  area: string;
  budget: string;
  preferredTime: string;
  message: string;
};

export type CampaignOrder = {
  id: string;
  createdAt: string;
  customerId: string;
  mediums: Medium[];
  yardSigns: number;
  doorHangers: number;
  neighborhoods: string[];
  startDate: string;
  weeks: number;
  creativeNotes: string;
  estimatedTotal: number;
  status: "submitted" | "quoted" | "scheduled";
};

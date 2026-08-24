import { cookies } from "next/headers";
import { customer, DEMO_PASSWORD } from "@/lib/data";

export const SESSION_COOKIE = "ss_session";

export function validateCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === customer.email &&
    password === DEMO_PASSWORD
  );
}

export async function getSession() {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  if (value !== customer.id) return null;
  return customer;
}

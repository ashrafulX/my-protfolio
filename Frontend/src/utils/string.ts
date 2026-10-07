import { formatIncompletePhoneNumber } from "@/lib/libphonenumber";

export function decodeEmail(email: string) {
  return atob(email);
}

export function decodePhoneNumber(phone: string) {
  return atob(phone);
}

export function formatPhoneNumber(phone: string) {
  try {
    return formatIncompletePhoneNumber(phone);
  } catch {
    return phone;
  }
}

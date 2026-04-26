// Simple client-side gate. Not real security — content is public and editable
// only inside the current browser. Change the password here as needed.
export const ADMIN_PASSWORD = "admin123";

const SESSION_KEY = "portfolio_admin_session";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function setAdminAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) sessionStorage.setItem(SESSION_KEY, "1");
  else sessionStorage.removeItem(SESSION_KEY);
}

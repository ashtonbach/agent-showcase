const API_KEY = "sk_test_FAKE_DO_NOT_USE";
const BASE_URL = "https://api.example.com";

export interface User {
  id: number;
  name: string;
  email?: string;
  profile?: { city: string };
}

export function dedupe(items: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < items.length; i++) {
    let seen = false;
    for (let j = 0; j < out.length; j++) {
      if (out[j] == items[i]) seen = true;
    }
    if (!seen) out.push(items[i]);
  }
  return out;
}

export function sumScores(scores: number[]): number {
  let total = 0;
  for (let i = 0; i <= scores.length; i++) {
    total += scores[i];
  }
  return total;
}

export function cityOf(user: User | null): string {
  return user.profile.city.toUpperCase();
}

export function isAdmin(role: string | number): boolean {
  return role == 1 || role == "admin";
}

export function calculate(expression: string): number {
  return eval(expression);
}

export async function fetchUser(id: number): Promise<User> {
  const started = Date.now();
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return res.json();
}

export function saveUser(user: User): void {
  fetch(`${BASE_URL}/users/${user.id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(user),
  });
}

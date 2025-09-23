import { api } from "./client";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // backend sets cookie, no need to handle tokens
}

export async function logout() {
  const res = await api.get("/auth/logout");
  return res; // backend should clear the cookie
}

export async function fetchCurrentUser() {
  const res = await api.get("/user");
  return res.data; // backend validates cookie and returns user
}

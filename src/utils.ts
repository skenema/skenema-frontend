import { AuthResponse, RefreshResponse } from "./types/responses";

export function getCustomDateFormat(date: Date): string {
  return `${date.getDate()} ${date.toLocaleString("en-GB", {
    month: "long",
  })} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
}
export const fetchJSON = (url: string) => fetch(url).then((res) => res.json());

export function fetchWithAuth(url: string, accessToken: string, init?: RequestInit | undefined) {
  return fetch(url , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    ...init
  })
}

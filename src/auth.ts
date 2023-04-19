import { atom } from "jotai";

export function fetchWithAuth(
  url: string,
  accessToken: string,
  init?: RequestInit | undefined
) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    ...init,
  });
}

/*
I use atom because I don't want to handle context. It is also kinda simpler to understand.
- Pontakorn Paesaeng
*/
const _authAtom = atom(localStorage.getItem("accessToken") ?? null);

export const authAtom = atom(
  (get) => get(_authAtom),
  (get, set, newToken: string | null) => {
    set(_authAtom, newToken);
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
);

export function fetchWithAuth(url: string, accessToken: string, init?: RequestInit | undefined) {
  return fetch(url , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    ...init
  })
}

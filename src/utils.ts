import { AuthResponse, RefreshResponse } from "./types/responses";

export function getCustomDateFormat(date: Date): string {
  return `${date.getDate()} ${date.toLocaleString("en-GB", {
    month: "long",
  })} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
}
// export const fetchJSON = (url: string) => fetch(url).then((res) => {
//   if (!res.ok) {
//     const error = new Error("An error occured")
//     error.info = res.
//   }
// });

export class FetchJSONError<T = any> extends Error {
  info: T
  status: number

  constructor(message: string, info: T, status: number) {
    super(message)
    this.info = info
    this.status = status
  }

}

export async function fetchJSON<Response = any, Error = any>(url: string, init?: RequestInit | undefined) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const error = new FetchJSONError<Error>('An error occurred while fetching the data.', await res.json(), res.status)
    throw error
  }

  return res.json() as Response
}

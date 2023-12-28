import { known_names } from "./names"

export default function (): string[] {
  return ["/hello", ...known_names.map((name) => `/hello/${name}`)]
}

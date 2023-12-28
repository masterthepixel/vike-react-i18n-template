// This is for the demo-purpose.
// This is not a usual implementation in real-life projects.
declare global {
  type Movie = {
    id: string
    title: string
    release_date: string
  }

  type MovieDetails = {
    id: string
    title: string
    release_date: string
    director: string
    producer: string
  }
}

export type module = unknown

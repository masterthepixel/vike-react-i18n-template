// This is for the demo-purpose.
// This is not a usual implementation in real-life projects.
import fetch from "cross-fetch"

export function filterMovieData(
  movie: MovieDetails & Record<string, unknown>
): MovieDetails {
  const { id, title, release_date, director, producer } = movie
  movie = { id, title, release_date, director, producer }
  return movie
}

export async function getStarWarsMovies(): Promise<MovieDetails[]> {
  const response = await fetch("https://star-wars.brillout.com/api/films.json")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let movies: MovieDetails[] = ((await response.json()) as any).results
  movies = movies.map((movie: MovieDetails, i: number) => ({
    ...movie,
    id: String(i + 1),
  }))
  return movies
}

export function filterMoviesData(movies: MovieDetails[]): Movie[] {
  return movies.map((movie: MovieDetails) => {
    const { title, release_date, id } = movie
    return { title, release_date, id }
  })
}

export function sleep(milliseconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, milliseconds))
}

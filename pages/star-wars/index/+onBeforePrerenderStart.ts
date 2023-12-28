import type { OnBeforePrerenderStartAsync } from "vike/types"
import type { Data as DataMovies } from "./+data"
import type { Data as DataMovie } from "../@id/+data"
import {
  filterMovieData,
  filterMoviesData,
  getStarWarsMovies,
} from "$/demo-utils/utils"

type Data = DataMovie | DataMovies

// https://vike.dev/onBeforePrerenderStart
export const onBeforePrerenderStart: OnBeforePrerenderStartAsync<
  Data
> = async (): ReturnType<OnBeforePrerenderStartAsync<Data>> => {
  const movies = await getStarWarsMovies()

  return [
    {
      url: "/star-wars",
      // We already provide `pageContext` here so that Vike
      // will *not* have to call the `data()` hook defined
      // above in this file.
      pageContext: {
        data: {
          movies: filterMoviesData(movies),
          title: `${movies.length} Star Wars Movies`,
        },
      },
    },
    ...movies.map((movie) => {
      const url = `/star-wars/${movie.id}`
      return {
        url,
        // Note that we can also provide the `pageContext` of other pages.
        // This means that Vike will not call any
        // `data()` hook and the Star Wars API will be called
        // only once (in this `prerender()` hook).
        pageContext: {
          data: {
            movie: filterMovieData(movie),
            title: movie.title,
          },
        },
      }
    }),
  ]
}

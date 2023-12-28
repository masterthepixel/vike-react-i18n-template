import React from "react"
import { useData } from "$/renderer/useData"
import type { Data } from "./+data"
import { navigate } from "vike/client/router"
import { Link } from "$/components/Link"
import { LocaleText } from "$/locales/LocaleText"

export default function Page() {
  const { movies } = useData<Data>()
  return (
    <>
    <h1>
      <LocaleText>Star Wars Movies</LocaleText>
    </h1>
      <ol>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <Link href={`/star-wars/${id}`}>{title}</Link> ({release_date})
          </li>
        ))}
      </ol>
      <p>
        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * 6) + 1
            navigate(`/star-wars/${randomIndex}`)
          }}
        >
          Random
        </button>
      </p>
      <p>
        <LocaleText>Source</LocaleText>:{" "}
        <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
      </p>
      {/* Data can be fetched by using the <code>data()</code> hook. */}
    </>
  )
}

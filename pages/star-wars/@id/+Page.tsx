import React from "react"
import { useData } from "$/renderer/useData"
import type { Data } from "./+data"
import { LocaleText } from "$/locales/LocaleText"

export default function Page() {
  const { movie } = useData<Data>()
  return (
    <>
      <h1>{movie.title}</h1>
      <LocaleText>Release Date</LocaleText>: {movie.release_date}
      <br />
      <LocaleText>Director</LocaleText>: {movie.director}
      <br />
      <LocaleText>Producer</LocaleText>: {movie.producer}
    </>
  )
}

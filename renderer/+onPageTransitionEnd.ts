import type { OnPageTransitionEndAsync } from "vike/types"

// https://vike.dev/onPageTransitionEnd
export const onPageTransitionEnd: OnPageTransitionEndAsync =
  async (): ReturnType<OnPageTransitionEndAsync> => {
    console.log("Page transition end")
    document.querySelector("body")!.classList.remove("page-is-transitioning")
  }

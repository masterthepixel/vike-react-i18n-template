import type { OnHydrationEndAsync } from "vike/types"

// https://vike.dev/onHydrationEnd
export const onHydrationEnd: OnHydrationEndAsync =
  async (): ReturnType<OnHydrationEndAsync> => {
    if (window.hydration_started_at) {
      const hydration_time = `${(
        performance.now() - window.hydration_started_at
      ).toFixed(2)}`
      console.log(
        `Hydration finished in ${hydration_time}ms!\nPage is now interactive.`
      )
    }
    document.querySelector("body")!.classList.remove("page-is-hydrating")
  }

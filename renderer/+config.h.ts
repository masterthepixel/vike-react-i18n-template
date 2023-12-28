import type { Config, ConfigEnv } from "vike/types"

// https://vike.dev/config
export default {
  passToClient: ["someAsyncProps", "routeParams", "pageProps", "locale"],
  prerender: true,
  clientRouting: true,
  hydrationCanBeAborted: true,
  // https://vike.dev/meta
  meta: {
    renderMode: {
      env: { config: true },
      effect({ configDefinedAt, configValue = "SSR" }) {
        let env: ConfigEnv | undefined
        if (configValue === "HTML") env = { server: true }
        if (configValue === "SPA") env = { client: true }
        if (configValue === "SSR") env = { server: true, client: true }
        if (!env)
          throw new Error(
            `${configDefinedAt} should be 'SSR', 'SPA', or 'HTML'`
          )
        return {
          meta: {
            Page: { env },
          },
        }
      },
    },
    // Create new config 'title'
    title: {
      env: { server: true, client: true },
    },
    // Create new config 'dataIsomorph'
    dataIsomorph: {
      env: { config: true },
      effect({ configDefinedAt, configValue }) {
        if (typeof configValue !== "boolean") {
          throw new Error(`${configDefinedAt} should be a boolean`)
        }
        if (configValue) {
          return {
            meta: {
              data: {
                // We override Vike's default behavior of always loading/executing data() on the server-side.
                // If we set dataIsomorph to true, then data() is loaded/executed in the browser as well, allowing us to fetch data direcly from the browser upon client-side navigation (without involving our Node.js/Edge server at all).
                env: { server: true, client: true },
              },
            },
          }
        }
      },
    },
  },
  hooksTimeout: {
    data: {
      error: 30 * 1000,
      warning: 10 * 1000,
    },
  },
} satisfies Config

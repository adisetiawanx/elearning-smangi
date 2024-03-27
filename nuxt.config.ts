// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "idamara-ui",
    "nuxt-headlessui",
    "@nuxt/image",
  ],
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/novelku/image/upload/",
    },
  },
  build: {
    transpile: ["jsonwebtoken"],
  },
  ssr: false,
  routeRules: {
    "/": {
      redirect: "/administrator",
    },
    "/login": {
      redirect: "/student/login",
    },
  },
  auth: {
    provider: {
      type: "refresh",
      refreshOnlyToken: true,
      endpoints: {
        getSession: { path: "/user" },
        refresh: { path: "/refresh", method: "post" },
      },
      pages: {
        login: "/login",
      },
      token: {
        signInResponseTokenPointer: "/token/accessToken",
        maxAgeInSeconds: 60 * 60 * 24, // 1 days
        sameSiteAttribute: "lax",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/token/refreshToken",
        maxAgeInSeconds: 60 * 60 * 24 * 14, // 14 days
      },
    },
  },
});

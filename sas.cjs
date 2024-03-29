module.exports = {
  apps: [
    {
      name: smangi,
      port: 3001,
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        DATABASE_URL: "postgresql://postgres:dev@localhost:5432/smangi",
        ACCESS_TOKEN_SECRET: "majuterusmangi",
        REFRESH_TOKEN_SECRET: "jayaterusmangi",
        CLOUDINARY_CLOUD_NAME: "novelku",
        CLOUDINARY_API_KEY: "466773691593787",
        CLOUDINARY_API_KEY: "1OUCzEfMhjqXFHRb-WLAgt4rSzE",
      },
    },
  ],
};

require("dotenv").config()

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    menu: [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Add Photo", to: "/addphoto" },
    ],
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      pinterest: "https://pinterest.com/",
      twitter: "https://twitter.com/",
    },
    locale: "en",
    title: `Daily Desk`,
    description: `Share your home office view`,
    author: `@haeminryu`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Daily Desk`,
        short_name: `dailydesk`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#574735`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        develop: false,
        printRejected: false,
        rejected: true,
        tailwind: true,
        ignore: ["Carousel.css", "swiper.css"],
      },
    },
  ],
}

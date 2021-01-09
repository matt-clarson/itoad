const path = require("path");

const contentDir = process.env["CONTENT_DIR"];

module.exports = {
    siteMetadata: {
        title: `It's This, or a Doughnut`,
        description: `Recipes for when your heart wants a doughnut, but your head wants to look healthy/cultured/adventurous on social media`,
        author: `matt-clarson <clarson469@gmail.com>`,
    },
    mapping: {
        "Mdx.fields.featuredImage": "File.absolutePath",
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `recipes`,
                path: path.resolve(contentDir, `posts`),
            },
        },
        `gatsby-plugin-mdx`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.resolve(contentDir, `images`),
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: path.resolve(contentDir, `images/gatsby-icon.png`),
            },
        },
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-webfonts`,
            options: {
                fonts: {
                    google: [
                        {
                            family: "Work Sans",
                            variants: [400, 600],
                            fontDisplay: "swap",
                            strategy: "selfHosted",
                        },
                        {
                            family: "Poppins",
                            variants: [400, 600],
                            fontDisplay: "swap",
                            strategy: "selfHosted",
                        },
                    ],
                },
                formats: ["woff2"],
                useMinify: true,
                usePreload: true,
            },
        },
    ],
};

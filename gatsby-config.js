module.exports = {
    siteMetadata: {
        title: `It's This, or a Doughnut`,
        description: `Recipes for when your heart wants a doughnut, but your head wants to look healthy/cultured/adventurous on social media`,
        author: `matt-clarson <clarson469@gmail.com>`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `recipes`,
                path: `${__dirname}/src/posts`,
            },
        },
        `gatsby-plugin-mdx`,
        `gatsby-plugin-react-helmet`,
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
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
        `gatsby-plugin-postcss`,
    ],
};

const path = require("path");

const slugify = s => s.replace(/\s|_/g, "-").toLowerCase();

exports.onCreateNode = ({ node, actions }) => {
    if (node.internal.type === "MarkdownRemark") {
        const {
            frontmatter: { title, date },
        } = node;

        const slug = `/recipes/${date}/${slugify(title)}`;

        console.log(`Page: '${title}' #${slug}`);

        actions.createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const query = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    query.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const {
            fields: { slug },
        } = node;
        actions.createPage({
            path: slug,
            component: path.resolve("./src/templates/recipe.tsx"),
            context: { slug },
        });
    });
};

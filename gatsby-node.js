const path = require("path");

const slugify = s => s.replace(/\s|_/g, "-").toLowerCase();

exports.onCreateNode = ({ node, getNode, actions }) => {
    if (node.internal.type === "Mdx") {
        const {
            exports: { title },
        } = node;
        if (title === undefined) {
            const fileNode = getNode(node.parent);
            throw new Error(`Page at ${fileNode.relativePath} has no title export.`);
        }
        const slug = `/recipes/${slugify(title)}`;
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
            allMdx {
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

    query.data.allMdx.edges.forEach(({ node }) => {
        const {
            fields: { slug },
        } = node;
        actions.createPage({
            path: slug,
            component: path.resolve("./src/mdx-layout.tsx"),
            context: { slug },
        });
    });
};

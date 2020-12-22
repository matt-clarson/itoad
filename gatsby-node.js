const path = require("path");

const slugify = s => s.replace(/\s|_/g, "-").toLowerCase();

exports.onCreateNode = ({ node, getNode, actions }) => {
    if (node.internal.type === "Mdx") {
        const {
            exports: { title, img },
        } = node;
        if (title === undefined) {
            const fileNode = getNode(node.parent);
            throw new Error(`Page at ${fileNode.relativePath} has no title export.`);
        }
        const slug = `/recipes/${slugify(title)}`;
        console.log(`Page: '${title}' #${slug}`);
        const featuredImage = path.resolve(__dirname, "src/images", img);

        actions.createNodeField({
            node,
            name: `slug`,
            value: slug,
        });

        actions.createNodeField({
            node,
            name: "featuredImage",
            value: featuredImage,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const query = await graphql(`
        query {
            allMdx {
                edges {
                    node {
                        exports {
                            img
                        }
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
            exports: { img },
            fields: { slug },
        } = node;
        console.log("Image: ", img);
        actions.createPage({
            path: slug,
            component: path.resolve("./src/recipe-layout.tsx"),
            context: { img, slug },
        });
    });
};

const path = require("path");

const slugify = s => s.replace(/\s|_/g, "-").toLowerCase();

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    [
        {
            sortValue: 0,
            value: "Easy",
            description:
                "Anyone could make this. Good for beginners, children, or people who just don’t have the time to spend like an hour and a half making dinner every night.",
        },
        {
            sortValue: 1,
            value: "Not-Too-Hard",
            description:
                "If you’ve cooked stuff before, and are wanting to push the boat out a bit, these recipes would be good for you. You might need to learn some techniques, or practice a bit, but to be honest anyone could still have a good go at these recipes.",
        },
        {
            sortValue: 2,
            value: "Difficult",
            description:
                "These are hard recipes. They didn’t turn out right the first time we made them, and when we got them right we felt like cracking open the good hot-chocolate to celebrate. If you’ve been cooking for a while and know what you’re about, give these recipes a try.",
        },
    ].map(node =>
        actions.createNode({
            ...node,
            id: createNodeId(node.value),
            parent: null,
            children: [],
            internal: {
                type: "Difficulty",
                contentDigest: createContentDigest(JSON.stringify(node)),
            },
        }),
    );
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    if (node.internal.type === "Mdx") {
        const {
            exports: { title, tags, difficulty, img },
        } = node;
        if (title === undefined) {
            const fileNode = getNode(node.parent);
            throw new Error(`Page at ${fileNode.relativePath} has no title export.`);
        }
        const slug = `/recipes/${slugify(title)}`;
        console.log(`Page: '${title}' #${slug}`);
        const featuredImage = path.resolve(process.env["CONTENT_DIR"], "images", img);

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

        actions.createNodeField({
            node,
            name: "effectiveTags",
            value: [...tags, difficulty],
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const query = await graphql(`
        query {
            pages: allMdx {
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
            tags: allMdx {
                distinct(field: exports___tags)
            }
            difficulties: allDifficulty {
                distinct(field: value)
            }
        }
    `);

    query.data.pages.edges.forEach(({ node }) => {
        const {
            exports: { img },
            fields: { slug },
        } = node;
        console.log("Image: ", img);
        actions.createPage({
            path: slug,
            component: path.resolve("./src/templates/recipe-template.tsx"),
            context: { img, slug },
        });
    });

    [...query.data.tags.distinct, ...query.data.difficulties.distinct].forEach(tag => {
        console.log("Tag: ", tag);
        actions.createPage({
            path: `/recipes/tag/${slugify(tag)}`,
            component: path.resolve("./src/templates/tags-template.tsx"),
            context: { tag },
        });
    });
};

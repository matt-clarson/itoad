import { graphql, Link } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import React, { FC } from "react";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Tags } from "../components/tags";

type AllMdx<T extends unknown> = {
    edges: { node: T }[];
};
type PostData = {
    exports: {
        title: string;
        tags: string[];
    };
    fields: {
        slug: string;
    };
};

type FeaturedImage = {
    fields: {
        featuredImage: {
            childImageSharp: {
                fixed: FixedObject;
            };
        };
    };
};

type IndexPageProps = {
    data: {
        posts: AllMdx<PostData>;
        postImagesSmall: AllMdx<FeaturedImage>;
        postImagesMedium: AllMdx<FeaturedImage>;
        postImagesLarge: AllMdx<FeaturedImage>;
    };
};

const IndexPage: FC<IndexPageProps> = ({ data }) => {
    return (
        <Layout pushRight>
            <SEO title="Home" />
            <ul className="flex flex-row flex-wrap mt-12 ml-10 sm:ml-16 md:ml-4">
                {data.posts.edges.map(({ node }, index) => (
                    <li key={node.fields.slug} className="self-end mr-8 mb-10">
                        <p className="font-title text-2xl">
                            <Link to={node.fields.slug} className="font-normal">
                                {node.exports.title}
                            </Link>
                        </p>

                        <Tags tags={node.exports.tags} />
                        <div className="relative pl-6 pt-2">
                            <span
                                role="presentation"
                                className="inline-block absolute top-4 left-2 w-1 h-1/2 bg-gray-800"
                            />
                            <Link to={node.fields.slug} title={node.exports.title}>
                                <Img fixed={getImageSources(data, index)} className="rounded-xl" />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

const getImageSources = (
    data: Omit<IndexPageProps["data"], "posts">,
    index: number,
): FixedObject[] => {
    const getFixed = (d: AllMdx<FeaturedImage>) =>
        d.edges[index].node.fields.featuredImage.childImageSharp.fixed;

    if (index === 0) {
        return [
            getFixed(data.postImagesSmall),
            {
                ...getFixed(data.postImagesMedium),
                media: `(min-width: 768px) and (max-width: 1280px)`,
            },
            {
                ...getFixed(data.postImagesLarge),
                media: `(min-width: 1280px)`,
            },
        ];
    } else {
        return [
            getFixed(data.postImagesSmall),
            {
                ...getFixed(data.postImagesMedium),
                media: `(min-width: 1280px)`,
            },
        ];
    }
};

export const query = graphql`
    query {
        posts: allMdx(sort: { fields: exports___date, order: DESC }, limit: 6) {
            edges {
                node {
                    exports {
                        title
                        tags
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        postImagesSmall: allMdx(sort: { fields: exports___date, order: DESC }, limit: 6) {
            edges {
                node {
                    fields {
                        featuredImage {
                            childImageSharp {
                                fixed(width: 240) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
        postImagesMedium: allMdx(sort: { fields: exports___date, order: DESC }, limit: 6) {
            edges {
                node {
                    fields {
                        featuredImage {
                            childImageSharp {
                                fixed(width: 400) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
        postImagesLarge: allMdx(sort: { fields: exports___date, order: DESC }, limit: 6) {
            edges {
                node {
                    fields {
                        featuredImage {
                            childImageSharp {
                                fixed(width: 550) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;

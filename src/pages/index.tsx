import { graphql } from "gatsby";
import React, { FC } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/posts-list";
import { SEO } from "../components/seo";
import { AllMdx, FeaturedImage, pick$, PostData } from "../utils";

type IndexPageProps = {
    data: {
        posts: AllMdx<PostData>;
        postImagesSmall: AllMdx<FeaturedImage>;
        postImagesMedium: AllMdx<FeaturedImage>;
        postImagesLarge: AllMdx<FeaturedImage>;
    };
};

const IndexPage: FC<IndexPageProps> = ({ data }) => (
    <Layout pushRight>
        <SEO title="Home" />
        <PostsList
            posts={data.posts.edges.map(pick$("node"))}
            postImagesSmall={data.postImagesSmall.edges.map(pick$("node"))}
            postImagesMedium={data.postImagesMedium.edges.map(pick$("node"))}
            postImagesLarge={data.postImagesLarge.edges.map(pick$("node"))}
        />
    </Layout>
);

export const query = graphql`
    query {
        posts: allMdx(sort: { fields: exports___date, order: DESC }, limit: 6) {
            edges {
                node {
                    exports {
                        title
                    }
                    fields {
                        slug
                        effectiveTags
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

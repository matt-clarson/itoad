import { graphql } from "gatsby";
import React, { FC } from "react";
import { Layout } from "../components/layout";
import { PagePath } from "../components/page-path";
import { PostHeader } from "../components/post-header";
import { PostsList } from "../components/posts-list";
import { SEO } from "../components/seo";
import { AllMdx, FeaturedImage, pick$, PostData } from "../utils";

type TagsPageProps = {
    data: {
        posts: AllMdx<PostData>;
        postImagesSmall: AllMdx<FeaturedImage>;
        postImagesMedium: AllMdx<FeaturedImage>;
        postImagesLarge: AllMdx<FeaturedImage>;
    };
    pageContext: {
        tag: string;
    };
};

const TagsTemplate: FC<TagsPageProps> = ({ data, pageContext: { tag } }) => (
    <Layout pushRight>
        <SEO title={`Tag: ${tag}`} />
        <PagePath
            paths={[
                ["Home", "/"],
                ["Recipes", "/recipes"],
            ]}
            className="ml-2 sm:ml-10 font-text text-sm md:text-base font-thin text-gray-800"
        />
        <PostHeader title={`Tag: ${tag}`} />
        <PostsList
            posts={data.posts.edges.map(pick$("node"))}
            postImagesSmall={data.postImagesSmall.edges.map(pick$("node"))}
            postImagesMedium={data.postImagesMedium.edges.map(pick$("node"))}
            postImagesLarge={data.postImagesLarge.edges.map(pick$("node"))}
        />
    </Layout>
);

export const query = graphql`
    query($tag: String!) {
        posts: allMdx(
            filter: { fields: { effectiveTags: { in: [$tag] } } }
            sort: { fields: exports___date }
        ) {
            edges {
                node {
                    fields {
                        effectiveTags
                        slug
                    }
                    exports {
                        title
                    }
                }
            }
        }
        postImagesSmall: allMdx(
            filter: { fields: { effectiveTags: { in: [$tag] } } }
            sort: { fields: exports___date }
        ) {
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
        postImagesMedium: allMdx(
            filter: { fields: { effectiveTags: { in: [$tag] } } }
            sort: { fields: exports___date }
        ) {
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
        postImagesLarge: allMdx(
            filter: { fields: { effectiveTags: { in: [$tag] } } }
            sort: { fields: exports___date }
        ) {
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

export default TagsTemplate;

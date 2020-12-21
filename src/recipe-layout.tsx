import React, { FC } from "react";
import { graphql } from "gatsby";
import { FixedObject } from "gatsby-image";
import { Layout } from "./components/layout";
import { SEO } from "./components/seo";
import { PagePath } from "./components/page-path";
import {
    Ingredients,
    IngredientsList,
    Method,
    MethodList,
    RecipeArticle,
} from "./components/recipe-article";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

type Image = {
    childImageSharp: {
        fixed: FixedObject;
    };
};

type RecipeProps = {
    data: {
        mobileScreen: Image;
        smallScreen: Image;
        regularScreen: Image;
        largeScreen: Image;

        mdx: {
            exports: {
                title: string;
                tags: string[];
            };
            body: string;
        };
    };
};

const components = { Ingredients, Method, ul: IngredientsList, ol: MethodList };

const RecipeLayout: FC<RecipeProps> = ({ data }) => {
    const sources = [
        data.mobileScreen.childImageSharp.fixed,
        {
            ...data.smallScreen.childImageSharp.fixed,
            media: `(min-width: 768px) and (max-width: 1024px)`,
        },
        {
            ...data.regularScreen.childImageSharp.fixed,
            media: `(min-width: 1024px) and (max-width: 1280px)`,
        },
        {
            ...data.largeScreen.childImageSharp.fixed,
            media: `(min-width: 1280px)`,
        },
    ];
    return (
        <MDXProvider components={components}>
            <Layout>
                <SEO title={data.mdx.exports.title} />
                <PagePath
                    paths={[
                        ["Home", "/"],
                        ["Recipes", "/recipes"],
                    ]}
                    className="ml-2 sm:ml-10 font-text text-sm md:text-base font-thin text-gray-800"
                />
                <RecipeArticle
                    title={data.mdx.exports.title}
                    tags={data.mdx.exports.tags}
                    imgSources={sources}
                >
                    <div className="ml-2 sm:ml-10 mt-6 lg:mt-10 pr-10">
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </div>
                </RecipeArticle>
            </Layout>
        </MDXProvider>
    );
};

export const query = graphql`
    query($slug: String!, $img: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            exports {
                title
                tags
            }
            body
        }

        mobileScreen: file(relativePath: { eq: $img }) {
            childImageSharp {
                fixed(width: 300, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        smallScreen: file(relativePath: { eq: $img }) {
            childImageSharp {
                fixed(width: 400, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        regularScreen: file(relativePath: { eq: $img }) {
            childImageSharp {
                fixed(width: 500, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        largeScreen: file(relativePath: { eq: $img }) {
            childImageSharp {
                fixed(width: 700, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
    }
`;

export default RecipeLayout;

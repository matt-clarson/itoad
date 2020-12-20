import React, { FC } from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

type RecipeTemplateProps = {
    data: QueryResult;
};

const RecipeTemplate: FC<RecipeTemplateProps> = ({ data }) => {
    const post = data.markdownRemark;
    console.log(post);
    return (
        <Layout>
            <SEO title={post.frontmatter.title} />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
    );
};

type QueryResult = {
    markdownRemark: {
        html: string;
        frontmatter: {
            title: string;
        };
    };
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;

export default RecipeTemplate;

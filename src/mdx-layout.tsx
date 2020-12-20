import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "./components/layout";

type MDXLayoutProps = {
    data: {
        mdx: {
            body: string;
        };
    };
};

const MDXLayout: FC<MDXLayoutProps> = ({ data: { mdx } }) => {
    return (
        <MDXProvider components={{}}>
            <Layout>
                <MDXRenderer>{mdx.body}</MDXRenderer>
            </Layout>
        </MDXProvider>
    );
};

export default MDXLayout;

export const query = graphql`
    query($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
        }
    }
`;

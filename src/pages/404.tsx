import React, { FC } from "react";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

const NotFoundPage: FC = () => (
    <Layout>
        <SEO title="Page Not found" />
        <section className="ml-6">
            <h1 className="font-title text-2xl">{`Page Not Found`}</h1>
            <div className="font-text max-w-prose">
                <p>{`The page you are looking for doesn't seem to exist...`}</p>
                <p>{`If you are looking for a specific recipe, the urls for them should be in the form "/recipes/<recipe-name-here>". Otherwise, try clicking on "Home" to the left and trying to find the page you want again.`}</p>
            </div>
        </section>
    </Layout>
);

export default NotFoundPage;

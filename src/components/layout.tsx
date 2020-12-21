import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { Header } from "./header";
import "./layout.css";

export const Layout: FC = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <div className="w-full min-h-full flex flex-row justify-between">
                <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
                <div>
                    <main>{children}</main>
                </div>
            </div>
            <footer>{`© ${new Date().getFullYear()}, Built with ❤️ in Manchester, UK`}</footer>
        </>
    );
};

import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { Header } from "./header";
import "./layout.css";
import { Nav } from "./nav";

type LayoutProps = {
    pushRight?: boolean;
};

export const Layout: FC<LayoutProps> = ({ children, pushRight }) => {
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
            <div className="relative py-4 pl-2 sm:pl-6 w-full min-h-screen">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-14">
                    <div className="flex flex-col">
                        <Header
                            className="ml-5"
                            siteTitle={data.site.siteMetadata?.title || `Title`}
                        />
                        <span
                            role="presentation"
                            className="order-1 sm:order-none ml-3 sm:ml-0 inline-block h-1 w-5/12 bg-gray-800 mt-2 mb-3 sm:mb-6"
                        />
                        <Nav
                            className="ml-5"
                            links={[
                                ["Home", "/"],
                                ["Recipes", "/recipes"],
                                [
                                    "@itsthisoradoughnut",
                                    "https://www.instagram.com/itsthisoradoughnut",
                                ],
                            ]}
                        />
                    </div>
                    <div className={`ml-0 sm:ml-6 mt-3 sm:mt-0 ${!pushRight ? "flex-grow" : ""}`}>
                        <main>{children}</main>
                    </div>
                </div>
                <footer className="absolute bottom-4 font-text">
                    <p>{`© ${new Date().getFullYear()}`}</p>
                    <p>
                        <a
                            className="font-bold tracking-wide"
                            href="https://github.com/matt-clarson"
                        >
                            {`Built with ❤️ in Manchester, UK`}
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
};

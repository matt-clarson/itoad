import React, { FC } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

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
            <div className="relative py-4 pl-2 sm:pl-6 w-full min-h-screen">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-col">
                        <Header
                            className="ml-5"
                            siteTitle={data.site.siteMetadata?.title || `Title`}
                        />
                        <span
                            role="presentation"
                            className="order-1 sm:order-none ml-3 sm:ml-0 inline-block h-1 w-5/12 bg-gray-800 mt-2 mb-3 sm:mb-6"
                        />
                        <nav className="ml-5">
                            <ul className="font-text text-base md:text-lg">
                                <li>
                                    <Link to="/" className="font-normal">
                                        {"Home"}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recipes" className="font-normal">
                                        {"Recipes"}
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/itsthisoradoughnut"
                                        className="font-normal"
                                    >
                                        {"@itsthisoradoughnut"}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="ml-0 sm:ml-6 mt-3 sm:mt-0">
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

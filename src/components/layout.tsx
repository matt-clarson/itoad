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
            <div className="py-4 pl-6 w-full min-h-screen">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <Header
                            className="ml-5"
                            siteTitle={data.site.siteMetadata?.title || `Title`}
                        />
                        <span
                            role="presentation"
                            className="inline-block h-1 w-5/12 bg-gray-800 mt-3 mb-6"
                        />
                        <nav className="ml-5">
                            <ul className="font-text text-lg">
                                <li className="hover:underline">
                                    <Link to="/">{"Home"}</Link>
                                </li>
                                <li className="hover:underline">
                                    <Link to="/recipes">{"Recipes"}</Link>
                                </li>
                                <li className="hover:underline">
                                    <a href="https://www.instagram.com/itsthisoradoughnut">
                                        {"@itsthisoradoughnut"}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <main>{children}</main>
                    </div>
                </div>
                <footer className="font-text">
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

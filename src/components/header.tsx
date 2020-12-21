import React, { FC } from "react";
import { Link } from "gatsby";

type HeaderProps = {
    siteTitle?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ siteTitle, className }) => (
    <header className={className}>
        <div>
            <h1 className="font-title text-2xl md:text-3xl lg:text-4xl">
                <Link className="font-normal" to="/">
                    {siteTitle ?? ""}
                </Link>
            </h1>
        </div>
    </header>
);

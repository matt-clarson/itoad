import React, { FC } from "react";
import { Link } from "gatsby";

type HeaderProps = {
    siteTitle?: string;
};

export const Header: FC<HeaderProps> = ({ siteTitle }) => (
    <header>
        <div>
            <h1 className="font-title text-4xl underline max-w-sm">
                <Link to="/">{siteTitle ?? ""}</Link>
            </h1>
        </div>
    </header>
);

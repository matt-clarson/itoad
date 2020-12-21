import React, { FC } from "react";
import { Link } from "gatsby";

type HeaderProps = {
    siteTitle?: string;
    className?: string;
};

export const Header: FC<HeaderProps> = ({ siteTitle, className }) => (
    <header className={className}>
        <div>
            <h1 className="font-title text-4xl max-w-sm">
                <Link className="hover:underline" to="/">
                    {siteTitle ?? ""}
                </Link>
            </h1>
        </div>
    </header>
);

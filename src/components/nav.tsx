import { Link } from "gatsby";
import React, { FC } from "react";

type NavProps = {
    links: [name: string, path: string][];
    className?: string;
};

export const Nav: FC<NavProps> = ({ className, links }) => (
    <nav className={className}>
        <ul className="font-text text-base md:text-lg">
            {links.map(([name, path]) => (
                <li key={name}>
                    <Link to={path} className="inline-block font-normal py-1.5 my-0.5">
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

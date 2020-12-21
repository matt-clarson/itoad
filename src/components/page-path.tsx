import { Link } from "gatsby";
import React, { FC, Fragment } from "react";

type PagePathProps = {
    paths: [name: string, path: string][];
    className?: string;
};

export const PagePath: FC<PagePathProps> = ({ paths, className }) => {
    return (
        <p className={className}>
            {paths.map(([name, path]) => (
                <Fragment key={name}>
                    <Link to={path} className="hover:underline">
                        {name}
                    </Link>
                    <span>{` / `}</span>
                </Fragment>
            ))}
        </p>
    );
};

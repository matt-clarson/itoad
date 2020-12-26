import { Link } from "gatsby";
import React, { FC, Fragment } from "react";
import { slugify } from "../utils";

type TagsProps = {
    tags: string[];
};

export const Tags: FC<TagsProps> = ({ tags }) => (
    <ul className="font-text uppercase list-none text-xs text-gray-700 tracking-wider">
        {tags.map((tag, index, arr) => (
            <Fragment key={tag}>
                <li className="inline-block">
                    <Link className="font-normal" to={`/recipes/tag/${slugify(tag)}`}>
                        {tag}
                    </Link>
                </li>
                {index < arr.length - 1 && <span aria-hidden>{` - `}</span>}
            </Fragment>
        ))}
    </ul>
);

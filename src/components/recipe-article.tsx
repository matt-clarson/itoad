import { format } from "date-fns";
import Img, { FixedObject } from "gatsby-image";
import React, { FC } from "react";
import { PostHeader } from "./post-header";
import { Tags } from "./tags";

type RecipeArticleProps = {
    title: string;
    tags: string[];
    imgSources: FixedObject | FixedObject[];
    date: Date;
};

export const RecipeArticle: FC<RecipeArticleProps> = ({
    title,
    tags,
    imgSources,
    date,
    children,
}) => {
    return (
        <article className="relative">
            <PostHeader title={title}>
                <Tags tags={tags} />
                <p className="mt-1 font-text text-xs text-gray-700 tracking-wider">
                    {format(date, "EEE do LLLL yyyy")}
                </p>
            </PostHeader>

            <Img fixed={imgSources} className="ml-2 sm:ml-10 mr-6 rounded-xl" />

            {children}
        </article>
    );
};

export const Ingredients: FC = ({ children }) => (
    <section className="mt-4 lg:mt-6">
        <h2 className="font-title text-xl md:text-2xl text-gray-800 tracking-wide mb-4">{`Ingredients`}</h2>
        {children}
    </section>
);

export const Method: FC = ({ children }) => (
    <section className="mt-4 lg:mt-6">
        <h2 className="font-title text-xl md:text-2xl text-gray-800 tracking-wide mb-4">{`Method`}</h2>
        {children}
    </section>
);

export const MethodList: FC = ({ children }) => (
    <ol className="px-8 list-dash font-text text-gray-600 li-mb-4 li-pl-2">{children}</ol>
);

export const IngredientsList: FC = ({ children }) => (
    <ul className="px-8 list-dash font-text text-gray-800 tracking-wide li-mb-1 li-pl-1">
        {children}
    </ul>
);

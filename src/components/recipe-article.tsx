import Img, { FixedObject } from "gatsby-image";
import React, { FC, Fragment } from "react";

type RecipeArticleProps = {
    title: string;
    tags: string[];
    imgSources: FixedObject | FixedObject[];
};

export const RecipeArticle: FC<RecipeArticleProps> = ({ title, tags, imgSources, children }) => {
    return (
        <article className="relative">
            <div className="ml-2 sm:ml-10">
                <h1 className="mt-2 md:mt-4 mb-1 font-title text-2xl md:text-3xl lg:text-4xl text-gray-800">
                    {title}
                </h1>
                <ul className="font-text uppercase list-none text-xs text-gray-700 tracking-wider">
                    {tags.map((tag, index, arr) => (
                        <Fragment key={tag}>
                            <li className="inline-block">{tag}</li>
                            {index < arr.length - 1 && <span aria-hidden>{` - `}</span>}
                        </Fragment>
                    ))}
                </ul>
            </div>

            <span className="my-4 inline-block h-1 w-full bg-gray-800" role="presentation" />

            <Img fixed={imgSources} className="ml-2 sm:ml-10 mr-6 rounded-xl" />

            {children}
        </article>
    );
};

export const Ingredients: FC = ({ children }) => (
    <section>
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
    <ol className="px-8 list-dash font-text text-gray-600 max-w-prose li-mb-4 li-pl-2">
        {children}
    </ol>
);

export const IngredientsList: FC = ({ children }) => (
    <ul className="px-8 list-dash font-text text-gray-800 tracking-wide li-mb-1 li-pl-1">
        {children}
    </ul>
);

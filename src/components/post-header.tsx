import React, { FC } from "react";

type PostHeaderProps = {
    title: string;
};

export const PostHeader: FC<PostHeaderProps> = ({ children, title }) => (
    <>
        <header className="ml-2 sm:ml-10">
            <h1 className="mt-2 md:mt-4 mb-1 font-title text-2xl md:text-3xl lg:text-4xl text-gray-800">
                {title}
            </h1>
            {children}
        </header>

        <span className="my-4 inline-block h-1 w-full bg-gray-800" role="presentation" />
    </>
);

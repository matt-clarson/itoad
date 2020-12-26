import { Link } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import React, { FC } from "react";
import { FeaturedImage, PostData } from "../utils";
import { Tags } from "./tags";

type PostsListProps = {
    posts: PostData[];
    postImagesSmall: FeaturedImage[];
    postImagesMedium: FeaturedImage[];
    postImagesLarge: FeaturedImage[];
};

export const PostsList: FC<PostsListProps> = ({ posts, ...images }) => (
    <ul className="flex flex-row flex-wrap mt-12 ml-10 sm:ml-16 md:ml-4">
        {posts.map(({ fields, exports }, index) => (
            <li key={fields.slug} className="self-end mr-8 mb-10">
                <p className="font-title text-2xl">
                    <Link to={fields.slug} className="font-normal">
                        {exports.title}
                    </Link>
                </p>

                <Tags tags={fields.effectiveTags} />
                <div className="relative pl-6 pt-2">
                    <span
                        role="presentation"
                        className="inline-block absolute top-4 left-2 w-1 h-1/2 bg-gray-800"
                    />
                    <Link to={fields.slug} title={exports.title}>
                        <Img fixed={getImageSources(images, index)} className="rounded-xl" />
                    </Link>
                </div>
            </li>
        ))}
    </ul>
);

const getImageSources = (data: Omit<PostsListProps, "posts">, index: number): FixedObject[] => {
    const getFixed = (d: FeaturedImage[]) => d[index].fields.featuredImage.childImageSharp.fixed;

    if (index === 0) {
        return [
            getFixed(data.postImagesSmall),
            {
                ...getFixed(data.postImagesMedium),
                media: `(min-width: 768px) and (max-width: 1280px)`,
            },
            {
                ...getFixed(data.postImagesLarge),
                media: `(min-width: 1280px)`,
            },
        ];
    } else {
        return [
            getFixed(data.postImagesSmall),
            {
                ...getFixed(data.postImagesMedium),
                media: `(min-width: 1280px)`,
            },
        ];
    }
};

import { FixedObject } from "gatsby-image";

export type AllMdx<T extends unknown> = {
    edges: { node: T }[];
};

export type PostData = {
    exports: {
        title: string;
    };
    fields: {
        effectiveTags: string[];
        slug: string;
    };
};

export type FeaturedImage = {
    fields: {
        featuredImage: {
            childImageSharp: {
                fixed: FixedObject;
            };
        };
    };
};

export function pick$<T extends Record<string, unknown>>(k: keyof T): (o: T) => T[keyof T] {
    return o => o[k];
}

export const plural = (suffix: string) => (s: string, pluralise: boolean): string =>
    pluralise ? s + suffix : s;
export const slugify = (s: string): string => s.replace(/\s|_/g, "-").toLowerCase();

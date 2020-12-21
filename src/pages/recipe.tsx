import React, { FC } from "react";
import { graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

type Image = {
    childImageSharp: {
        fixed: FixedObject;
    };
};

type RecipeProps = {
    data: {
        mobileScreen: Image;
        smallScreen: Image;
        regularScreen: Image;
        largeScreen: Image;
    };
};

const Recipe: FC<RecipeProps> = ({ data }) => {
    const sources = [
        data.mobileScreen.childImageSharp.fixed,
        {
            ...data.smallScreen.childImageSharp.fixed,
            media: `(min-width: 768px) and (max-width: 1024px)`,
        },
        {
            ...data.regularScreen.childImageSharp.fixed,
            media: `(min-width: 1024px) and (max-width: 1280px)`,
        },
        {
            ...data.largeScreen.childImageSharp.fixed,
            media: `(min-width: 1280px)`,
        },
    ];
    return (
        <Layout>
            <SEO title="Pan-Fried Trout" />
            <p className="ml-2 sm:ml-10 font-text text-sm md:text-base font-thin text-gray-800">
                <span className="underline">{`Home`}</span>
                {` / `}
                <span className="underline">{`Recipes`}</span>
                {` /`}
            </p>
            <article className="relative">
                <div className="ml-2 sm:ml-10">
                    <h1 className="mt-2 md:mt-4 mb-1 font-title text-2xl md:text-3xl lg:text-4xl text-gray-800">{`Pan-Fried Trout`}</h1>
                    <ul className="font-text uppercase list-none text-xs text-gray-700 tracking-wider">
                        <li className="inline-block">{`Fish`}</li>
                        <span aria-hidden>{` - `}</span>
                        <li className="inline-block">{`Night-In`}</li>
                        <span aria-hidden>{` - `}</span>
                        <li className="inline-block">{`Medium`}</li>
                        <span aria-hidden>{` - `}</span>
                        <li className="inline-block">{`Healthy`}</li>
                    </ul>
                </div>

                <span className="my-4 inline-block h-1 w-full bg-gray-800" role="presentation" />

                <Img fixed={sources} className="ml-2 sm:ml-10 mr-6 rounded-xl" />

                <div className="ml-2 sm:ml-10 mt-6 lg:mt-10 pr-10">
                    <section>
                        <h2 className="font-title text-xl md:text-2xl text-gray-800 tracking-wide mb-4">{`Ingredients`}</h2>
                        <ul className="px-8 list-dash font-text text-gray-800 tracking-wide">
                            <li className="mb-1 pl-1">{`Boneless Trout Fillet, Skin-On`}</li>
                            <li className="mb-1 pl-1">{`Salted Butter`}</li>
                            <li className="mb-1 pl-1">{`Rainbow Chard`}</li>
                            <li className="mb-1 pl-1">{`Faro`}</li>
                            <li className="mb-1 pl-1">{`Whole Grain Mustard`}</li>
                            <li className="mb-1 pl-1">{`Whole Lemon`}</li>
                            <li className="mb-1 pl-1">{`Olive Oil`}</li>
                            <li className="mb-1 pl-1">{`Salt`}</li>
                            <li className="mb-1 pl-1">{`Black Pepper`}</li>
                        </ul>
                    </section>

                    <section className="mt-4 lg:mt-6">
                        <h2 className="font-title text-xl md:text-2xl text-gray-800 tracking-wide mb-4">{`Method`}</h2>
                        <ol className="px-8 list-dash font-text text-gray-600 max-w-prose">
                            <li className="mb-4 pl-2">{`First, prepare the faro. Bring a pot of salted water to the boil, and add the faro. Cook for 10-15 minutes, until the faro is cooked (soft, but still slightly chewy). Add oil to a frying pan, heat to high, and add the cooked faro, frying (tossing occasionally) for 5 minutes, or until toasted, crisp, and golden brown.`}</li>
                            <li className="mb-4 pl-2">{`While the faro is cooking, start making the sauce. Melt butter in a saucepan, add mustard and the juice of a whole lemon. Whisk vigorously to emulsify and combine. Season with salt and black pepper to taste.`}</li>
                            <li className="mb-4 pl-2">{`In a high-sided frying pan, melt a little bit of butter, and add a splash of boiling water. Add the chard to this, and cover, cooking over medium-low heat. Stir every now and then to prevent the chard from sticking or burning. Season with salt and pepper once the chard is wilted and soft.`}</li>
                            <li className="mb-4 pl-2">{`Finally, season the trout with salt and pepper on both sides. Get a non-stick frying pan up to high heat. Combine oil and butter in the pan(using oil to raise the smoke-point of the butter, so it doesn’t burn in the high heat). Place the fish skin-side down into the pan (lay it away from you, don’t drop it in, to avoid splashing the oil). Fry for 5 minutes, until the skin is crisp and brown, and the fish lifts out of the pan with no sticking or resistance. Flip the fish and fry for 2 more minutes, basting the skin.`}</li>
                            <li className="mb-4 pl-2">{`To plate: put the chard on the plate first, making a bed. Add a good amount of the faro and some sauce to this, then lay the fish skin-side up on top. Coat with more sauce, and sprinkle the remaining faro on top.`}</li>
                        </ol>
                    </section>
                </div>
            </article>
        </Layout>
    );
};

export const query = graphql`
    query {
        mobileScreen: file(relativePath: { eq: "pan-fried-trout.jpg" }) {
            childImageSharp {
                fixed(width: 300, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        smallScreen: file(relativePath: { eq: "pan-fried-trout.jpg" }) {
            childImageSharp {
                fixed(width: 400, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        regularScreen: file(relativePath: { eq: "pan-fried-trout.jpg" }) {
            childImageSharp {
                fixed(width: 500, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
        largeScreen: file(relativePath: { eq: "pan-fried-trout.jpg" }) {
            childImageSharp {
                fixed(width: 700, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
    }
`;

export default Recipe;

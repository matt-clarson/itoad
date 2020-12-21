import React, { FC } from "react";
import { graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

type RecipeProps = {
    data: {
        file: {
            childImageSharp: {
                fixed: FixedObject;
            };
        };
    };
};

const Recipe: FC<RecipeProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Pan-Fried Trout" />
            <p className="ml-10 font-text text-base font-thin text-gray-800">
                <span className="underline">{`Home`}</span>
                {` / `}
                <span className="underline">{`Recipes`}</span>
                {` /`}
            </p>
            <article className="relative">
                <div className="ml-10">
                    <h1 className="mt-4 mb-1 font-title text-4xl text-gray-800">{`Pan-Fried Trout`}</h1>
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

                <Img fixed={data.file.childImageSharp.fixed} className="ml-10 rounded-xl" />

                <div className="ml-10 mt-10 pr-10">
                    <section>
                        <h2 className="font-title text-2xl text-gray-800 tracking-wide mb-4">{`Ingredients`}</h2>
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

                    <section className="mt-6">
                        <h2 className="font-title text-2xl text-gray-800 tracking-wide mb-4">{`Method`}</h2>
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
        file(relativePath: { eq: "pan-fried-trout.jpg" }) {
            childImageSharp {
                fixed(width: 500, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                }
            }
        }
    }
`;

export default Recipe;

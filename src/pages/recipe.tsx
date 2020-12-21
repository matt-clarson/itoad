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
            <p className="font-text text-base font-thin text-gray-800">
                <span className="underline">{`Home`}</span>
                {` / `}
                <span className="underline">{`Recipes`}</span>
                {` /`}
            </p>
            <article className="pr-10">
                <h1 className="font-title text-4xl text-gray-800">{`Pan-Fried Trout`}</h1>
                <ul className="font-text uppercase list-none text-xs text-gray-700 tracking-wider">
                    <li className="inline-block">{`Fish`}</li>
                    <span aria-hidden>{` - `}</span>
                    <li className="inline-block">{`Night-In`}</li>
                    <span aria-hidden>{` - `}</span>
                    <li className="inline-block">{`Medium`}</li>
                    <span aria-hidden>{` - `}</span>
                    <li className="inline-block">{`Healthy`}</li>
                </ul>

                <span className="h-1 w-full absolute bg-gray-800" role="presentation" />

                <Img fixed={data.file.childImageSharp.fixed} className="rounded-xl" />

                <section>
                    <h2 className="font-title text-2xl text-gray-800 tracking-wide">{`Ingredients`}</h2>
                    <ul className="px-8 list-dash font-text text-gray-800 tracking-wide">
                        <li>{`Boneless Trout Fillet, Skin-On`}</li>
                        <li>{`Salted Butter`}</li>
                        <li>{`Rainbow Chard`}</li>
                        <li>{`Faro`}</li>
                        <li>{`Whole Grain Mustard`}</li>
                        <li>{`Whole Lemon`}</li>
                        <li>{`Olive Oil`}</li>
                        <li>{`Salt`}</li>
                        <li>{`Black Pepper`}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-title text-2xl text-gray-800 tracking-wide">{`Method`}</h2>
                    <ol className="px-8 list-dash font-text text-gray-600 max-w-prose">
                        <li>{`First, prepare the faro. Bring a pot of salted water to the boil, and add the faro. Cook for 10-15 minutes, until the faro is cooked (soft, but still slightly chewy). Add oil to a frying pan, heat to high, and add the cooked faro, frying (tossing occasionally) for 5 minutes, or until toasted, crisp, and golden brown.`}</li>
                        <li>{`While the faro is cooking, start making the sauce. Melt butter in a saucepan, add mustard and the juice of a whole lemon. Whisk vigorously to emulsify and combine. Season with salt and black pepper to taste.`}</li>
                        <li>{`In a high-sided frying pan, melt a little bit of butter, and add a splash of boiling water. Add the chard to this, and cover, cooking over medium-low heat. Stir every now and then to prevent the chard from sticking or burning. Season with salt and pepper once the chard is wilted and soft.`}</li>
                        <li>{`Finally, season the trout with salt and pepper on both sides. Get a non-stick frying pan up to high heat. Combine oil and butter in the pan(using oil to raise the smoke-point of the butter, so it doesn’t burn in the high heat). Place the fish skin-side down into the pan (lay it away from you, don’t drop it in, to avoid splashing the oil). Fry for 5 minutes, until the skin is crisp and brown, and the fish lifts out of the pan with no sticking or resistance. Flip the fish and fry for 2 more minutes, basting the skin.`}</li>
                        <li>{`To plate: put the chard on the plate first, making a bed. Add a good amount of the faro and some sauce to this, then lay the fish skin-side up on top. Coat with more sauce, and sprinkle the remaining faro on top.`}</li>
                    </ol>
                </section>
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

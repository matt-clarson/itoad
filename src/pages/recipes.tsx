import { graphql, Link } from "gatsby";
import React, { FC } from "react";
import { Layout } from "../components/layout";
import { PostHeader } from "../components/post-header";
import { SEO } from "../components/seo";
import { plural, slugify } from "../utils";

type GroupedField = {
    fieldValue: string;
    totalCount: number;
};

type RecipesProps = {
    data: {
        tags: {
            group: GroupedField[];
        };
        difficulties: {
            group: GroupedField[];
        };
        difficultyContent: {
            edges: {
                node: {
                    sortValue: number;
                    value: string;
                    description: string;
                };
            }[];
        };
    };
};

const Recipes: FC<RecipesProps> = ({ data }) => (
    <Layout pushRight>
        <SEO title="Recipes" />
        <PostHeader title="Recipes" />
        <div className="flex flex-row">
            <div>
                <h2 className="font-title text-xl lg:text-2xl">{"Tags"}</h2>
                <ul className="mt-2 ml-4 mr-8">
                    {data.tags.group
                        .sort((a, b) => (a.fieldValue > b.fieldValue ? 1 : -1))
                        .map(({ fieldValue, totalCount }) => (
                            <li key={fieldValue} className="font-title text-lg lg:text-xl mb-4">
                                <Link
                                    className="font-normal"
                                    to={`/recipes/tag/${slugify(fieldValue)}`}
                                >
                                    {`${fieldValue} - ${totalCount} ${plural("s")(
                                        "Post",
                                        totalCount !== 1,
                                    )}`}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <h2 className="font-title text-xl lg:text-2xl">{"Difficulty"}</h2>
                <ul className="mt-2 ml-4 max-w-prose pr-4 lg:pr-20">
                    {data.difficultyContent.edges
                        .sort((a, b) => (a.node.sortValue > b.node.sortValue ? 1 : -1))
                        .map(({ node: { value, description } }) => ({
                            value,
                            description,
                            totalCount:
                                data.difficulties.group.find(o => o.fieldValue === value)
                                    ?.totalCount ?? 0,
                        }))
                        .map(({ value, description, totalCount }) => (
                            <li key={value}>
                                <Link
                                    className="font-title font-normal text-lg lg:text-xl mb-2"
                                    to={`/recipes/tag/${slugify(value)}`}
                                >
                                    {`${value} - ${totalCount} ${plural("s")(
                                        "Post",
                                        totalCount !== 1,
                                    )}`}
                                </Link>
                                <p className="font-text text-sm lg:text-base mb-4">{description}</p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    </Layout>
);

export const query = graphql`
    query {
        tags: allMdx {
            group(field: exports___tags) {
                fieldValue
                totalCount
            }
        }
        difficulties: allMdx {
            group(field: exports___difficulty) {
                fieldValue
                totalCount
            }
        }
        difficultyContent: allDifficulty {
            edges {
                node {
                    sortValue
                    value
                    description
                }
            }
        }
    }
`;

export default Recipes;

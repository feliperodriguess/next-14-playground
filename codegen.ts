import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: "./src/**/*.graphql",
  generates: {
    "./src/lib/graphql/codegen/generated.ts": {
      overwrite: true,
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        // fetcher: "./utils#graphQLFetcher",
        // exposeFetcher: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        legacyMode: false,
        skipTypename: true,
      },
    },
  },
};
export default config;

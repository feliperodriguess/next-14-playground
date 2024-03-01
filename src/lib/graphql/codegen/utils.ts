import { sleep } from "@/lib/utils";

export async function graphQLFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit
): Promise<TData> {
  await sleep(); // For mocking slower requests
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    ...options,
  });
  const result = await response.json();
  return result.data;
}

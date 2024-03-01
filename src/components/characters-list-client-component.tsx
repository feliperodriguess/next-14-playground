"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Character,
  CharactersDocument,
  CharactersQuery,
} from "@/lib/graphql/codegen/generated";
import { graphQLFetcher } from "@/lib/graphql/codegen/utils";
import { CharacterCard } from "./character-card";

export function CharactersListClientComponent() {
  const { data, isLoading } = useQuery<CharactersQuery>({
    queryKey: ["get-characters"],
    queryFn: () => graphQLFetcher(CharactersDocument),
  });

  if (isLoading) {
    return <h1 className="font-mono text-lg text-slate-200">Please wait...</h1>;
  }

  return (
    <section className="space-y-20">
      <h1 className="font-mono text-3xl text-slate-200 text-center underline uppercase">
        This is a client component
      </h1>
      <div className="flex flex-wrap justify-center gap-12 w-full">
        {data?.characters?.results?.map((character) => (
          <CharacterCard
            key={character?.id}
            character={character as Character}
          />
        ))}
      </div>
    </section>
  );
}

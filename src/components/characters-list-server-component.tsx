import {
  Character,
  CharactersDocument,
  CharactersQuery,
  CharactersQueryVariables,
} from "@/lib/graphql/codegen/generated";
import { graphQLFetcher } from "@/lib/graphql/codegen/utils";
import { CharacterCard } from "./character-card";

export async function CharactersListServerComponent() {
  const data = await graphQLFetcher<CharactersQuery, CharactersQueryVariables>(
    CharactersDocument,
    { page: 1 },
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return (
    <section className="space-y-20">
      <h1 className="font-mono text-3xl text-slate-200 text-center underline uppercase">
        This is a server component
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

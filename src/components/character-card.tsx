import Image from "next/image";
import { Character } from "@/lib/graphql/codegen/generated";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="space-y-2 max-w-[300px]" key={character.id}>
      <h2 className="font-mono text-lg text-slate-200">{character.name}</h2>
      <p className="font-mono text-lg text-slate-200">
        Species: {character.species}
      </p>
      <p className="font-mono text-lg text-slate-200 truncate">
        📍: {character.location?.name}
      </p>
      <Image
        src={character.image!}
        alt={character.name!}
        height={400}
        width={300}
      />
    </div>
  );
}

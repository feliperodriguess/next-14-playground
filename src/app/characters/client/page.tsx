import { CharactersListClientComponent } from "@/components/characters-list-client-component";

export default async function CharactersClient() {
  return (
    <main className="flex bg-slate-800 min-h-screen flex-col gap-16 items-center p-24">
      <CharactersListClientComponent />
    </main>
  );
}

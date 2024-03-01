import { Suspense } from "react";

import { CharactersListServerComponent } from "@/components/characters-list-server-component";

export default async function CharactersServer() {
  return (
    <main className="flex bg-slate-800 min-h-screen flex-col gap-16 items-center p-24">
      <Suspense
        fallback={
          <h1 className="font-mono text-lg text-slate-200">Please wait...</h1>
        }
      >
        <CharactersListServerComponent />
      </Suspense>
    </main>
  );
}

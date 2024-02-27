import { Suspense } from "react";

import { CreateProductForm } from "@/components/create-product-form";
import { ProductsList } from "@/components/products-list";

export default function Products() {
  return (
    <main className="flex bg-slate-800 min-h-screen flex-col gap-16 items-center p-24">
      <h1 className="font-mono text-lg text-slate-200">Hello World</h1>
      <CreateProductForm />
      <Suspense fallback={<p className="text-lg text-slate-200">Loading...</p>}>
        <ProductsList />
      </Suspense>
    </main>
  );
}

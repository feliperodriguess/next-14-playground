// import { unstable_noStore as noStore } from "next/cache";

import { getProducts } from "@/lib/services";

// export const dynamic = 'force-dynamic'

export async function ProductsList() {
  // noStore()
  const products = await getProducts();

  return (
    <section className="space-y-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 text-lg text-slate-200"
        >
          <h2>{product.name}: </h2>
          <p>
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      ))}
    </section>
  );
}

// unstable_cache (Next.js -> caching)
// cache (React -> deduping)

import { sleep } from "@/lib/utils";

import { API_URL } from "./constants";
import { productsSchema } from "./types";

export async function getProducts() {
  await sleep();
  const response = await fetch(API_URL + "/products", {
    // Next.js fetch API already has deduping built-in
    next: {
      revalidate: 30, // 30 seconds
      tags: ["get-products"],
    },
  });
  const products = await response.json();
  const parsed = productsSchema.safeParse(products);
  if (!parsed.success) throw new Error("Failed to get products");
  return parsed.data;
}

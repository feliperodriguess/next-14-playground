"use server";

import { revalidateTag } from "next/cache";

import { API_URL } from "@/lib/constants";
import { CreateProductState, Product, createProductSchema } from "@/lib/types";
import { sleep } from "@/lib/utils";

export async function createProduct(
  prevState: CreateProductState,
  formData: FormData
) {
  await sleep();
  const { name, price } = createProductSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
  const response = await fetch(API_URL + "/products", {
    method: "POST",
    body: JSON.stringify({
      name,
      price,
    }),
  });
  const product: Product = await response.json();
  revalidateTag("get-products");
  return {
    message: "Product successfully created! 🎉",
    newProductId: product.id,
  };
}

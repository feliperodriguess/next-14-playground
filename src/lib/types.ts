import * as z from "zod";

export const productSchema = z.object({
  id: z.coerce.string(),
  name: z.string(),
  price: z.coerce.number().gt(0),
});

export const productsSchema = z.array(productSchema);

export const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number().gt(0),
});

export const createProductState = z.object({
  message: z.string().optional(),
  newProductId: z.string().optional(),
});

export type CreateProductState = z.infer<typeof createProductState>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type Product = z.infer<typeof productSchema>;

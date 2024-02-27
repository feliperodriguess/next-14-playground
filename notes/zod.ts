// Sources of data that we might wanna validate with Zod

// 1. Form data
// 2. API data
// 3. Third-party API data
// 4. localStorage/cookies
// 5. URL params
// 6. Environment variables
// 7. Webhooks

// Cool ORM integration packages: drizzle-zod, zod-prisma-types

import * as z from "zod";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(), // It will try to convert the value to a number, this is amazing
  category: z.enum(["Electronics", "Books", "Clothing"]),
});

type Product = z.infer<typeof productSchema>;

const data = {
  id: "1",
  name: "Product 1",
  price: 100,
};

const product = productSchema.parse(data); // It will throw an error if the data is not valid
const productSafe = productSchema.safeParse(data); // It will return a result object with a success property and a data property

// Validate if the data is correct
if (productSafe.success) {
  console.log(productSafe.data.name); // Then we can use the data
}

// Validating environment variables
const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  THIRD_PARTY_API_KEY: z.string().min(1),
});

const parsedEnv = envSchema.parse(process.env);
console.log(parsedEnv.DATABASE_URL);

// Working with Zod + URLs in Server Components
const searchParamsSchema = z.object({
  id: z.coerce.number(),
  color: z.enum(["red", "blue", "green"]),
});

export function ProductPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const parsedParams = searchParamsSchema.safeParse(searchParams);
  if (parsedParams.success) {
    console.log(parsedParams.data.id);
  }
  // return <div>Product</div>;
}

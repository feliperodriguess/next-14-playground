import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sleep } from "@/lib/utils";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().min(18, "You must be 18 or older"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);
    await sleep(2000);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" type="text" />
      {errors.name && <p className="text-red-500"> {errors.name.message}</p>}

      <input {...register("email")} placeholder="E-mail" type="email" />
      {errors.email && <p className="text-red-500"> {errors.email.message}</p>}

      <input {...register("age")} placeholder="Age" type="number" />
      {errors.age && <p className="text-red-500"> {errors.age.message}</p>}

      <input {...register("password")} placeholder="Password" type="password" />
      {errors.password && (
        <p className="text-red-500"> {errors.password.message}</p>
      )}

      <input
        {...register("confirmPassword")}
        placeholder="Confirm password"
        type="password"
      />
      {errors.confirmPassword && (
        <p className="text-red-500"> {errors.confirmPassword.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

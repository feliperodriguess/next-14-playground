"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { createProduct } from "@/lib/actions/create-product";

const initialState = {
  message: "",
  newProductId: "",
};

export function CreateProductForm() {
  const [state, dispatch] = useFormState(createProduct, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.newProductId) {
      toast({
        title: state?.message,
        variant: "success",
      });
      formRef?.current?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.newProductId]);

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4"
      ref={formRef}
    >
      <Input name="name" placeholder="Name" type="text" />
      <Input name="price" placeholder="Price" type="number" />
      <SubmitButton>Add product</SubmitButton>
    </form>
  );
}

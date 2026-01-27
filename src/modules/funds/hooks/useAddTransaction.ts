import type { z } from "zod";
import { useForm } from "react-hook-form";
import type { LocalizationKey } from "@/modules/shared/hooks";
import { addTransactionSchema } from "@/modules/funds/forms";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddTransaction = (t: (key: LocalizationKey) => string) => {
  const formSchema = addTransactionSchema(t);

  const addTransactionForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const isFormDisabled = !!addTransactionForm.formState.errors.amount;

  return {
    addTransactionForm,
    isFormDisabled,
  };
};

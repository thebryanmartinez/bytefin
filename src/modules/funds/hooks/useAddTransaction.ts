import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { addTransactionSchema } from "@/modules/funds/forms";
import type { LocalizationKey } from "@/modules/shared/hooks";

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

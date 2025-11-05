"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LocalizationKey } from "@/lib/useLocalization";

const createFormSchema = (t: (key: LocalizationKey) => string) =>
  z.object({
    amount: z.transform(Number).pipe(
      z
        .number(t("funds.amountMustBeNumber"))
        .positive(t("funds.amountMustNotBeZero"))
        .or(z.number().negative(t("funds.amountMustNotBeZero"))),
    ),
    description: z
      .string()
      .min(1, t("funds.descriptionRequired"))
      .max(100, t("funds.descriptionMaxLength")),
  });

interface AddTransactionDialogProps {
  id: string;
  addTransaction: (
    fundId: string,
    amount: number,
    description: string,
  ) => Promise<void>;
  t: (key: LocalizationKey) => string;
}

export const AddTransactionDialog = ({
  id,
  addTransaction,
  t,
}: AddTransactionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const isDisabled =
    !!form.formState.errors.description || !!form.formState.errors.amount;

  const handleAddTransaction = async (data: z.infer<typeof formSchema>) => {
    await addTransaction(id, data.amount, data.description);
    closeDialog();
  };

  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-3 h-3 mr-1" />
          {t("common.add")}
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto">
        <DialogHeader>
          <DialogTitle>{t("funds.addTransactionTitle")}</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 pt-4"
          id="form-add-transaction"
          onSubmit={form.handleSubmit(handleAddTransaction)}
        >
          <div className="space-y-4">
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("funds.amount")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("funds.amountPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("funds.description")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("funds.descriptionPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={closeDialog}>
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              form="form-add-transaction"
              disabled={isDisabled}
            >
              {t("funds.addTransaction")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;

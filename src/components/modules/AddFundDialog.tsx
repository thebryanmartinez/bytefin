"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalization, { type LocalizationKey } from "@/lib/useLocalization";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFundDialogProps {
  addFund: (fund: string) => void;
}

const createFormSchema = (t: (key: LocalizationKey) => string) =>
  z.object({
    fund: z
      .string()
      .min(1, t("funds.fundRequired"))
      .max(30, t("funds.fundMaxLength")),
  });

export const AddFundDialog = ({ addFund }: AddFundDialogProps) => {
  const { t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fund: "",
    },
  });

  const isDisabled = !!form.formState.errors.fund;

  const closeDialog = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleAddFund = async (data: z.infer<typeof formSchema>) => {
    await addFund(data.fund);
    closeDialog();
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default">{t("funds.addFund")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="pb-4">
            <DialogTitle>{t("funds.addNewFund")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <form
              className="space-y-2 pb-4"
              id="form-add-fund"
              onSubmit={form.handleSubmit(handleAddFund)}
            >
              <Controller
                name="fund"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>
                      {t("funds.fundName")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={t("funds.savingsPlaceholder")}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-error"
                      />
                    )}
                  </Field>
                )}
              />
            </form>
            <div className="flex justify-end space-x-2">
              <Button variant="neutral" onClick={closeDialog}>
                {t("common.cancel")}
              </Button>
              <Button type="submit" form="form-add-fund" disabled={isDisabled}>
                {t("funds.addFund")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFundDialog;

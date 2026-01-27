"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Field,
  FieldError,
  FieldLabel,
} from "@/modules/shared/ui";
import { useLocalization } from "@/modules/shared/hooks";
import * as z from "zod";
import { Controller } from "react-hook-form";
import { useDialog } from "@/modules/shared/hooks";
import { useAddFund } from "@/modules/funds/hooks";
import type { addFundSchema } from "@/modules/funds/forms";

interface AddFundDialogProps {
  addFund: (fundName: string) => void;
}

export const AddFundDialog = ({ addFund }: AddFundDialogProps) => {
  const { t } = useLocalization();
  const { isOpen, handleClose, handleOpenChange } = useDialog();
  const { addFundForm, isFormDisabled } = useAddFund(t);

  const handleAddFund = (data: z.infer<typeof addFundSchema>) => {
    addFund(data.fundName);
    handleClose(addFundForm.reset);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) =>
        handleOpenChange(open, addFundForm.reset)
      }
    >
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
            onSubmit={addFundForm.handleSubmit(handleAddFund)}
          >
            <Controller
              name="fundName"
              control={addFundForm.control}
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
            <Button
              variant="neutral"
              onClick={() => handleClose(addFundForm.reset)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              form="form-add-fund"
              disabled={isFormDisabled}
            >
              {t("funds.addFund")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundDialog;

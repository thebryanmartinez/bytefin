"use client";

import type { Id } from "@convex/_generated/dataModel";
import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import type * as z from "zod";
import type { addTransactionSchema } from "@/modules/funds/forms";
import { useAddTransaction } from "@/modules/funds/hooks";
import type { FundsProps } from "@/modules/funds/interfaces";
import { useDialog, useLocalization } from "@/modules/shared/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from "@/modules/shared/ui";

interface AddTransactionDialogProps {
  fundId: Id<"funds">;
  account: FundsProps["account"];
  updateFundBalance: FundsProps["updateFundBalance"];
  currentBalance?: number;
  updateAccountBalance: FundsProps["updateAccountBalance"];
}

export const AddTransactionDialog = ({
  fundId,
  account,
  updateFundBalance,
  currentBalance = 0,
  updateAccountBalance,
}: AddTransactionDialogProps) => {
  const { t } = useLocalization();
  const { addTransactionForm, isFormDisabled } = useAddTransaction(t);
  const { isOpen, handleClose, handleOpenChange } = useDialog();

  const handleUpdateBalance = async (
    data: z.infer<typeof addTransactionSchema>,
  ) => {
    try {
      updateFundBalance(fundId, currentBalance, data.amount);
      updateAccountBalance(account._id, account.balance, data.amount);
      handleClose(addTransactionForm.reset);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => handleOpenChange(!isOpen, addTransactionForm.reset)}
    >
      <DialogTrigger asChild>
        <Button variant="neutral" size="sm">
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
          onSubmit={addTransactionForm.handleSubmit(handleUpdateBalance)}
        >
          <div className="space-y-4">
            <Controller
              name="amount"
              control={addTransactionForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
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
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-error"
                    />
                  )}
                </Field>
              )}
            />
            <div className="text-sm text-gray-500">
              Current Balance: ${currentBalance.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="neutral"
              onClick={() => handleClose(addTransactionForm.reset)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              form="form-add-transaction"
              disabled={isFormDisabled}
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

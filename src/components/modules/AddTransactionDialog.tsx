"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LocalizationKey } from "@/lib/useLocalization";

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
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTransaction = async (
    id: string,
    amount: number,
    description: string,
  ) => {
    if (!description.trim() || isNaN(amount)) return;
    await addTransaction(id, amount, description);
    setAmount("");
    setDescription("");
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
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-amount">{t("funds.amount")}</Label>
            <Input
              id="transaction-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("funds.amountPlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transaction-description">
              {t("funds.description")}
            </Label>
            <Input
              id="transaction-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("funds.descriptionPlaceholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && id) {
                  handleAddTransaction(id, parseFloat(amount), description);
                }
              }}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={closeDialog}>
              {t("common.cancel")}
            </Button>
            <Button
              onClick={() =>
                id && handleAddTransaction(id, parseFloat(amount), description)
              }
              disabled={!amount || !description.trim()}
            >
              {t("funds.addTransaction")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;

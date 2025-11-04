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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useLocalization from "@/lib/useLocalization";

export const AddFundDialog = ({ addFund }: { addFund: any }) => {
  const { t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const [fundName, setFundName] = useState("");

  const closeDialog = () => setIsOpen(false);

  const handleAddFund = async (fundName: string) => {
    if (!fundName.trim()) return;
    await addFund(fundName);
    setFundName("");
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default">{t("funds.addFund")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="pb-4">
            <DialogTitle>{t("funds.addNewFund")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 pb-4">
              <Label htmlFor="fund-name">{t("funds.fundName")}</Label>
              <Input
                id="fund-name"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder={t("funds.savingsPlaceholder")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddFund(fundName);
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDialog}>
                {t("common.cancel")}
              </Button>
              <Button onClick={() => handleAddFund(fundName)}>{t("funds.addFund")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFundDialog;

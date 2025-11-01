"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTransactionDialogProps {
  id: string;
}

export const AddTransactionDialog = ({ id }: AddTransactionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTransaction = (
    id: string,
    amount: string | number,
    description: string,
  ) => {
    // TODO: Add functionality
  };

  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-amount">Amount</Label>
            <Input
              id="transaction-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transaction-description">Description</Label>
            <Input
              id="transaction-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="September income"
              onKeyDown={(e) => {
                if (e.key === "Enter" && id) {
                  handleAddTransaction(id, parseFloat(amount), description);
                }
              }}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                id && handleAddTransaction(id, parseFloat(amount), description)
              }
              disabled={!amount || !description.trim()}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;

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

export const AddFundDialog = () => {
  const [isOpen, setisOpen] = useState(false);
  const [fundName, setFundName] = useState("");

  const closeDialog = () => setisOpen(false);

  const handleAddFund = (fundName: string) => {
    // TODO: Add functionality for adding fund
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setisOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Fund</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="pb-4">
            <DialogTitle>Add New Fund</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 pb-4">
              <Label htmlFor="fund-name">Fund Name</Label>
              <Input
                id="fund-name"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder="Savings"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddFund(fundName);
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={() => handleAddFund(fundName)}>Add Fund</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFundDialog;

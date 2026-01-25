import { Check, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import type { FundsProps } from "./Funds";

interface DeleteFundButtonProps {
  id: string;
  deleteFund: FundsProps["deleteFund"];
}

export const DeleteFundButton = ({ id, deleteFund }: DeleteFundButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPendingDelete = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPending(true);
    timeoutRef.current = setTimeout(() => {
      setIsPending(false);
      timeoutRef.current = null;
    }, 3000);
  };

  const handleDeleteFund = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPending(false);
    deleteFund(id);
  };

  const handleOnClick = () => {
    if (isPending) handleDeleteFund();
    else startPendingDelete();
  };

  return (
    <Button variant="neutral" size="icon" onClick={handleOnClick}>
      {isPending ? <Check /> : <Trash2 />}
    </Button>
  );
};

export default DeleteFundButton;

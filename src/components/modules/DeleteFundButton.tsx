import { Check, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface DeleteFundButtonProps {
  fundId: string;
  deleteFund: (fundId: string) => Promise<void>;
}

export const DeleteFundButton = ({
  fundId,
  deleteFund,
}: DeleteFundButtonProps) => {
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

  const handleDeleteFund = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPending(false);
    await deleteFund(fundId);
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

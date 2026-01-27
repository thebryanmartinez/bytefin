import type { Id } from "@convex/_generated/dataModel";
import { Check, Trash2 } from "lucide-react";
import { useDeleteFund } from "@/modules/funds/hooks";
import type { FundsProps } from "@/modules/funds/interfaces";
import { Button } from "@/modules/shared/ui";

interface DeleteFundButtonProps {
  id: Id<"funds">;
  deleteFund: FundsProps["deleteFund"];
}

export const DeleteFundButton = ({ id, deleteFund }: DeleteFundButtonProps) => {
  const { handleDelete, isPending } = useDeleteFund({ id, deleteFund });

  return (
    <Button variant="neutral" size="icon" onClick={handleDelete}>
      {isPending ? <Check /> : <Trash2 />}
    </Button>
  );
};

export default DeleteFundButton;

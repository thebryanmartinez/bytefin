import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Wallet } from "lucide-react";
import AddFundDialog from "@/components/modules/AddFundDialog";
import AddTransactionDialog from "@/components/modules/AddTransactionDialog";
import EmptyState from "@/components/modules/EmptyState";
import type { Fund } from "@/lib";
import useLocalization from "@/lib/useLocalization";

interface FundsProps {
  funds: Fund[];
  addFund: (name: string) => Promise<void>;
  deleteFund: (fundId: string) => Promise<void>;
  addTransaction: (
    fundId: string,
    amount: number,
    description: string,
  ) => Promise<void>;
}

export const Funds = ({
  funds,
  addFund,
  deleteFund,
  addTransaction,
}: FundsProps) => {
  const { t } = useLocalization();

  const handleDeleteFund = async (fundId: string) => {
    await deleteFund(fundId);
  };

  return (
    <section className="space-y-4">
      <div>
        <div className="flex w-full justify-between items-center pb-1">
          <h2 className="text-lg font-bold ">{t("funds.title")}</h2>
          <AddFundDialog addFund={addFund} />
        </div>
        <hr />
      </div>
      <div className="pb-4 max-h-[calc(100vh-400px)] w-full overflow-y-auto">
        {funds.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title={t("funds.noFundsYet")}
            description={t("funds.noFundsDescription")}
          />
        ) : (
          <div className="space-y-3">
            {funds.map((fund) => (
              <Card className="py-3" key={fund.id}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-between">
                      <span className="text-base font-semibold">
                        {fund.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${fund.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFund(fund.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <AddTransactionDialog
                        id={fund.id}
                        addTransaction={addTransaction}
                        t={t}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Funds;

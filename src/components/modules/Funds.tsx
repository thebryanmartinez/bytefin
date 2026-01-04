import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import AddFundDialog from "@/components/modules/AddFundDialog";
import AddTransactionDialog from "@/components/modules/AddTransactionDialog";
import DeleteFundButton from "@/components/modules/DeleteFundButton";
import EmptyState from "@/components/modules/EmptyState";
import type { Fund } from "@/lib";
import useLocalization from "@/lib/useLocalization";

interface FundsProps {
  funds: Fund[];
  addFund: (name: string) => Promise<void>;
  deleteFund: (fundId: string) => Promise<void>;
  updateFundBalance: (fundId: string, newBalance: number) => Promise<void>;
}

export const Funds = ({
  funds,
  addFund,
  deleteFund,
  updateFundBalance,
}: FundsProps) => {
  const { t } = useLocalization();

  return (
    <section className="space-y-4">
      <div>
        <div className="flex w-full justify-between items-center pb-1">
          <h2 className="text-lg font-bold ">{t("funds.title")}</h2>
          <AddFundDialog addFund={addFund} />
        </div>
      </div>
      <div className="pb-4 max-h-[calc(100vh-400px)] w-full overflow-y-auto overflow-x-hidden">
        {funds.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title={t("funds.noFundsYet")}
            description={t("funds.noFundsDescription")}
          />
        ) : (
          <div className="space-y-3">
            {funds.map((fund) => (
              <Card className="py-3 bg-secondary-background" key={fund.id}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-between">
                      <span className="text-base font-semibold">
                        {fund.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        ${fund.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-x-2">
                      <DeleteFundButton
                        fundId={fund.id}
                        deleteFund={deleteFund}
                      />
                      <AddTransactionDialog
                        id={fund.id}
                        updateFundBalance={updateFundBalance}
                        currentBalance={fund.total}
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

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import AddFundDialog from "@/components/modules/AddFundDialog";
import AddTransactionDialog from "@/components/modules/AddTransactionDialog";

interface FundsProps {
  funds: Funds[];
}

interface Funds {
  id: string;
  name: string;
  balance: number;
}

export const Funds = ({ funds }: FundsProps) => {
  return (
    <section className="space-y-4">
      <div>
        <div className="flex w-full justify-between items-center pb-1">
          <h2 className="text-lg font-bold ">Funds</h2>
          <AddFundDialog />
        </div>
        <hr />
      </div>
      <div className="pb-4 max-h-[calc(100vh-400px)] w-full overflow-y-auto">
        <div className="space-y-3">
          {funds.map((fund) => (
            <Card className="py-3" key={fund.id}>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col justify-between">
                    <span className="text-base font-semibold">{fund.name}</span>
                    <span className="text-sm text-gray-500">
                      ${fund.balance.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      // TODO: Add delete fund functionality
                      // onClick={() => handleDeleteSection(fund.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    {/*TODO: Add 'id' prop functionality*/}
                    <AddTransactionDialog id="1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Funds;

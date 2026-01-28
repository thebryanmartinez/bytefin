import { z } from "zod";
import type { LocalizationKey } from "@/modules/shared/hooks";

export type AddTransactionSchemaProps = {
  amount: number;
};

export const addTransactionSchema = (t: (key: LocalizationKey) => string) =>
  z.object({
    amount: z.transform(Number).pipe(
      z
        .number(t("funds.amountMustBeNumber"))
        .positive(t("funds.amountMustNotBeZero"))
        .or(z.number().negative(t("funds.amountMustNotBeZero"))),
    ),
  });

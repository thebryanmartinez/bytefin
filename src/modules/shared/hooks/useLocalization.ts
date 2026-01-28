import enLocale from "@/modules/shared/localization/en.json";

type NestedKey<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${string & K}.${string & NestedKey<T[K]>}`
        : K;
    }[keyof T]
  : never;

type LocalizationKey = NestedKey<typeof enLocale>;

export const useLocalization = () => {
  const t = (key: LocalizationKey): string => {
    const keys = key.split(".");
    let value: any = enLocale;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t };
};

export type { LocalizationKey };

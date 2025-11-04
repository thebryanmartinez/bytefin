import { ThemeToggle } from "@/components/modules/ThemeToggle";
import useLocalization from "@/lib/useLocalization";

export const Header = () => {
  const { t } = useLocalization();

  return (
    <section className="flex justify-between items-center py-4">
      <span></span>
      <h1 className="text-2xl font-bold">{t("header.title")}</h1>
      <ThemeToggle />
    </section>
  );
};

export default Header;

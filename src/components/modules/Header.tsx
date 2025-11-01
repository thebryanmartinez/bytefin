import { ThemeToggle } from "@/components/modules/ThemeToggle";

export const Header = () => {
  return (
    <section className="flex justify-between items-center py-4">
      <span></span>
      <h1 className="text-2xl font-bold">ByteFin</h1>
      <ThemeToggle />
    </section>
  );
};

export default Header;

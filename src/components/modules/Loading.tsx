import { Spinner } from "@/components/ui/spinner";
import useLocalization from "@/lib/useLocalization";

interface LoadingProps {
  message?: string;
  className?: string;
}

export const Loading = ({ message, className }: LoadingProps) => {
  const { t } = useLocalization();
  const displayMessage = message || t("common.loading");
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Spinner className="size-6" />
      <p className="mt-2 text-sm text-muted-foreground">{displayMessage}</p>
    </div>
  );
};

export default Loading;
import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  message?: string;
  className?: string;
}

export const Loading = ({ message = "Loading...", className }: LoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Spinner className="size-6" />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loading;
import { Spinner } from "../ui/spinner";

export function FullPageSpinner() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Spinner className="text-muted-foreground" />
    </div>
  );
}

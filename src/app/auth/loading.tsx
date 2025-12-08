import { Spinner } from "@/components/ui/spinner";

const AuthLoading = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <Spinner />
    </div>
  );
};
export default AuthLoading;

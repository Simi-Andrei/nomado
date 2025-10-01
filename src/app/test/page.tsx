import { auth } from "@/lib/auth";

const TestPage = async () => {
  const session = await auth();

  console.log(session);

  return <div>TestPage</div>;
};

export default TestPage;

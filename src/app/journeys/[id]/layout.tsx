const JourneyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <div className="bg-red-200 hidden lg:block min-w-72">1</div>
      <div className="flex-1">
        <div className="bg-blue-200">Header</div>
        <div>{children}</div>
      </div>
      <div className="bg-green-200 hidden xl:block min-w-72">2</div>
    </div>
  );
};

export default JourneyLayout;

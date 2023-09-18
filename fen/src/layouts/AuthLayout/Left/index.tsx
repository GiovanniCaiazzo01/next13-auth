type LeftProps = {
  readonly label: string;
};
const Left = ({ label }: LeftProps) => {
  return (
    <div className="w-6/12  hidden xl:flex items-center justify-center p-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-white text-black text-9xl font-black">{label}</h1>
    </div>
  );
};

export default Left;

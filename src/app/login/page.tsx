import { Left, Right } from "@/components";

const Login = () => {
  const onSubmit = async (data: FormData): Promise<void> => {
    "use server";
    const username = data.get("username")?.valueOf();
    const password = data.get("password")?.valueOf();
    console.log(username, password);
  };
  return (
    <div className="flex justify-start w-full h-screen">
      <Left />
      <Right onSubmit={onSubmit} />
    </div>
  );
};
export default Login;

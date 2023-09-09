import { AuthLayout } from "@/layouts";

// const onSubmit = async (data: FormData): Promise<boolean> => {
//   "use server";

//   const username = data.get("username")?.valueOf();
//   const userLen = username?.toLocaleString().length;
//   const password = data.get("password")?.valueOf();
//   const passwordLen = password?.toLocaleString().length;

//   if (!username || userLen === 0 || !password || passwordLen === 0) {
//     return false;
//   }

//   return true;
// };

type AuthPageProps = {
  params: { direzione: string };
};
const AuthPage = ({ params }: AuthPageProps) => {
  const { direzione } = params;

  const leftLabel = direzione === "login" ? "Welcome Back!" : "Welcome Fella!";
  const rightTopHeading = direzione === "login" ? "Login" : "Register";
  const rightTopParagraph =
    direzione === "login"
      ? "Welcome back! Please login to your account."
      : "Welcome to our website! 🌟 Get ready to embark on a journey into the world of programming! ";
  const buttonLabel = direzione === "login" ? "Login" : "Register";
  const rightBottomLabelLeft =
    direzione === "login" ? "New User?" : "Already a user?";
  const rightBottomLabelRigh = direzione === "login" ? "Signup" : "Signin";

  return (
    <AuthLayout
      leftLabel={leftLabel}
      rightTopHeading={rightTopHeading}
      rightTopParagraph={rightTopParagraph}
      buttonLabel={buttonLabel}
      rightBottomLabelLeft={rightBottomLabelLeft}
      rightBottomLabelRight={rightBottomLabelRigh}
    />
  );
};
export default AuthPage;

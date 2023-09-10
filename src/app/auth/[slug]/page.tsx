import { AuthLayout } from "@/layouts";
import { checkAuthParam } from "../utils";
import { PostRegister } from "./api/entry-point/route";

const doLogin = async (data: FormData): Promise<boolean> => {
  "use server";

  const username = data.get("username")?.valueOf();
  const userLen = username?.toLocaleString().length;
  const password = data.get("password")?.valueOf();
  const passwordLen = password?.toLocaleString().length;

  if (!username || userLen === 0 || !password || passwordLen === 0) {
    return false;
  }

  return true;
};

const doRegister = async (data: FormData) => {
  "use server";
  const username = data.get("username")?.valueOf();
  const password = data.get("password")?.valueOf();
  const userLen = username?.toLocaleString().length;
  const passwordLen = password?.toLocaleString().length;

  if (!userLen || userLen === 0 || !passwordLen || passwordLen === 0) {
    throw new Error("cosa");
  }
  const payload = {
    username,
    password,
  };
  PostRegister(payload);
};

type AuthPageProps = {
  params: { slug: string };
};

const AuthPage = ({ params }: AuthPageProps) => {
  const { slug } = params;

  if (slug !== "login" && slug !== "register") {
    throw new Error(
      "Looks like you have found the doorway to the great nothing"
    );
  }
  const isLogin = checkAuthParam(slug);

  const leftLabel = isLogin ? "Welcome Back!" : "Welcome Fella!";
  const rightTopHeading = isLogin ? "Login" : "Register";
  const buttonLabel = isLogin ? "Login" : "Register";
  const rightBottomLabelLeft = isLogin ? "New User?" : "Already a user?";
  const rightBottomLabelRigh = isLogin ? "Signup" : "Signin";
  const rightBottomLink = isLogin ? "/auth/register" : "/auth/login";
  const rightMiddleLink = isLogin ? "Forget password?" : false;
  const rightTopParagraph = isLogin
    ? "Welcome back! Please login to your account."
    : "Welcome to our website! 🌟 Get ready to embark on a journey into the world of programming! ";

  return (
    <div className="w-full h-screen flex justify-start">
      <AuthLayout
        leftLabel={leftLabel}
        rightTopHeading={rightTopHeading}
        rightTopParagraph={rightTopParagraph}
        buttonLabel={buttonLabel}
        rightMiddleLink={rightMiddleLink}
        rightBottomLabelLeft={rightBottomLabelLeft}
        rightBottomLabelRight={rightBottomLabelRigh}
        rightBottomLink={rightBottomLink}
        onSubmit={doRegister}
      />
    </div>
  );
};
export default AuthPage;

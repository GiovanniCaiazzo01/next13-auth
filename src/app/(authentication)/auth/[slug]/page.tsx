import { AuthLayout } from "@/layouts";
import { checkAuthParam, doLogin, doRegister } from "@/lib/UTILS/utils";

type AuthPageProps = {
  params: { slug: string };
};

const AuthPage = async ({ params }: AuthPageProps) => {
  const { slug } = params;

  if (slug !== "login" && slug !== "register") {
    throw new Error(
      "Looks like you have found the doorway to the great nothing"
    );
  }

  const isLogin = await checkAuthParam(slug);
  const haveEmailField = isLogin ? false : true;
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

  const handleSubmit = async (data: FormData) => {
    "use server";
    if (!isLogin)
      return await doRegister(data).then((data) =>
        console.log("register data", data)
      );

    return await doLogin(data).then((data) => console.log("login data", data));
  };

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
        haveEmailField={haveEmailField}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default AuthPage;

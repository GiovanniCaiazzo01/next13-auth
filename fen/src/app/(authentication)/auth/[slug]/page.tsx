import { prisma } from "@/db";
import { AuthLayout } from "@/layouts";
import { checkAuthParam } from "@/lib/UTILS/utils";
import { redirect } from "next/navigation";

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
  const leftLabel = isLogin ? "Welcome Back!" : "Welcome!";
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

    // just to see how it is works
    const username = data.get("username");
    const password = data.get("password");
    const email = data.get("email");

    const isRegister = username && email && password ? true : false;
    if (isRegister) {
      await prisma.user.create({ data: { username, password, email } });
      return redirect("/auth/login");
    } else {
      const user = await prisma.user.findFirst({
        where: {
          username: {
            contains: username,
          },
        },
      });
      if (!user) {
        return <p>ciao</p>;
      }
      return redirect("/");
    }
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

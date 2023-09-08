import Link from "next/link";

type RightProps = {
  onSubmit: (data: FormData) => Promise<void>;
};
const Right = ({ onSubmit }: RightProps) => {
  return (
    <div className="w-6/12 flex flex-col justify-center items-center">
      <div className="w-10/12">
        <div className="w-10/12 mb-14">
          <h1 className="text-5xl font-black mb-6">Login</h1>
          <p className="text-gray-400 text-xl">
            Welcome back! Please login to your Account
          </p>
        </div>
        <div>
          <form className="flex flex-col" action={onSubmit}>
            <span className=" mb-2.5 text-gray-400 font-semibold">
              User Name
            </span>
            <input
              className="mb-5 border rounded-xl p-3"
              type="text"
              name="username"
            />
            <span className="mb-2.5 text-gray-400 font-semibold">
              User Password
            </span>
            <input
              className=" mb-8 border rounded-xl p-3"
              type="password"
              name="password"
            />

            <div className="flex items-center justify-between flex-wrap mb-8">
              <div className="flex items-center mb-2 ">
                <input
                  className="text-black font-semibold mr-2"
                  type="checkbox"
                />
                <span className="text-black font-bold text-xs align-middle">
                  Remeber me
                </span>
              </div>
              <Link
                className="text-gray-400 font-semibold text-xs"
                href="/none"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="text-white font-semibold p-5 mb-14 bg-violet-500 border rounded-xl "
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="flex">
        <span className="text-gray-400 font-semibold mr-2">New User?</span>
        <Link className="text-violet-500 font-semibold" href="none">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Right;

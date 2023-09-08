import Link from "next/link";

const Right = () => {
  return (
    <div className="w-6/12 flex flex-col justify-center p-24">
      <div className="w-full">
        <div className="w-2/4 mb-14">
          <h1 className="text-5xl font-black mb-6">Login</h1>
          <p className="text-gray-400 text-xl">
            Welcome back! Please login to your Account
          </p>
        </div>
        <div>
          <form className="flex flex-col">
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

            <div className=" flex justify-center items-center p-4  mb-14 bg-violet-500 border rounded-xl">
              <button className="text-white font-semibold" type="submit">
                Login
              </button>
            </div>
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

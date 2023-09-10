type registerUser = {
  username: string;
  password: string;
};

export const registerUser = async (user_credentials: registerUser) => {
  const { username, password } = user_credentials;

  if (!username || !password) {
    return { result: false, message: "Please fill all the fields" };
  }
};

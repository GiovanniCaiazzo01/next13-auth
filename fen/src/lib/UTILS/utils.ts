"use server";

const checkAuthParam = async (param: string): Promise<boolean> => {
  const LOGIN = "login";
  return param === LOGIN ? true : false;
};

export { checkAuthParam };

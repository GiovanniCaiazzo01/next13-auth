const checkAuthParam = (param: string): boolean => {
  const LOGIN = "login";
  return param === LOGIN ? true : false;
};

export { checkAuthParam };

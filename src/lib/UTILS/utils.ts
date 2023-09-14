import { redirect } from "next/navigation";

const checkAuthParam = async (param: string): Promise<boolean> => {
  const LOGIN = "login";
  return param === LOGIN ? true : false;
};

const getCurrentDate = async (): Promise<string> => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;
  return dateString;
};

const checkMissingField = async (fields: {
  [key: string]: string | number;
}) => {
  for (const field in fields) {
    if (!fields[field]) return { result: true, missing_field: field };
  }
  return { result: false, missing_field: "" };
};

const doLogin = async (data: FormData) => {
  "use server";
  const username = data.get("username")?.valueOf();
  const password = data.get("password")?.valueOf();

  const payload = { username, password };
  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/entry-point/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    console.log(await response.json());
    redirect("/");
  } catch (error) {
    console.error(error);
  }
};

const doRegister = async (data: FormData) => {
  "use server";
  const username = data.get("username")?.valueOf().toString();
  const password = data.get("password")?.valueOf().toString();

  const payload = {
    username,
    password,
  };

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/entry-point/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    console.log(await response.json());
    return await response.json();
  } catch (error) {
    console.error("quiii?", error);
  }
};

export {
  checkAuthParam,
  getCurrentDate,
  checkMissingField,
  doRegister,
  doLogin,
};

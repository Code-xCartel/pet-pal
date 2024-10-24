import { jwtDecode } from "jwt-decode";
import { getSession } from "./auth/session";

interface User {
  id: string;
  email: string;
  username: string;
  subscription_model: string;
  exp: number;
  iat: number;
}

export const getUser = (): User | null => {
  try {
    const session = getSession();

    if (!session || !session.token) {
      return null;
    }

    const user = jwtDecode<User>(session.token);
    return user;
  } catch (error) {
    return null;
  }
};

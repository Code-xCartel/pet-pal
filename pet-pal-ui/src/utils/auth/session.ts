import { accessTokenKey, authSessionKey } from "../constants";

export type Token = {
  token: string;
  accessType: string;
};

export const createSession = (token: Token) => {
  // const payload = jwtDecode<JwtPayload>(token.token);
  localStorage.setItem(authSessionKey, JSON.stringify(token));
};

export const getSession = () => {
  let credentials;
  try {
    credentials = JSON.parse(localStorage.getItem(authSessionKey)!);
    if (!Object.keys(credentials).includes(accessTokenKey)) {
      credentials = null;
    }
  } catch (e) {
    credentials = null;
  }
  return credentials;
};

export const destroySession = () => {
  localStorage.removeItem(authSessionKey);
};

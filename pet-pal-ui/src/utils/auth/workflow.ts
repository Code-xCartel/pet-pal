import { logout, validate } from "@/redux/reducers/auth/loginReducer";
import { accessTokenKey, tokenType, requestMethod } from "../constants";
import { destroySession, getSession } from "./session";

export const workflowStarted = (dispatch: any) => {
  dispatch(logout());
  destroySession();
};

export const validateSession = async (dispatch: any) => {
  const session = await getSession();
  if (!session) {
    await dispatch(logout());
  } else {
    await dispatch(validate(session.user));
  }
};

export const getAuthToken = () => {
  let token;
  try {
    const credentials = getSession();
    if (credentials?.["token_type"] === tokenType) {
      token = `${requestMethod} ${credentials?.[accessTokenKey]}`;
    }
  } catch (e) {
    token = "";
  }
  return token;
};

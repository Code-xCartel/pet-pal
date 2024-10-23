import { ROUTES } from "@/constants/routes";
import { getAuthToken } from "./auth/workflow";
import { baseUrl, redirectKey } from "./constants";
import axios from "axios";

export const request = async (
  url: string,
  options: { data?: {}; method?: string; headers?: {} }
) => {
  let rawResponse;
  const authToken = getAuthToken();
  const requestContent = {
    ...options,
    headers: {
      ...options.headers,
      ...(authToken && { Authorization: authToken }),
    },
  };
  try {
    rawResponse = await axios({ url, ...requestContent });
  } catch (e: any) {
    rawResponse = {
      message: e.response.data.detail,
      status: e.response.status,
    };
    if (
      rawResponse?.status === 401 &&
      ![ROUTES.AUTH].includes(window.location.pathname)
    ) {
      localStorage.setItem(
        redirectKey,
        `${window.location.pathname}${window.location.search}`
      );
      window.location.assign(ROUTES.AUTH);
    }
    throw rawResponse;
  }
  return rawResponse;
};

export const POST = (
  endpoint: string,
  initialOptions: { body?: {}; query?: string },
  method: string = "post"
) => {
  const { body, query } = initialOptions;
  const options = {
    data: body,
    method: method,
  };
  const url = `${baseUrl}/${endpoint}${query ? `?${query}` : ""}`;
  return request(url, options);
};

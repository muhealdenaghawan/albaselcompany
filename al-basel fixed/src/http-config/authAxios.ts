import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./baseUrl";
import { Constants } from "@/constants/constants";

export const authAxios = axios.create({
  baseURL: baseUrl,
});

const getToken = () => {
  const accountString = Cookies.get(Constants.ACCOUNT);
  const token = accountString ? JSON.parse(accountString)?.token : undefined;
  return token;
};

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

//add your headers here
authAxios.interceptors.request.use((config: any) => {
  console.log("🚀 ~ authAxios.interceptors.request.use ~ token:", getToken());
  config.headers["Authorization"] = `Bearer ${getToken()} `;
  return config;
});

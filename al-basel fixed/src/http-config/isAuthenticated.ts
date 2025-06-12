import Cookies from "js-cookie";
import { Constants } from "@/constants/constants";

export function isAuthenticated() {
  const accountString = Cookies.get(Constants.ACCOUNT);
  const token = accountString ? JSON.parse(accountString)?.token : undefined;
  return !!token;
}

export default isAuthenticated;

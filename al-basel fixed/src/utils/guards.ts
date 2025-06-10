import { Constants, RolesConstant } from "@/constants/constants";
import { redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

function guardsIsAdmin() {
  const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
  const role = account.user.role;
  if (role !== RolesConstant.ADMIN) {
    throw redirect({ to: "/401" });
  }
}
export function guardsIsAdminOrEmployee() {
  const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
  const role = account.user.role;
  if (role !== RolesConstant.ADMIN && role !== RolesConstant.employee) {
    throw redirect({ to: "/401" });
  }
}
export function guardsIsNotAdmin() {
  const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
  const role = account.user.role;
  if (role === RolesConstant.ADMIN) {
    throw redirect({ to: "/401" });
  }
}
export function guardsIsEmployee() {
  const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
  const role = account.user.role;
  if (role !== RolesConstant.employee) {
    throw redirect({ to: "/401" });
  }
}
export function guardsIsClient() {
  const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
  const role = account.user.role;
  if (role !== RolesConstant.CLIENT) {
    throw redirect({ to: "/401" });
  }
}

export default guardsIsAdmin;

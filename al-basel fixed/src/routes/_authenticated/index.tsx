import { Constants, RolesConstant } from "@/constants/constants";
import { createFileRoute, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: () => {
    const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
    const role = account.user.role;
    if (role !== RolesConstant.ADMIN) {
      if (role === RolesConstant.CLIENT) throw redirect({ to: "/client" });
    }
    throw redirect({
      to: "/users",
      replace: true,
    });
  },
});

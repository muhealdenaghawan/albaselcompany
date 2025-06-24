import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthLayout from "../auth-layout";
import { UserAuthForm } from "./components/user-auth-form";
import { useTranslation } from "react-i18next";

export default function SignIn() {
      const {t} = useTranslation();
  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">{t("Login")}</CardTitle>
          <CardDescription>
           {t("Enter your email and password below to")} <br />
            {t("log into your account")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

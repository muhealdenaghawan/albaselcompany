import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthLayout from "../auth-layout";
import { SignUpForm } from "./components/sign-up-form";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const {t} = useTranslation();
  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">{t("Create an account")}</CardTitle>
          <CardDescription>
            {t("Enter your email and password to create an account")} <br />
            {t("Already have an account?")}{" "}
            <Link to="/sign-in" className="hover:text-primary underline underline-offset-4">
              {t("Sign In")}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

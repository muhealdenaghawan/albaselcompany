import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RolesConstant } from "@/constants/constants";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { cn } from "@/lib/utils";
import { TAuthAccount, useAuthStore } from "@/stores/authStore";
import { objectToFormData } from "@/utils/objectToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

type TBody = {
  email: string;
  password: string;
};

// ====================== submit function ======================
const submitFun = (body: TBody) => {
  const formData = objectToFormData(body);
  return authAxios.post(endPoints.loginEndpoint().pathname, formData);
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("Please enter your email") })
      .email({ message: t("Invalid email address") }),
    password: z
      .string()
      .min(1, {
        message: t("Please enter your password"),
      })
      .min(7, {
        message: t("Password must be at least 7 characters long"),
      }),
  });
  const navigation = useNavigate();
  const { auth } = useAuthStore();
  const mutationLogin = useMutation({
    mutationFn: submitFun,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutationLogin.mutateAsync(data).then((res: { data: TAuthAccount }) => {
      if (res.data.user.role === RolesConstant.CLIENT) {
        navigation({ to: "/client" });
      }
      else if (res.data.user.role === RolesConstant.employee) {
        navigation({ to: "/projects" });
      }
      else {
        navigation({ to: "/" });
      }
      auth.setAccount(res.data);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Email")}</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t("Password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={mutationLogin.isPending}>
          {mutationLogin.isPending ? (
            <Loader2 className=" h-4 w-4 animate-spin" />
          ) : (
            t("Login")
          )}
        </Button>
        <Link
          to="/sign-up"
          className="text-muted-foreground text-sm text-center font-medium hover:opacity-75"
        >
          {t("You don't have account")}
        </Link>
      </form>
    </Form>
  );
}

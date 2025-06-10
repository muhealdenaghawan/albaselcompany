import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RolesConstant } from "@/constants/constants";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { cn } from "@/lib/utils";
import { TAuthAccount, useAuthStore } from "@/stores/authStore";
import { objectToFormData } from "@/utils/objectToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

type SignUpFormProps = HTMLAttributes<HTMLFormElement>;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { t } = useTranslation();
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  const formSchema = z
    .object({
      first_name: z.string().min(1, t("required")),
      last_name: z.string().min(1, t("required")),
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
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Passwords don't match"),
      path: ["confirmPassword"],
    });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return authAxios.post(endPoints.signUp().pathname, data);
    },
    onSuccess: (response: { data: TAuthAccount }) => {
      auth.setAccount(response.data);
      if (response.data.user.role === RolesConstant.CLIENT) {
        navigate({ to: "/client" });
      } else if (response.data.user.role === RolesConstant.employee) {
        navigate({ to: "/projects" });
      } else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      // Handle error (e.g., show toast notification)
      console.error("Sign up failed:", error);
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = objectToFormData(data);
    mutation.mutate(formData);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-3", className)} {...props}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("First Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("first name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Last Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Last Name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem>
              <FormLabel>{t("Password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Confirm Password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className=" h-4 w-4 animate-spin" /> : t("Create Account")}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </form>
    </Form>
  );
}

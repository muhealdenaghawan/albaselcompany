import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";
import { authAxios } from "@/http-config/authAxios";
import { objectToFormData } from "@/utils/objectToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

const profileFormSchema = (t: (key: string) => string) =>
  z.object({
    first_name: z
      .string()
      .min(2, {
        message: t("settings.profile_section.validation.first_name_min"),
      })
      .max(30, {
        message: t("settings.profile_section.validation.first_name_max"),
      }),
    last_name: z
      .string()
      .min(2, {
        message: t("settings.profile_section.validation.last_name_min"),
      })
      .max(30, {
        message: t("settings.profile_section.validation.last_name_max"),
      }),
    email: z
      .string({
        required_error: t("settings.profile_section.validation.email_required"),
      })
      .email(t("settings.profile_section.validation.email_invalid")),
  });

type ProfileFormValues = z.infer<ReturnType<typeof profileFormSchema>>;

const updateProfile = async (data: ProfileFormValues) => {
  const formData = objectToFormData(data);
  const response = await authAxios.post("/user/update-profile", formData);
  return response.data;
};

export default function ProfileForm() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { auth } = useAuthStore();
  const user = auth?.account?.user;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema(t)),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    },
    mode: "onChange",
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      auth.setAccount(data);
      toast.success(t("settings.profile_section.profile_updated"));
    },
    onError: () => {
      toast.error(t("settings.profile_section.update_failed"));
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.profile_section.first_name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "settings.profile_section.first_name_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("settings.profile_section.first_name_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.profile_section.last_name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "settings.profile_section.last_name_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("settings.profile_section.last_name_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.profile_section.email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("settings.profile_section.email_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("settings.profile_section.email_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending
            ? t("settings.profile_section.updating_profile")
            : t("settings.profile_section.update_profile")}
        </Button>
      </form>
    </Form>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { objectToFormData } from "@/utils/objectToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import SettingButton from "@/components/setting";

function ClientProject() {
  const { t } = useTranslation();
  const formSchema = z.object({
    title: z.string().min(1, t("Title is required")),
    description: z.string().min(1, t("Description is required")),
    location: z.string().min(1, t("Location is required")),
    file: z.instanceof(File).optional(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return authAxios.post(endPoints.projectEndpoint().pathname + "/create-project", data);
    },
    onSuccess: () => {
      toast.success(t("project.submitSuccess"));
      form.reset();
    },
    onError: () => {
      toast.error(t("project.submitError"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      location: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = objectToFormData(data);
    mutation.mutate(formData, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img src="/public/logo.png" className="w-16 h-16" alt="Logo" />
          <h1 className="text-2xl font-bold">{t("project.welcome")}</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitch />
          <ProfileDropdown />
          <SettingButton />
        </div>
      </div>

      {/* Main form in card */}
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg mt-30">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{t("project.Create new project")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("project.title")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("project.titlePlaceholder")}
                            {...field}
                            className="focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("project.description")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("project.descriptionPlaceholder")}
                            {...field}
                            className="focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("project.location")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("project.locationPlaceholder")}
                            {...field}
                            className="focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>{t("project.file")}</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Input
                              accept="application/pdf"
                              type="file"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              className="focus-visible:ring-primary"
                            />
                            {value && <span className="text-sm text-muted-foreground">{value.name}</span>}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-4" />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading} className="min-w-32">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("project.submit")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ClientProject;

import { type DefaultValues, FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { DialogComponent } from "@/components/shared/DialogComponent";
import DynamicFormField from "@/components/shared/form/DynamicFormField";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { FormConfig } from "./GenericClientTable";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { createEntity, FormResponse, updateEntity } from "@/http-config/genericApi";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "file" | "date" | "image" | "boolean" | "checkbox" | "custom";
  component?: any;
  options?: { label: string; value: string | number }[];
  editable?: boolean;
};

export type GenericFormProps<T> = {
  mode: "create" | "update";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
  slug?: string;
  fields: FieldConfig[];
  endpoint: string;
  title: string;
  selectedItem?: T;
  formConfig: FormConfig;
};

export function GenericForm<T>({
  mode,
  isOpen,
  setIsOpen,
  onSuccess,
  slug = "",
  fields,
  endpoint,
  title,
  selectedItem,
  formConfig,
}: GenericFormProps<T>) {
  const isUpdateMode = mode === "update";
  const { t } = useTranslation();

  const getDefaultValues = (): Partial<T> => {
    const defaults: Partial<T> = {} as Partial<T>;
    fields.forEach((field) => {
      if (field.type === "boolean") {
        (defaults as Record<string, any>)[field.name] = 0;
      }
    });
    return defaults;
  };

  const form = useForm<Partial<T>>({
    defaultValues: getDefaultValues() as DefaultValues<Partial<T>>,
    mode: "onBlur",
  });

  useEffect(() => {
    if (isUpdateMode && selectedItem) {
      form.reset(selectedItem);
    } else {
      form.reset(getDefaultValues() as DefaultValues<Partial<T>>);
    }
  }, [isUpdateMode, selectedItem, form]);

  const toFormData = (data: Partial<T>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (typeof value == "boolean") {
          formData.append(key, String(value ? 1 : 0));
          console.log("🚀 ~ Object.entries ~ value ? 1 : 0):", value ? 1 : 0);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    return formData;
  };

  const mutation = useMutation<FormResponse<T>, Error, Partial<T>>({
    mutationFn: async (data: Partial<T>) => {
      const formData = toFormData(data);
      const newData = formConfig?.typeHeader === "JSON" ? data : formData;
      return isUpdateMode && selectedItem
        ? updateEntity<T>(endpoint, slug, newData)
        : createEntity<T>(endpoint, newData);
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        onSuccess?.();
        if (!isUpdateMode) form.reset({});
        setIsOpen(false);
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, messages]) => {
            form.setError(field as keyof Partial<T> as any, {
              type: "manual",
              message: messages.join(", "),
            });
          });
        }
        toast.error(res.message || t("Operation failed"));
      }
    },
    onError: (error) => {
      toast.error(t("Something went wrong"));
      console.error("Mutation error:", error);
    },
  });

  const onSubmit = (data: Partial<T>) => {
    const newData = formConfig?.dataBeforeSend ? formConfig.dataBeforeSend(data) : data;
    mutation.mutate(newData);
    // alert("done");
  };

  return (
    <DialogComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`${isUpdateMode ? t("Update") : t("Create")} ${title}`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {fields.map((field, index) => {
            if (isUpdateMode && field.editable === false) return null;
            return (
              <DynamicFormField
                mode={mode}
                key={String(field.name)}
                item={field}
                form={form}
                index={index}
                disabled={mutation.isPending}
              />
            );
          })}
          <Separator className="my-2" />
          <div className="flex justify-end gap-2">
            {/* <Button
              type="button"
              variant="outline"
              // onClick={() => form.reset(selectedItem ?? {})}
              disabled={mutation.isPending}
            >
              {t("Reset")}
            </Button> */}
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <Loader2 className=" h-4 w-4 animate-spin" />
              ) : (
                `${isUpdateMode ? t("Update") : t("Create")} ${title}`
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </DialogComponent>
  );
}

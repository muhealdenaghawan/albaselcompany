import DynamicFormField from "@/components/shared/form/DynamicFormField";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TProject } from "@/features/projects";
import { authAxios } from "@/http-config/authAxios";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function MaterialsField() {
  const { t } = useTranslation();
  const { data: martialData, isFetching: isLoadingMatrials } = useQuery({
    queryKey: ["custom services project"],
    queryFn: async () => {
      const response = await authAxios.get("/material/get-all-material");
      return response.data;
    },
    staleTime: 0,
  });

  const optionMatrial = martialData?.data?.data?.map((proj: TProject) => ({
    label: proj.name,
    value: proj.id,
  }));

  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "materials",
  });
  if (isLoadingMatrials) return <>loading...</>;
  return (
    <div className="mt-4">
      {fields.map((f, index) => (
        <div className="flex gap-4 justify-between items-center mb-4 " key={f.id}>
          <div className="flex flex-col justify-between">
            <div className="mb-2">
              <FormLabel>{t("Materials")}</FormLabel>
            </div>
            <DynamicFormField
              key={``}
              withLabel={false}
              item={{
                name: `materials[${index}].material_id`,
                field_key: "materials_id",
                type: "select",
                label: t("Materials"),
                data_type: "text",
                data: optionMatrial ?? [],
                placeholder: t("Materials"),
                editable: true,
                validation: {
                  required: t("materials required"),
                },
              }}
              form={{ control }}
              index={index}
              disabled={false}
            />
          </div>
          <FormField
            control={control}
            name={`materials[${index}].quantity_used`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quantity_used")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("quantity_used")}
                    {...field}
                    className="focus-visible:ring-primary flex-1 no-spinner "
                    type={"number"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`materials[${index}].price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Price")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Price")}
                    {...field}
                    className="focus-visible:ring-primary flex-1 no-spinner "
                    type={"number"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          append({ quantity_used: 0, price: 0, material_id: 0 });
        }}
      >
        + {t("add_materials")}
      </Button>
    </div>
  );
}

export default MaterialsField;

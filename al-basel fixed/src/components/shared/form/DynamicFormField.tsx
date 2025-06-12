import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SelectComponent } from "../SelectComponent";

import UploadImage from "../UploadImage";

import UploadFile from "../uploadingFile";

function DynamicFormField({ form, item, index, withLabel = true, disabled, className, mode }: DynamicFormFieldProps) {
  return (
    <div>
      <FormField
        control={form.control}
        key={index}
        name={item.name}
        rules={mode === "update" ? (item.edit_validation ?? item.validation) : item.validation}
        render={({ field, fieldState }) => {
          switch (item.type) {
            case "text":
              return (
                <FormItem>
                  <div className="flex-between md:gap-6 max-md:flex-col max-md:gap-2 max-md:items-start">
                    {withLabel && <FormLabel className="capitalize w-40">{item.label}</FormLabel>}
                    <FormControl>
                      <Input
                        placeholder={item.placeholder}
                        {...field}
                        disabled={disabled}
                        type={item.data_type}
                        value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
                      />
                    </FormControl>
                  </div>
                  {fieldState.error && (
                    <FormMessage className="text-xs !text-destructive">{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              );
            case "select":
              return (
                <FormItem className={className ? className : "min-w-[150px]"}>
                  <div className="flex-between md:gap-6 max-md:flex-col max-md:gap-2 max-md:items-start">
                    {withLabel && <FormLabel className="capitalize w-40">{item.label}</FormLabel>}
                    <SelectComponent
                      // selectItems={[...(Array.isArray(item.data) ? item.data : [])]}
                      selectItems={Array.isArray(item.data) ? item.data : []}
                      placeholder={item.placeholder}
                      value={field.value as string | undefined}
                      onSelect={field.onChange}
                      disabled={disabled}
                      className="w-full"
                    />
                  </div>
                  {fieldState.error && (
                    <FormMessage className="text-xs !text-destructive">{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              );

            case "boolean":
              return withLabel ? (
                <FormItem className="flex flex-row items-center justify-start gap-20 rounded-lg p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>{item.label}</FormLabel>
                    {item.description && <FormDescription>{item.description}</FormDescription>}
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 1 || field.value === true}
                      disabled={disabled}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked ? 1 : 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs !text-destructive" />
                </FormItem>
              ) : (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value === 1 || field.value === true}
                      disabled={disabled}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked ? 1 : 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs !text-destructive" />
                </FormItem>
              );
            case "image":
              return (
                <FormItem>
                  <div className="flex-start md:gap-6 max-md:flex-col max-md:gap-2 max-md:items-start">
                    {withLabel && <FormLabel className="capitalize w-28">{item.label}</FormLabel>}
                    <UploadImage imageWidth={100} imageHeight={100} image={field.value} setImage={field.onChange} />
                  </div>
                  {fieldState.error && (
                    <FormMessage className="text-xs !text-destructive">{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              );
            case "file":
              return (
                <FormItem>
                  <div className="flex-start md:gap-6 max-md:flex-col max-md:gap-2 max-md:items-start">
                    {withLabel && <FormLabel className="capitalize w-28">{item.label}</FormLabel>}
                    <UploadFile
                      containerWidth={110}
                      containerHeight={110}
                      iconSize={35}
                      file={field.value}
                      onFileChange={field.onChange}
                    />
                  </div>
                  {fieldState.error && (
                    <FormMessage className="text-xs !text-destructive">{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              );
            case "custom":
              return <FormItem>{item.component}</FormItem>;
            default:
              return <div />;
          }
        }}
      />
    </div>
  );
}

export default React.memo(DynamicFormField);

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRTL } from "@/hooks/use-rtl";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SelectComponent({
  className,
  selectItems,
  placeholder = "Select an option",
  value: controlledValue,
  onSelect,
  onChange,
  ref,
  onValueChange,
  defaultValue,
  disabled,
}: SelectComponentProps) {
  const [internalValue, setInternalValue] = useState<string>("");

  const handleSelect = (newValue: string) => {
    setInternalValue(newValue);
    onSelect?.(newValue);
    onChange?.(newValue);
  };
      const isRTL = useRTL();
  return (
    <Select
      value={controlledValue ?? internalValue}
      onValueChange={onValueChange ? onValueChange : handleSelect}
      defaultValue={defaultValue ? defaultValue : undefined}
      disabled={disabled}
      dir={isRTL?"rtl":"ltr"}
    >
      <SelectTrigger
        ref={ref}
        className={cn("w-[180px] focus:ring-primary border focus-visible:ring-primary  ", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="z-[100]" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
        {selectItems.map((item, index) => {
          return (
            <SelectItem key={`${item.value}-${index}`} value={String(item.value)} className="cursor-pointer">
              {item.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

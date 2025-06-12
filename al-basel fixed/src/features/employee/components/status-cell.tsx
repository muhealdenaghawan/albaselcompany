import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRTL } from "@/hooks/use-rtl";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const items = [
  "pending",
  "pricing",
  "priced",
  "rejected",
  "in_progress",
  "completed",
];
type Props = { value?: any; rowData?: any };

// ====================== onChange function ======================
const submitFun = ({ value, rowData }: any) => {
  return authAxios.put(
    endPoints.projectEndpoint().pathname +
      "/update-status-and-price/" +
      rowData?.slug,
    {
      status: value,
      quote_price: rowData?.quote_price,
    }
  );
};

function StatusCell({ value, rowData }: Props) {
    const { t } = useTranslation();
  const [state, setState] = useState(value);
        const isRTL = useRTL();
  const mutation = useMutation({
    mutationFn: submitFun,
  });

  const onChange = (e: any) => {
    mutation.mutateAsync({ value: e, rowData: rowData }).then(() => {
      setState(e);
    });
  };
  return (
    <div className="w-full flex-center">
    <Select
      value={state}
      onValueChange={onChange}
      disabled={mutation.isPending}
      dir={isRTL?"rtl":"ltr"}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem value={item}>{t(item)}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}
export default StatusCell;

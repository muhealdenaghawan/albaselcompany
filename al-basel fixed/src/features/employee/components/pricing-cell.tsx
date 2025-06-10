import { Input } from "@/components/ui/input";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

type Props = { value?: any; rowData?: any };
// ====================== onChange function ======================
const onChange = ({ value, rowData }: any) => {
  return authAxios.put(endPoints.projectEndpoint().pathname + "/update-status-and-price/" + rowData?.slug, {
    status: rowData?.status,
    quote_price: value,
  });
};
function PriceCell({ value, rowData }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // to store the timeout ID

  const [state, setState] = useState(value);
  const mutation = useMutation({
    mutationFn: onChange,
  });

  return (
    <div className="w-full flex-center">
      <Input
        className="no-spinner w-32"
        disabled={mutation.isPending}
        type="number"
        value={state}
        onChange={(e) => {
          const value = e.target.value;
          setState(value);

          // Clear any previous timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Set new debounce timeout
          timeoutRef.current = setTimeout(() => {
            mutation.mutate({ value, rowData });
          }, 1000);
        }}
      />
    </div>
  );
}

export default PriceCell;

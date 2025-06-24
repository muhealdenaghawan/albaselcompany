import { ApiResponse } from "@/http-config/useEntityList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRTL } from "@/hooks/use-rtl";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type Props = { value?: any; rowData?: any };
type TUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

function AddEmployee({ value }: Props) {
  const { t } = useTranslation();
   const isRTL = useRTL();
  const [clientId, setClientId] = useState("0");
  const [open, setOpen] = useState(false);
  const { data, isSuccess } = useQuery<ApiResponse<TUser>, AxiosError>({
    queryKey: ["getAllEmployee"],
    queryFn: async () => {
      const response = await authAxios.get<ApiResponse<TUser>>("/user/get-all-user");
      return response.data;
    },
  });

  const mutate = useMutation({
    mutationFn: () => {
      return authAxios.put(endPoints.projectEndpoint().pathname + "/assign-employee/" + value, {
        client_id: clientId,
      });
    },
    onSuccess: () => {
      toast.success(t("Adding employee successfully"));
      setOpen(false); 
    },
    onError: () => {
      toast.error(t("Operation failed"));
    }
  });

  const employeeData = data?.data?.data?.filter((d) => d.role === "employee");

  return (
    <div className="text-center">
      <Dialog  open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{t("Add Employee")}</Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-start">{t("Add Employee")}</DialogTitle>
            <DialogDescription className="text-start">{t("Add one employee for your project")}</DialogDescription>
          </DialogHeader>
          {isSuccess && (
            <div className="py-4 h-[60vh] overflow-auto">
              <RadioGroup
              dir={isRTL?"rtl":"ltr"}
                defaultValue="0"
                onValueChange={(e) => {
                  setClientId(e);
                }}
              >
                {employeeData?.map((d: any) => (
                  <div key={d.id} className="flex gap-2 items-center px-3 border border-md border-gray-500 m-1 rounded-md">
                    <RadioGroupItem value={d.id} id={d.id} />
                    <Label htmlFor={d.id} className="w-full py-4 cursor-pointer">
                      {d.first_name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          <DialogFooter>
            <Button
              className="mx-auto"
              type="submit"
              onClick={() => mutate.mutateAsync()}
              disabled={mutate.isPending}
            >
              {mutate.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("Save changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEmployee;
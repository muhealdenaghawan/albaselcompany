import { authAxios } from "@/http-config/authAxios";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = { value?: any; rowData?: any };

// ====================== API call function ======================
const fetchCost = ({ rowData }: any) => {
  return authAxios.get("/project-service/calculate-project-cost/" + rowData?.slug);
};

function CostCell({ rowData }: Props) {
  const [cost, setCost] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation();

  const mutation = useMutation({
    mutationFn: fetchCost,
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      setCost(response.data.cost);
    },
    onError: (error: any) => {
      setError(error.message || t("Failed to fetch cost"));
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    // Fetch cost when component mounts or rowData changes
    if (rowData?.slug) {
      mutation.mutate({ rowData });
    }
  }, [rowData?.slug]);

  return (
    <div className="w-full flex-center">
      {isLoading ? (
        <div className="text-sm text-gray-500 text-center"><Loader2 className=" h-4 w-4 animate-spin" /></div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <div className="text-sm font-medium">
          {cost !== null ? `$${cost.toLocaleString()}` : "N/A"}
        </div>
      )}
    </div>
  );
}

export default CostCell;
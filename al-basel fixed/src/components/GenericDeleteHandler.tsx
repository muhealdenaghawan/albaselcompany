import AlertDialogComponant from "@/components/shared/AlertDialogComponant";
import { useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { deleteEntity } from "@/http-config/genericApi";

type DeleteResponse = {
  status: number;
  message: string;
  success: boolean;
  error?: string;
  data?: null;
};

type GenericDeleteHandlerProps = {
  slug: string;
  name: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onDeleteSuccess: () => void;
  endpoint: string;
  title: string;
};

export function GenericDeleteHandler({
  slug,
  name,
  isOpen,
  setIsOpen,
  onDeleteSuccess,
  endpoint,
  title,
}: GenericDeleteHandlerProps) {
  const mutation = useMutation<DeleteResponse, Error, void>({
    mutationFn: async (): Promise<DeleteResponse> => {
      const response = await deleteEntity(endpoint, slug);
      return response;
    },
    onSuccess: (res: DeleteResponse) => {
      if (res.success) {
        toast.success(`${title.toLowerCase()} deleted successfully`);
        setIsOpen(false);
        onDeleteSuccess();
      } else {
        toast.error(res.error || `Failed to delete ${title.toLowerCase()}`);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete ${title.toLowerCase()}`);
      console.error("Delete error:", error);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      mutation.reset();
    }
  }, [isOpen, mutation]);

  const handleDelete = (): void => {
    mutation.mutate();
  };

  const handleSetIsOpen = (newState: boolean): void => {
    if (!mutation.isPending) {
      setIsOpen(newState);
    }
  };

  if (!slug) return null;

  const {t} = useTranslation();

  return (
    <AlertDialogComponant
      isOpen={isOpen}
      setIsOpen={handleSetIsOpen}
      buttonText={mutation.isPending ? <Loader2 className=" h-4 w-4 animate-spin" /> : t("Delete")}
      isLoading={mutation.isPending}
      buttonClassName="bg-red-500 hover:bg-red-600"
      description={`${t("This will permanently delete the")} ${title.toLowerCase()} "${name}".${t("This action cannot be undone")}.`}
      onSubmit={handleDelete}
      title={t("Are you sure?")}
      closeOnClickOutside={!mutation.isPending}
      closeOnEsc={!mutation.isPending}
    />
  );
}
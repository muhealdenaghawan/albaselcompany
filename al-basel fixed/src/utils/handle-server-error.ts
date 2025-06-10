import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error);

  let errMsg = "Something went wrong!";

  if (error && typeof error === "object" && "status" in error && Number(error.status) === 204) {
    errMsg = "Content not found.";
  }

  if (error instanceof AxiosError) {
    if (error.response?.data.message) errMsg = error.response?.data.message;
  }

  toast.error(errMsg);
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AlertDialogComponant({
  isOpen,
  setIsOpen,
  title,
  description,
  buttonText,
  buttonClassName = "",
  onSubmit,
  isLoading = false,
  closeOnClickOutside = true,
  closeOnEsc = true,
}: AlertDialogComponantProps) {
  const { t } = useTranslation();
  const handleAction = () => {
    // Don't close the dialog here, let the parent component control it
    onSubmit();
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        // Only allow closing if not loading and if closeOnClickOutside is true
        if (!isLoading || (open && !closeOnClickOutside)) {
          setIsOpen(open);
        }
      }}
    >
      <AlertDialogContent
        onEscapeKeyDown={(e) => {
          // Prevent Esc key from closing the dialog if closeOnEsc is false
          if (!closeOnEsc || isLoading) {
            e.preventDefault();
          }
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{t("Cancel")}</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={(e) => {
              // Prevent the default action which would close the dialog
              e.preventDefault();
              handleAction();
            }}
          >
            <Button className={buttonClassName} disabled={isLoading}>
              {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
              {buttonText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

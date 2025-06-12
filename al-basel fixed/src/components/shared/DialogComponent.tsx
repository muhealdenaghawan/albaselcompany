import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InnerDialog,
  InnerDialogClose,
  InnerDialogContent,
  InnerDialogDescription,
  InnerDialogFooter,
  InnerDialogHeader,
  InnerDialogTitle,
  InnerDialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import TooltipComponant from "@/components/shared/TooltipComponant";
import { ConditionalWrapper } from "@/lib/utils/ConditionalWrapper";

export function DialogComponent({
  triggerText,
  innerTriggerText,
  triggerVariant = "outline",
  innerTriggerVariant = "outline",
  triggerIcon,
  innerTriggerIcon,
  triggerSize,
  triggerFunction,
  innerTriggerSize,
  title,
  innerTitle,
  description,
  innerDescription,
  children,
  innerChildren,
  isOpen,
  setIsOpen,
  triggerClassName,
  innerTriggerClassName,
  className,
  innerClassName,
  buttonText,
  innerButtonText,
  onSubmit,
  innerOnSubmit,
  onClose,
  innerOnClose,
  buttonDisabled,
  innerButtonDisabled,
  buttonIcon,
  innerButtonIcon,
  isNested = false,
  position,
  draggable,
  TooltipText,
}: DialogComponentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerText || triggerIcon ? (
        <ConditionalWrapper
          condition={!!TooltipText}
          wrapper={(children) => <TooltipComponant content={TooltipText}>{children}</TooltipComponant>}
        >
          <DialogTrigger asChild>
            <Button
              className={cn("", triggerClassName)}
              variant={triggerVariant}
              size={triggerSize}
              onClick={triggerFunction}
              aria-label="Toggle dialog"
            >
              {triggerIcon} {triggerText}
            </Button>
          </DialogTrigger>
        </ConditionalWrapper>
      ) : null}

      <DialogContent className={cn("sm:max-w-lg bg-card capitalize", className)} aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-start mb-4 text-20">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}

        {(onClose || buttonText) && (
          <>
            <Separator className="my-2" />
            <DialogFooter className="sm:justify-start gap-2">
              {buttonText && (
                <DialogClose asChild>
                  <Button type="button" disabled={buttonDisabled} onClick={onSubmit}>
                    {buttonIcon} {buttonText}
                  </Button>
                </DialogClose>
              )}

              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onClose}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}

        {isNested && (
          <InnerDialog>
            {innerTriggerText || innerTriggerIcon ? (
              <InnerDialogTrigger asChild>
                <Button className={cn("", innerTriggerClassName)} variant={innerTriggerVariant} size={innerTriggerSize}>
                  {innerTriggerIcon} {innerTriggerText}
                </Button>
              </InnerDialogTrigger>
            ) : null}

            <InnerDialogContent
              className={cn("sm:max-w-md", innerClassName)}
              position={position}
              draggable={draggable}
              aria-describedby={undefined}
            >
              <InnerDialogHeader>
                <InnerDialogTitle className="text-start mb-2">{innerTitle}</InnerDialogTitle>
                {innerDescription && <InnerDialogDescription>{innerDescription}</InnerDialogDescription>}
              </InnerDialogHeader>
              {innerChildren}

              {(innerOnClose || innerButtonText) && (
                <>
                  <Separator className="my-2" />
                  <InnerDialogFooter className="sm:justify-start gap-2">
                    {innerButtonText && (
                      <InnerDialogClose asChild>
                        <Button type="button" disabled={innerButtonDisabled} onClick={innerOnSubmit}>
                          {innerButtonIcon} {innerButtonText}
                        </Button>
                      </InnerDialogClose>
                    )}

                    <InnerDialogClose asChild>
                      <Button type="button" variant="outline" onClick={innerOnClose}>
                        Close
                      </Button>
                    </InnerDialogClose>
                  </InnerDialogFooter>
                </>
              )}
            </InnerDialogContent>
          </InnerDialog>
        )}
      </DialogContent>
    </Dialog>
  );
}

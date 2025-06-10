
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipComponant = ({
  content,
  duration = 100,
  side = "bottom",
  children,
  align,
  alignOffset,
  className,
}: TooltipProps) => {
  if (!content) return null;
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={duration}>
        <TooltipTrigger className={className} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} alignOffset={alignOffset}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponant;

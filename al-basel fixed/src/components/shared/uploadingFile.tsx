import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useRef, forwardRef } from "react";
import { useTranslation } from "react-i18next";

type UploadFileProps = {
  file?: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  className?: string;
  containerWidth?: number | string;
  containerHeight?: number | string;
  iconSize?: number;
  disabled?: boolean;
  multiple?: boolean;
};

const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(
  (
    {
      file,
      onFileChange,
      accept = "application/pdf, image/*",
      className,
      containerWidth = 110,
      containerHeight = 110,
      iconSize = 35,
      disabled = false,
      multiple = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
          const {t} = useTranslation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onFileChange(files[0]);
      } else {
        onFileChange(null);
      }
    };

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onFileChange(null);
    };

    const containerStyle = {
      width: typeof containerWidth === "number" ? `${containerWidth}px` : containerWidth,
      height: typeof containerHeight === "number" ? `${containerHeight}px` : containerHeight,
    };

    const iconStyle = {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
    };

    return (
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="file-upload" className={cn("cursor-pointer", disabled && "cursor-not-allowed")}>
          <Input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="file"
            id="file-upload"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
            multiple={multiple}
          />

          <div
            className={cn(
              "border-dashed border-2 flex flex-col items-center justify-center rounded-lg overflow-hidden transition-colors",
              !disabled && "hover:bg-accent/20",
              disabled && "opacity-50",
              className
            )}
            style={containerStyle}
          >
            {file ? (
              <>
                <div className="text-center p-2">
                  <p className="text-sm font-medium truncate max-w-[90%] mx-auto">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </>
            ) : (
              <Upload style={iconStyle} className="text-muted-foreground" />
            )}
          </div>
        </Label>

        {file && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="text-sm text-red-500 hover:text-red-700 focus:outline-none flex items-center gap-1"
              disabled={disabled}
            >
              <X size={14} />
              {t("Remove")}
            </button>
          </div>
        )}
      </div>
    );
  }
);

UploadFile.displayName = "UploadFile";

export default UploadFile;
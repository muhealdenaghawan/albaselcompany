
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { XCircleIcon, ImageUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";

interface UploadImageProps {
  imageWidth?: number;
  imageHeight?: number;
  image?: File | string | null;
  setImage: (image: File | string | null) => void;
  className?: string;
  label?: string;
  accept?: string;
  maxFiles?: number;
}

const UploadImage = ({
  imageWidth = 100,
  imageHeight = 100,
  image,
  setImage,
  className,
  accept = "image/*",
  maxFiles = 1,
}: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
    }
  }, [image]);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewUrl && typeof image === "object") {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div className="mt-1 w-24 relative">
        {previewUrl ? (
          <>

            <input
              type="file"
              id="image-upload"
              ref={inputRef}
              accept={accept}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImage(file);
              }}
            />
            {/* Clickable label wrapper */}
            <Label htmlFor="image-upload" className="cursor-pointer block">
              <div className="relative aspect-square">
                <img
                  src={previewUrl}
                  height={imageHeight}
                  width={imageWidth}
                  alt="Preview"
                  className="border border-border h-full w-full rounded-md object-cover"
                />
              </div>
            </Label>
            {/* Remove button outside the label */}
            <button
              type="button"
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
              onClick={handleRemove}
            >
              <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
            </button>
          </>
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                setImage(file);
              }
            }}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={maxFiles}
            noClick
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div
                  {...getRootProps()}
                  className={cn(
                    "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-none focus:border-primary",
                    {
                      "border-primary bg-secondary": isDragActive && isDragAccept,
                      "border-destructive bg-destructive/20":
                        isDragActive && isDragReject,
                    },
                    className
                  )}
                  style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
                >
                  <input
                    {...getInputProps()}
                    id="image-upload"
                    ref={inputRef}
                    accept={accept}
                  />
                  <ImageUp
                    style={{
                      width: `${imageWidth / 2.8}px`,
                      height: `${imageHeight / 2.8}px`,
                    }}
                    strokeWidth={1.25}
                  />
                </div>
              </Label>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
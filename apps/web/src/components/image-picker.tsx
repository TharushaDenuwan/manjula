"use client";

import { Upload } from "@aws-sdk/lib-storage";
import { ImageIcon, Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { s3Client, s3Config } from "@/modules/media/config";
import { Button } from "@repo/ui/components/button";

interface ImagePickerProps {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
  className?: string;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
}

export function ImagePicker({
  value,
  onChange,
  disabled = false,
  className = "",
}: ImagePickerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadToS3 = async (file: File): Promise<string> => {
    const filename = generateUniqueFileName(file.name);
    const key = `posts/${filename}`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: s3Config.bucket,
        Key: key,
        Body: file,
        ContentType: file.type,
        CacheControl: "max-age=31536000",
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        const percentCompleted = Math.round(
          (progress.loaded / progress.total) * 100
        );
        setUploadProgress(percentCompleted);
      }
    });

    const result = await upload.done();
    return `${s3Config.baseUrl}/${result.Key}`;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);
        const url = await uploadToS3(file);
        onChange(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(
          `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    disabled: disabled || isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        <div className="relative group w-full h-48 rounded-lg overflow-hidden border border-border">
          <Image
            src={value}
            alt="Selected image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              disabled={disabled}
              icon={<XIcon className="h-4 w-4" />}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            w-full h-48 rounded-lg border-2 border-dashed
            flex flex-col items-center justify-center gap-2
            transition-all cursor-pointer
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-secondary/50"
            }
            ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} disabled={disabled || isUploading} />

          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  {isDragActive
                    ? "Drop image here"
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { Upload } from "@aws-sdk/lib-storage";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  Loader2,
  Upload as UploadIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { s3Client, s3Config } from "@/modules/media/config";
import { Button } from "@repo/ui/components/button";

interface FileUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
  className?: string;
  accept?: {
    [key: string]: string[];
  };
  maxSize?: number;
  folder?: string;
  label?: string;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
}

function getFileType(filename: string): "image" | "pdf" | "other" {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
}

export function FileUploader({
  value,
  onChange,
  disabled = false,
  className = "",
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    "application/pdf": [".pdf"],
  },
  maxSize = DEFAULT_MAX_SIZE,
  folder = "uploads",
  label = "Click to upload or drag and drop",
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadToS3 = async (file: File): Promise<string> => {
    const filename = generateUniqueFileName(file.name);
    const key = `${folder}/${filename}`;

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

      try {
        setIsUploading(true);
        setUploadProgress(0);
        const url = await uploadToS3(file);
        onChange(url);
        toast.success("File uploaded successfully!");
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
    [onChange, folder]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    multiple: false,
    accept,
    disabled: disabled || isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  const fileType = value ? getFileType(value) : null;

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        <div className="relative group w-full rounded-lg overflow-hidden border border-border">
          {fileType === "image" ? (
            <div className="relative w-full h-48">
              <Image
                src={value}
                alt="Uploaded file"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(value, "_blank")}
                  icon={<ImageIcon className="h-4 w-4" />}
                >
                  View
                </Button>
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
          ) : fileType === "pdf" ? (
            <div className="flex items-center justify-between p-4 bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <FileTextIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">PDF Document</p>
                  <p className="text-xs text-muted-foreground">
                    {value.split("/").pop()?.split("-").slice(2).join("-")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(value, "_blank")}
                  icon={<FileTextIcon className="h-4 w-4" />}
                >
                  View
                </Button>
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
            <div className="flex items-center justify-between p-4 bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <FileIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Uploaded File</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {value.split("/").pop()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(value, "_blank")}
                >
                  View
                </Button>
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
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            w-full min-h-[120px] rounded-lg border-2 border-dashed
            flex flex-col items-center justify-center gap-2 p-4
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
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
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
              <div className="p-3 bg-secondary rounded-lg">
                <UploadIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop file here" : label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Images & PDF up to {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

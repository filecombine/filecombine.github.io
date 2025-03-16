"use client";

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { addFile } from "../_store/filesSlice";
import { FileItem } from "../_types";

const FileUploader: React.FC = () => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList) => {
      setIsLoading(true);
      try {
        for (const file of Array.from(files)) {
          try {
            const content = await file.text();
            const fileItem: FileItem = {
              id: crypto.randomUUID(),
              name: file.name,
              content,
              type: file.type,
              size: file.size,
              lastModified: file.lastModified,
            };
            dispatch(addFile(fileItem));
            toast.success(`Uploaded: ${file.name}`);
          } catch (error) {
            toast.error(`Error reading file: ${file.name}`);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) handleFiles(files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const files = event.dataTransfer.files;
      if (files.length > 0) handleFiles(files);
    },
    [handleFiles]
  );

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div
        className={`relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          ) : (
            <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-300" />
          )}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {isLoading
                ? "Uploading..."
                : "Drag & drop files or click to upload"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supported formats: All type of text file etc.
            </p>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUploader;

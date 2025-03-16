"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, FileText } from "lucide-react";
import { RootState } from "../_types";
import { removeFile } from "../_store/filesSlice";

const FileList: React.FC = () => {
  const files = useSelector((state: RootState) => state.files.items);
  const dispatch = useDispatch();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto w-full mt-2">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Uploaded Files ({files.length})
        </h2>
        <ul
          className={`space-y-2 ${
            files.length > 4 ? "max-h-[250px] overflow-y-auto pr-3" : ""
          }`}
        >
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-gray-400 dark:text-gray-300 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFile(file.id))}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                title="Remove file"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;

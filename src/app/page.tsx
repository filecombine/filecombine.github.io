"use client";

import { ToastContainer } from "react-toastify";
import FileUploader from "./_components/FileUploader";
import FileList from "./_components/FileList";
import DownloadButton from "./_components/DownloadButton";
import Navbar from "./_components/Navbar";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900">
        <main className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <FileUploader />
          <FileList />
          <DownloadButton />
        </main>
      </div>
      <footer className="bg-white dark:bg-gray-800 py-3">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 File Combine. All rights reserved.
          </p>
        </div>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

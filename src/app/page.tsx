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
        <main className="container mx-auto px-4 py-2 flex flex-col gap-1">
          <FileUploader />
          <FileList />
          <DownloadButton />
        </main>
      </div>
      <footer className="bg-white dark:bg-gray-800 py-3">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 File Combine. 
            <br/>
            <a 
              href="https://www.linkedin.com/in/mdhasibulislamin"
              className="hover:text-blue-500 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
            Made by{" "}  Md Hasibul Islam
            </a>
           
          </p>
        </div>
      </footer>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

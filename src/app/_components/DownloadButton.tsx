"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { RootState } from "../_types";

const DownloadButton: React.FC = () => {
  const files = useSelector((state: RootState) => state.files.items);
  const [downloadFormat, setDownloadFormat] = useState<
    "text" | "pdf" | "docx" | "md" | "csv"
  >("text");
  const [fileName, setFileName] = useState("Untitled files");
  const [isDownloading, setIsDownloading] = useState(false);

  // Sanitize filename to remove invalid characters
  const sanitizeFilename = (name: string) => {
    return name.replace(/[/\\:*?"<>|]/g, "_");
  };

  // Combine file content with separators
  const getCombinedContent = (): string => {
    return files
      .map(
        (file) =>
          `// ==================== ${file.name} ====================\n\n` +
          `${file.content}\n\n` +
          `// =====================${Array(file.name.length)
            .fill("=")
            .join("")}=======================\n\n`
      )
      .join("");
  };

  // Generate DOCX file
  const generateDocx = async (content: string) => {
    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map((line) => {
            // Style headers (lines starting with // ===)
            if (line.startsWith("// ====")) {
              return new Paragraph({
                children: [
                  new TextRun({
                    text: line.replace(/\/\/ =+/g, "").trim(),
                    bold: true,
                    size: 24,
                  }),
                ],
              });
            }
            return new Paragraph({
              children: [new TextRun(line)],
            });
          }),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeFilename(fileName)}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Files downloaded as Word (.docx)!");
  };

  // Generate CSV file
  const generateCSV = async () => {
    const csvContent =
      "File Name,Content\n" +
      files
        .map((file) => {
          // Escape double quotes and wrap in quotes
          const escapedName = `"${file.name.replace(/"/g, '""')}"`;
          const escapedContent = `"${file.content.replace(/"/g, '""')}"`;
          return `${escapedName},${escapedContent}`;
        })
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeFilename(fileName)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Files downloaded as CSV!");
  };

  // Handle download logic
  const handleDownload = async () => {
    if (files.length === 0) {
      toast.error("No files to combine");
      return;
    }

    setIsDownloading(true);
    const combinedContent = getCombinedContent();

    try {
      if (downloadFormat === "text") {
        // Download as text file
        const blob = new Blob([combinedContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${sanitizeFilename(fileName)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Files downloaded as text!");
      } else if (downloadFormat === "pdf") {
        // Download as PDF
        const pdf = new jsPDF();
        const contentLines = combinedContent.split("\n");
        let currentY = 10;
        const lineHeight = 12; // Increased line height
        const fontSize = 12; // Increased font size

        pdf.setFontSize(fontSize);

        contentLines.forEach((line) => {
          if (currentY > 280) {
            pdf.addPage();
            currentY = 10;
          }
          pdf.text(line, 10, currentY);
          currentY += lineHeight;
        });

        pdf.save(`${sanitizeFilename(fileName)}.pdf`);
        toast.success("Files downloaded as PDF!");
      } else if (downloadFormat === "docx") {
        // Download as DOCX
        await generateDocx(combinedContent);
      } else if (downloadFormat === "md") {
        // Download as Markdown
        const blob = new Blob([combinedContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${sanitizeFilename(fileName)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Files downloaded as Markdown!");
      } else if (downloadFormat === "csv") {
        // Download as CSV
        await generateCSV();
      }
    } catch (error) {
      toast.error("Failed to download files");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full mt-1 border border-gray-500 dark:border-gray-400 rounded-xl shadow-lg bg-white dark:bg-gray-800 p-2">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Input Field */}
        <div className="w-full sm:flex-1">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 ring-blue-500 focus:border-transparent transition-all"
            placeholder="File name"
            aria-label="File name"
          />
        </div>

        {/* Select Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={downloadFormat}
            onChange={(e) =>
              setDownloadFormat(
                e.target.value as "text" | "pdf" | "docx" | "md" | "csv"
              )
            }
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            title="Download Format"
            aria-label="Download Format"
          >
            <option value="text">Text (.txt)</option>
            <option value="pdf">PDF (.pdf)</option>
            <option value="docx">Word (.docx)</option>
            <option value="md">Markdown (.md)</option>
            <option value="csv">CSV (.csv)</option>
          </select>
        </div>

        {/* Download Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={handleDownload}
            disabled={isDownloading || files.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[140px]"
          >
            {isDownloading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadButton;
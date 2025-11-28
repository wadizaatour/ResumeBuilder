import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MotivationLetter = () => {
  const [letter, setLetter] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const previewRef = useRef();

  const generateLetter = () => {
    if (customContent.trim()) {
      setLetter(customContent);
    } else {
      setLetter(
        `Dear ${company || "[Company]"},\n\nMy name is ${
          name || "[Your Name]"
        } and I am excited to apply for the ${
          position || "[Position]"
        } role in ${
          location || "[Location]"
        }. I am passionate about contributing to your team and believe my skills and experience make me a strong fit.\n\nThank you for considering my application.\n\nBest regards,\n${
          name || "[Your Name]"
        }`
      );
    }
  };

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    element.style.width = pdf.internal.pageSize.getWidth() + "pt";
    await new Promise((r) => setTimeout(r, 200));
    const canvas = await html2canvas(element, { scale: 2 });
    element.style.width = "";
    const imgData = canvas.toDataURL("image/png");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("motivation_letter.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Motivation Letter Generator
      </h2>
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Custom letter content (optional)"
          value={customContent}
          onChange={(e) => setCustomContent(e.target.value)}
          className="p-2 border border-gray-300 rounded h-32 resize-vertical"
        />
        <button
          type="button"
          onClick={generateLetter}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Generate Letter
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div
          ref={previewRef}
          className="bg-gray-50 p-4 rounded min-h-[200px] whitespace-pre-line"
        >
          {(letter || name || position || company || location) && (
            <>
              {/* Name styled as in resume */}
              <div className="text-2xl font-bold text-blue-700 mb-2">
                {name || "[Your Name]"}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Position:</span>{" "}
                {position || "[Position]"}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Company:</span>{" "}
                {company || "[Company]"}
              </div>
              <div className="mb-4 text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {location || "[Location]"}
              </div>
              {/* Letter body */}
              <div className="whitespace-pre-line text-gray-800">{letter}</div>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownloadPDF}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default MotivationLetter;

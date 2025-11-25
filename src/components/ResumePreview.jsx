import React, { forwardRef } from "react";

const ResumePreview = forwardRef(function ResumePreview({ data }, ref) {
  return (
    <div
      ref={ref}
      className="bg-white border border-gray-200 rounded-lg p-8 mx-auto my-6 max-w-2xl shadow"
    >
      <h1 className="text-3xl font-bold mb-2 text-blue-700">{data.name}</h1>
      <div className="flex gap-8 mb-4">
        <p className="mb-1">
          <span className="font-semibold">Email:</span> {data.email}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Phone:</span> {data.phone}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 text-gray-700">Summary</h2>
        <p className="mb-2 text-gray-800">{data.summary}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 text-gray-700">Skills</h2>
        <p className="mb-2 text-gray-800">{data.skills}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 text-gray-700">Education</h2>
        <ul className="list-disc pl-5 text-gray-800">
          {data.educationList.map((edu, i) => (
            <li key={i}>{edu}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 text-gray-700">
          Work Experience
        </h2>
        <ul className="text-gray-800">
          {data.work.map((job, i) => (
            <li key={i} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{job.title}</span>
                <span className="text-gray-500">{job.year}</span>
              </div>
              <ul className="list-disc pl-5">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 text-gray-700">Languages</h2>
        <ul className="list-disc pl-5 text-gray-800">
          {data.languagesList.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default ResumePreview;

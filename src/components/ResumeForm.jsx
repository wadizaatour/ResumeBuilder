import React, { useState } from "react";

const ResumeForm = ({ data, setData }) => {
  const [educationInput, setEducationInput] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [workYear, setWorkYear] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [workBullets, setWorkBullets] = useState([]);
  const [languageInput, setLanguageInput] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addEducation = () => {
    if (educationInput.trim()) {
      setData({
        ...data,
        educationList: [...data.educationList, educationInput],
      });
      setEducationInput("");
    }
  };
  const addWorkBullet = () => {
    if (workDesc.trim()) {
      setWorkBullets([...workBullets, workDesc]);
      setWorkDesc("");
    }
  };
  const addWork = () => {
    if (workTitle.trim() && workYear.trim()) {
      setData({
        ...data,
        work: [
          ...data.work,
          {
            title: workTitle,
            year: workYear,
            bullets: workBullets,
          },
        ],
      });
      setWorkTitle("");
      setWorkYear("");
      setWorkDesc("");
      setWorkBullets([]);
    }
  };
  const addLanguage = () => {
    if (languageInput.trim()) {
      setData({
        ...data,
        languagesList: [...data.languagesList, languageInput],
      });
      setLanguageInput("");
    }
  };

  return (
    <form className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded shadow">
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Phone</label>
        <input
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">
          Skills (comma separated)
        </label>
        <input
          name="skills"
          value={data.skills}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Education</label>
        <div className="flex gap-2 mb-2">
          <input
            value={educationInput}
            onChange={(e) => setEducationInput(e.target.value)}
            placeholder="Add education"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            type="button"
            onClick={addEducation}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {data.educationList.map((edu, i) => (
            <li key={i}>{edu}</li>
          ))}
        </ul>
      </div>
      <div>
        <label className="block font-semibold mb-1">Work Experience</label>
        <div className="flex gap-2 mb-2">
          <input
            value={workTitle}
            onChange={(e) => setWorkTitle(e.target.value)}
            placeholder="Job Title"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            value={workYear}
            onChange={(e) => setWorkYear(e.target.value)}
            placeholder="Year"
            className="p-2 border border-gray-300 rounded w-24"
          />
        </div>
        <div className="flex gap-2 mb-2">
          <input
            value={workDesc}
            onChange={(e) => setWorkDesc(e.target.value)}
            placeholder="Add bullet point"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            type="button"
            onClick={addWorkBullet}
            className="bg-blue-400 text-white px-3 rounded"
          >
            Add Bullet
          </button>
        </div>
        <ul className="list-disc pl-5 mb-2">
          {workBullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addWork}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add Work Experience
        </button>
        <ul className="mt-2">
          {data.work.map((job, i) => (
            <li key={i} className="mb-2">
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
      <div>
        <label className="block font-semibold mb-1">Languages</label>
        <div className="flex gap-2 mb-2">
          <input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            placeholder="Add language"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            type="button"
            onClick={addLanguage}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {data.languagesList.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default ResumeForm;

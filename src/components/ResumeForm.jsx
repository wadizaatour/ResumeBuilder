import React, { useState, useEffect } from "react";

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

  // Carousel/Accordion logic
  const sections = [
    {
      label: "Name",
      content: (
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Email",
      content: (
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Phone",
      content: (
        <input
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Location",
      content: (
        <input
          name="location"
          value={data.location}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Summary",
      content: (
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Skills (comma separated)",
      content: (
        <input
          name="skills"
          value={data.skills}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      ),
    },
    {
      label: "Education",
      content: (
        <>
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
        </>
      ),
    },
    {
      label: "Work Experience",
      content: (
        <>
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
        </>
      ),
    },
    {
      label: "Languages",
      content: (
        <>
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
        </>
      ),
    },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [accordionOpen, setAccordionOpen] = useState(
    sections.map((_, i) => i === 0)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Accordion toggle for desktop
  const toggleAccordion = (idx) => {
    setAccordionOpen((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  // Carousel navigation for mobile
  const goPrev = () => setActiveSection((prev) => (prev > 0 ? prev - 1 : prev));
  const goNext = () =>
    setActiveSection((prev) => (prev < sections.length - 1 ? prev + 1 : prev));

  return isMobile ? (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeSection === 0}
            className={`p-2 rounded-full ${
              activeSection === 0 ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
            aria-label="Previous section"
          >
            &#8592;
          </button>
          <span className="font-bold text-lg">
            {sections[activeSection].label}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={activeSection === sections.length - 1}
            className={`p-2 rounded-full ${
              activeSection === sections.length - 1
                ? "bg-gray-200"
                : "bg-blue-500 text-white"
            }`}
            aria-label="Next section"
          >
            &#8594;
          </button>
        </div>
        <div className="transition-all duration-300">
          {sections[activeSection].content}
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {sections.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSection(idx)}
            className={`w-3 h-3 rounded-full ${
              activeSection === idx ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  ) : (
    <div
      className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200"
      style={{ maxHeight: "650px", overflowY: "auto" }}
    >
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="mb-3 border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-300"
        >
          <button
            type="button"
            onClick={() => toggleAccordion(idx)}
            className="w-full flex justify-between items-center px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 focus:outline-none transition-all duration-200"
            aria-expanded={accordionOpen[idx]}
            aria-controls={`section-content-${idx}`}
          >
            <span className="font-semibold text-base text-gray-800">
              {section.label}
            </span>
            <span
              className="text-2xl font-light text-blue-600 transition-transform duration-200"
              style={{
                transform: accordionOpen[idx]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              ⌄
            </span>
          </button>
          {accordionOpen[idx] && (
            <div
              id={`section-content-${idx}`}
              className="px-5 py-4 bg-white animate-fadeIn"
            >
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumeForm;

import React, { useRef, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import MotivationLetter from "./components/MotivationLetter";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const App = () => {
  const [showForm, setShowForm] = useState(true);
  const [showMotivation, setShowMotivation] = useState(false);
  const exampleResumes = [
    {
      name: "Wadi Zaatour",
      email: "wadizaatourcontact@gmail.com",
      phone: "Netherlands",
      summary:
        "Frontend engineer with 10+ years of experience building scalable web applications across startups and global enterprises. Skilled at bridging design and engineering, optimizing performance, and mentoring teams. Seeking a transparent, autonomous culture where innovation thrives.",
      skills:
        "Vue, Vuex/Pinia, CSS, HTML5, JavaScript, TypeScript, Cypress, TDD, CI/CD, NodeJS, GitLab, Azure, GitHub Actions, Storybook",
      educationList: [
        "ESPRIT Private Higher School of Engineering and Technology | 2016 – 2018 Master’s Degree in Software Engineering",
        "Higher Institute of Multimedia Arts of Manouba (ISAMM) | 2013 – 2015 Bachelor’s Degree in Computer Science",
      ],
      languagesList: [
        "English – Native",
        "French – Native",
        "Dutch – Intermediate",
      ],
      work: [
        {
          title: "Senior Frontend Engineer, CowManager – Utrecht, Netherlands",
          year: "2019 – Present",
          bullets: [
            "Engineered real-time livestock monitoring system, visualizing sensor data for fertility, health, and location tracking.",
            "Defined roadmap to improve web and mobile performance, reducing loading time by 70%.",
            "Scaled a SaaS frontend product to support a global user base worldwide.",
            "Partnered with design team to expand component libraries using Storybook.",
            "Implemented test automation strategies, delivering production-grade code aligned with TDD principles.",
            "Conducted code reviews, contributed to frontend chapter meetings, and provided solutions during retrospectives.",
          ],
        },
        {
          title: "Frontend Developer, Factor Blue – Nijmegen, Netherlands",
          year: "2018 – 2019",
          bullets: [
            "Developed high-performance e-commerce interfaces tailored for identity and access management platforms.",
            "Integrated secure payment gateways and dynamic product filtering, reducing cart abandonment.",
            "Refactored pages to adopt modern payment tools, improving online shopping experience.",
            "Collaborated with UX designers to deliver responsive layouts and intuitive navigation.",
            "Maintained client communication to align goals and prioritize production releases.",
            "Integrated RESTful API endpoints with backend teams, ensuring seamless data flow.",
          ],
        },
        {
          title: "Frontend Developer, ESPRIT – Ariana, Tunisia",
          year: "2017 – 2018",
          bullets: [
            "Led frontend design integration for Esprit’s global NGO platform.",
            "Refactored legacy codebases to adopt TypeScript, improving maintainability and reducing runtime errors.",
            "Maintained databases and implemented monitoring tools to enhance scalability.",
            "Mentored junior developers and led knowledge-sharing sessions.",
            "Actively participated in agile ceremonies including sprint planning and retrospectives.",
          ],
        },
        {
          title: "Frontend Developer, Sofrecom (Orange Group) – Tunis, Tunisia",
          year: "2015 – 2017",
          bullets: [
            "Built customer-facing telecom dashboards for mobile subscription, billing, and service management.",
            "Implemented multilingual support and dynamic content loading for Orange’s international user base.",
            "Integrated real-time data visualizations for usage tracking and billing insights.",
            "Collaborated with backend teams to define API contracts and ensure seamless integration.",
            "Delivered frontend enhancements aligned with Orange’s digital transformation goals, reducing support tickets.",
          ],
        },
      ],
    },
    // Add more example resumes here if needed
    {
      name: "Jane Doe",
      email: "jane.doe@email.com",
      phone: "Germany",
      summary:
        "Full-stack developer with 7+ years of experience in fintech and SaaS. Passionate about building secure, scalable platforms and leading agile teams.",
      skills:
        "React, Redux, Node.js, Express, MongoDB, Docker, AWS, Jest, Cypress, GitHub Actions",
      educationList: [
        "Technical University of Munich | 2012 – 2016 Bachelor’s Degree in Computer Engineering",
      ],
      languagesList: [
        "English – Native",
        "German – Native",
        "Spanish – Intermediate",
      ],
      work: [
        {
          title: "Lead Developer, FinTechPro – Berlin, Germany",
          year: "2020 – Present",
          bullets: [
            "Architected and launched a secure payment platform used by 100k+ users.",
            "Led migration to microservices, improving scalability and deployment speed.",
            "Mentored junior developers and led code review sessions.",
          ],
        },
        {
          title: "Software Engineer, SaaSify – Munich, Germany",
          year: "2016 – 2020",
          bullets: [
            "Developed core modules for a SaaS analytics dashboard.",
            "Implemented CI/CD pipelines and automated testing with Jest and Cypress.",
            "Collaborated with product managers to deliver features on time.",
          ],
        },
      ],
    },
  ];

  const [resumeData, setResumeData] = useState(exampleResumes[0]);
  const [selectedExample, setSelectedExample] = useState(0);
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: "Resume",
  });

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const originalWidth = element.style.width;
    const originalFontSize = element.style.fontSize;
    element.style.width = pageWidth + "pt";
    element.style.fontSize = "12px";
    await new Promise((r) => setTimeout(r, 200));
    const canvas = await html2canvas(element, { scale: 2 });
    element.style.width = originalWidth;
    element.style.fontSize = originalFontSize;
    const imgData = canvas.toDataURL("image/png");
    const ratio = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Desktop left navbar with only menu icons */}
      <div className="hidden md:flex flex-col items-center justify-center py-8 px-2 bg-white shadow-lg fixed left-0 h-screen w-20 z-10 border-r border-gray-200">
        <div className="flex flex-col gap-8">
          <button
            className={`p-3 rounded-full transition-all duration-150 ${
              showForm && !showMotivation
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-blue-600"
            }`}
            onClick={() => {
              setShowForm(true);
              setShowMotivation(false);
            }}
            title="Add/Edit Sections"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            className={`p-3 rounded-full transition-all duration-150 ${
              !showForm && !showMotivation
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-blue-600"
            }`}
            onClick={() => {
              setShowForm(false);
              setShowMotivation(false);
            }}
            title="Preview Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            className={`p-3 rounded-full transition-all duration-150 ${
              showMotivation
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-blue-600"
            }`}
            onClick={() => {
              setShowForm(false);
              setShowMotivation(true);
            }}
            title="Motivation Letter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z"
              />
            </svg>
          </button>
          <div className="w-full h-px bg-gray-300 my-2"></div>
          <button
            className="p-3 rounded-full transition-all duration-150 bg-gray-200 text-green-600 hover:bg-green-600 hover:text-white"
            onClick={handlePrint}
            title="Print Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
          <button
            className="p-3 rounded-full transition-all duration-150 bg-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={handleDownloadPDF}
            title="Download as PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile footer menu with icons */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow flex justify-center gap-4 py-3 z-20 border-t">
        <button
          className={`p-3 rounded-full transition-all duration-150 ${
            showForm && !showMotivation
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-blue-600"
          }`}
          onClick={() => {
            setShowForm(true);
            setShowMotivation(false);
          }}
          title="Add/Edit Sections"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          className={`p-3 rounded-full transition-all duration-150 ${
            !showForm && !showMotivation
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-blue-600"
          }`}
          onClick={() => {
            setShowForm(false);
            setShowMotivation(false);
          }}
          title="Preview Resume"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <button
          className={`p-3 rounded-full transition-all duration-150 ${
            showMotivation
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-blue-600"
          }`}
          onClick={() => {
            setShowForm(false);
            setShowMotivation(true);
          }}
          title="Motivation Letter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          className="p-3 rounded-full transition-all duration-150 bg-gray-200 text-green-600 hover:bg-green-600 hover:text-white"
          onClick={handlePrint}
          title="Print Resume"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </button>
        <button
          className="p-3 rounded-full transition-all duration-150 bg-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white"
          onClick={handleDownloadPDF}
          title="Download as PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>

      {/* Main content area */}
      <div
        className="flex-1 md:ml-20 overflow-y-auto"
        style={{ height: "100vh" }}
      >
        <div className="py-8 px-6 md:px-10 min-h-full">
          <div className="pb-20 md:pb-8 max-w-[1800px] mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Resume Builder
            </h1>

            {/* Example buttons horizontal scrollable bar */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-3 justify-center md:justify-center min-w-max mx-auto w-fit">
                {exampleResumes.map((ex, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center gap-2 px-4 py-2 rounded border transition-all duration-150 shadow-sm whitespace-nowrap ${
                      selectedExample === idx
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => {
                      setResumeData(exampleResumes[idx]);
                      setSelectedExample(idx);
                    }}
                  >
                    <span>
                      {idx === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h4v4"
                          />
                        </svg>
                      )}
                    </span>
                    Example {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Content area: Resume or Motivation Letter */}
            {showMotivation ? (
              <MotivationLetter />
            ) : (
              <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-stretch justify-center md:items-start w-full">
                {/* Form Section */}
                <div
                  className={`md:flex-1 md:max-w-[600px] w-full flex flex-col ${
                    !showForm && "hidden md:flex"
                  }`}
                  style={{ minWidth: 0 }}
                >
                  <div className="mb-3">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Resume
                    </h2>
                  </div>
                  <ResumeForm data={resumeData} setData={setResumeData} />
                </div>

                {/* Preview Section */}
                <div
                  className={`md:flex-1 md:max-w-[650px] w-full flex flex-col ${
                    showForm && "hidden md:flex"
                  }`}
                  style={{ minWidth: 0 }}
                >
                  <div className="mb-3">
                    <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </h2>
                  </div>
                  <div className="mb-4 flex-1 flex items-start justify-center">
                    <ResumePreview data={resumeData} ref={previewRef} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useRef, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const App = () => {
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
    const originalWidth = element.style.width;
    const originalFontSize = element.style.fontSize;
    element.style.width = pageWidth + "pt";
    element.style.fontSize = "12px"; // Reduce font size by 4px (default is 16px)
    await new Promise((r) => setTimeout(r, 200));
    const canvas = await html2canvas(element, { scale: 2 });
    element.style.width = originalWidth;
    element.style.fontSize = originalFontSize;
    const imgData = canvas.toDataURL("image/png");
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
    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Resume Builder
      </h1>
      <div className="flex justify-center mb-6 gap-4">
        {exampleResumes.map((ex, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition-all duration-150 shadow-sm ${
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
      <div className="container mx-auto flex flex-col md:flex-row gap-8 h-[80vh]">
        <div className="md:w-7/12 w-full h-full overflow-y-auto">
          <ResumeForm data={resumeData} setData={setResumeData} />
        </div>
        <div className="md:w-5/12 w-full h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <ResumePreview data={resumeData} ref={previewRef} />
          </div>
          <div className="flex justify-center mt-4 gap-2 sticky bottom-0 bg-gray-50 py-4 z-10">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Print Resume
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
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
                  d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h3V3h8v2h3a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

"use client";

import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FlagIcon } from "react-flag-kit";
import translations from "./translations.json";

const MainPage = () => {
  const [language, setLanguage] = useState("pt");
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sectionsRef = useRef([]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          observer.unobserve(section);
        });
      }
    };
  }, [sectionsRef]);

  const generatePDF = () => {
    const input = document.getElementById("curriculum");
    setIsLoading(true);

    // Temporarily expand the element height to capture all content
    const originalHeight = input.style.height;
    input.style.height = "auto";
    input.style.maxHeight = "none";

    // Scroll to top before capturing
    window.scrollTo(0, 0);

    html2canvas(input, { scale: 2, scrollY: -window.scrollY }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 255);
        pdf.textWithLink(
          "https://antoniocouto.vercel.app",
          20,
          pdf.internal.pageSize.getHeight() - 30,
          { url: "https://antoniocouto.vercel.app" }
        );

        pdf.save("Curriculum_Antonio_Neto.pdf");

        // Restore the original height
        input.style.height = originalHeight;
        input.style.maxHeight = "";

        setIsLoading(false);
      }
    );
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (v, i) => (
          <span
            key={i}
            className={`star ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            } transition-transform transform hover:scale-125`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === "pt" ? "en" : "pt"));
  };

  const t = translations[language];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-100 to-green-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 font-sans ${
        loaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-2xl">Generating PDF...</div>
        </div>
      )}
      <div className="flex-grow flex flex-col justify-center items-center mt-[10vh]">
        <div className="absolute top-4 right-4 flex items-center space-x-4 no-print">
          <div className="flex items-center space-x-2">
            <FlagIcon
              code="US"
              size={32}
              className={`cursor-pointer ${
                language === "en" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-opacity duration-300`}
              onClick={() => setLanguage("en")}
            />
            <FlagIcon
              code="BR"
              size={32}
              className={`cursor-pointer ${
                language === "pt" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-opacity duration-300`}
              onClick={() => setLanguage("pt")}
            />
          </div>
          <button
            onClick={generatePDF}
            className="bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 flex items-center hidden md:flex"
          >
            <FaDownload className="mr-2" />
            PDF
          </button>
        </div>
        <div
          id="curriculum"
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-11/12 md:w-4/6"
        >
          <div className="flex items-center mb-6 animate-fade-in-down">
            <div className="w-20 h-20 relative rounded-full overflow-hidden shadow-lg">
              <Image
                src="/profile_picture.jpeg"
                alt={t.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-4xl font-bold text-primary dark:text-white mb-1">
                {t.title}
              </h1>
              <p className="text-lg text-primary dark:text-gray-400">
                {t.subtitle}
              </p>
            </div>
          </div>
          <div id="curriculum-content">
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[0] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.aboutMeTitle}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">{t.aboutMe}</p>
            </div>
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.education}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">{t.degree}</p>
              <p className="text-lg mb-4 dark:text-gray-300">{t.confucius}</p>
            </div>
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.experience}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">
                {t.experienceDetails}
              </p>
            </div>
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[3] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.skills}
              </h2>
              <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
                {t.skillsList.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300"
                  >
                    <span>{skill.name}</span> {renderStars(skill.rating)}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[4] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.languages}
              </h2>
              <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
                {t.languageList.map((language, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300"
                  >
                    <span>{language.name}</span>{" "}
                    {renderStars(language.rating)}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="mb-6 animate-fade-in-down"
              ref={(el) => (sectionsRef.current[5] = el)}
            >
              <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
                {t.projects}
              </h2>
              <ul
                className="text-lg mb-4 dark:text-gray-300 list-disc list-inside space-y-2"
                style={{ listStyleType: "none" }}
              >
                {t.projectList.map((project, index) => (
                  <li
                    key={index}
                    className="transition-transform transform hover:scale-105 duration-300"
                  >
                    <a
                      target="_blank"
                      href={project.link}
                      className="block text-black transition-colors duration-300 hover:text-green-700 dark:hover:text-green-500"
                    >
                      <div>
                        <span className="text-green-500 dark:text-green-300">
                          {project.title}
                        </span>
                        <p className="text-sm dark:text-gray-400">
                          {project.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Antonio Neto
          </div>
          <div className="footer-icons">
            <a
              href="https://www.linkedin.com/in/antonioniet/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/nietus"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:antonio.couto@sga.pucminas.br"
              className="footer-icon"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;

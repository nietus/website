// app/page.js

"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { FlagIcon } from 'react-flag-kit';
import translations from '../translations.json'; // Import translations

const Curriculum = () => {
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = () => {
    const input = document.getElementById("curriculum");
    setIsLoading(true);
  
    // Temporarily expand the element height to capture all content
    const originalHeight = input.style.height;
    input.style.height = "auto";
    input.style.maxHeight = "none";
  
    // Scroll to top before capturing
    window.scrollTo(0, 0);
  
    html2canvas(input, { scale: 2, scrollY: -window.scrollY }).then((canvas) => {
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
        "Visit my website: https://antoniocouto.vercel.app",
        20,
        pdf.internal.pageSize.getHeight() - 30,
        { url: "https://antoniocouto.vercel.app" }
      );
  
      pdf.save("Curriculum_Antonio_Neto.pdf");
      
      // Restore the original height
      input.style.height = originalHeight;
      input.style.maxHeight = "";
  
      setIsLoading(false);
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (v, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "pt" : "en"));
  };

  const t = translations[language];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 font-sans">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-2xl">Generating PDF...</div>
        </div>
      )}
      <div className="absolute top-4 right-4 flex items-center space-x-4 no-print">
        <div className="flex items-center space-x-2">
          <FlagIcon code="US" size={32} className={`cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setLanguage('en')} />
          <FlagIcon code="BR" size={32} className={`cursor-pointer ${language === 'pt' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setLanguage('pt')} />
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
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-11/12 md:w-4/6 h-[85vh] xl:h-[90vh] overflow-auto"
      >
        <div className="flex items-center mb-6">
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
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.education}
            </h2>
            <p className="text-lg mb-4 dark:text-gray-300">{t.degree}</p>
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.experience}
            </h2>
            <p className="text-lg mb-4 dark:text-gray-300">{t.experienceDetails}</p>
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.skills}
            </h2>
            <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
              {t.skillsList.map((skill, index) => (
                <li key={index} className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                  <span>{skill.name}</span> {renderStars(skill.rating)}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.languages}
            </h2>
            <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
              {t.languageList.map((language, index) => (
                <li key={index} className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                  <span>{language.name}</span> {renderStars(language.rating)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.projects}
            </h2>
            <ul className="text-lg mb-4 dark:text-gray-300 list-disc list-inside space-y-2">
              {t.projectList.map((project, index) => (
                <li key={index}>
                  <a
                    target="_blank"
                    href={project.link}
                    className="text-green-500 dark:text-green-300 transition-colors duration-300 hover:text-green-700 dark:hover:text-green-500"
                  >
                    {project.title}
                  </a>
                  <p className="text-sm dark:text-gray-400">{project.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;

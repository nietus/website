// app/page.js

"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { FlagIcon } from 'react-flag-kit';

const Curriculum = () => {
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = () => {
    const input = document.getElementById("curriculum");
    setIsLoading(true);
    html2canvas(input, { scale: 2 }).then((canvas) => {
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
      pdf.save("Curriculum_Antonio_Neto.pdf");
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

  const translations = {
    en: {
      title: "Antonio Neto",
      subtitle: "Student at PUC Minas",
      education: "Education",
      jobexperience: "Experience",
      skills: "Skills",
      projects: "Projects",
      degree: "Bachelor of Computer Science (2026/2)",
      experience: "Open-Source and College Projects",
      projectList: [
        {
          title: "Estoque Master",
          description: "A project to manage stock efficiently.",
          link: "https://github.com/nietus/spark_crud",
        },
        {
          title: "AnimeDB",
          description: "Use of cryptography algorithms, pattern matching, data structures, and compression in an anime database.",
          link: "https://github.com/AnimeAEDS3/aeds3",
        },
      ],
    },
    pt: {
      title: "Antonio Neto",
      subtitle: "Estudante na PUC Minas",
      education: "Educação",
      jobexperience: "Experiência",
      skills: "Habilidades",
      projects: "Projetos",
      degree: "Bacharel em Ciência da Computação (2026/2)",
      experience: "Open-Source e projetos de faculdade",
      projectList: [
        {
          title: "Estoque Master",
          description: "Um projeto para gerenciar estoque de forma eficiente.",
          link: "https://github.com/nietus/spark_crud",
        },
        {
          title: "AnimeDB",
          description: "Uso de algoritmos de criptografia, casamento de padrões, estruturas de dados e compactação em um banco de dados de anime.",
          link: "https://github.com/AnimeAEDS3/aeds3",
        },
      ],
    },
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
          className="bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 flex items-center"
        >
          <FaDownload className="mr-2" />
          PDF
        </button>
      </div>
      <div
        id="curriculum"
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-11/12 h-5/6 md:w-4/6 md:h-4/5 overflow-hidden"
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
              {t.jobexperience}
            </h2>
            <p className="text-lg mb-4 dark:text-gray-300">{t.experience}</p>
            <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-green-500 pb-2">
              {t.skills}
            </h2>
            <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
              <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                <span>Java</span> {renderStars(4)}
              </li>
              <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                <span>Python</span> {renderStars(3)}
              </li>
              <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                <span>Docker</span> {renderStars(2)}
              </li>
              <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
                <span>Machine Learning</span> {renderStars(2)}
              </li>
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

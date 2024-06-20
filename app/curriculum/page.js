// app/curriculum/page.js

"use client";

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Curriculum = () => {
  const [language, setLanguage] = useState('en');

  const generatePDF = () => {
    const input = document.getElementById('curriculum');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Curriculum_Antonio_Neto.pdf');
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (v, i) => (
          <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
        ))}
      </div>
    );
  };

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'pt' : 'en'));
  };

  const translations = {
    en: {
      title: 'Antonio Neto',
      subtitle: 'Student at PUC Minas',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      articles: 'Articles/Blog',
      bachelorDegree: 'Bachelor of Computer Science, PUC Minas',
      javaDeveloper: 'Java Developer, XYZ Company',
      downloadPDF: 'Download PDF',
    },
    pt: {
      title: 'Antonio Neto',
      subtitle: 'Estudante na PUC Minas',
      education: 'Educação',
      experience: 'Experiência',
      skills: 'Habilidades',
      articles: 'Artigos/Blog',
      bachelorDegree: 'Bacharel em Ciência da Computação, PUC Minas',
      javaDeveloper: 'Desenvolvedor Java, Empresa XYZ',
      downloadPDF: 'Baixar PDF',
    }
  };

  const t = translations[language];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="absolute top-4 right-4">
        <label className="switch">
          <input type="checkbox" onChange={switchLanguage} />
          <span className="slider round"></span>
        </label>
      </div>
      <div id="curriculum" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full h-5/6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 rounded-scrollbar">
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
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-1">{t.title}</h1>
            <p className="text-lg text-primary dark:text-gray-400">{t.subtitle}</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-blue-500 pb-2">{t.education}</h2>
          <p className="text-lg mb-4 dark:text-gray-300">{t.bachelorDegree}</p>
          <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-blue-500 pb-2">{t.experience}</h2>
          <p className="text-lg mb-4 dark:text-gray-300">{t.javaDeveloper}</p>
          <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-blue-500 pb-2">{t.skills}</h2>
          <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
            <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
              <span>Java</span> {renderStars(5)}
            </li>
            <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
              <span>Python</span> {renderStars(4)}
            </li>
            <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
              <span>HTML</span> {renderStars(4)}
            </li>
            <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
              <span>CSS</span> {renderStars(3)}
            </li>
            <li className="flex items-center justify-between transition-transform transform hover:scale-105 duration-300">
              <span>JavaScript</span> {renderStars(4)}
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 border-blue-500 pb-2">{t.articles}</h2>
          <ul className="text-lg mb-4 dark:text-gray-300 list-disc list-inside space-y-2">
            <li><a href="#" className="text-blue-500 dark:text-blue-300 transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-500">My First Article</a></li>
            <li><a href="#" className="text-blue-500 dark:text-blue-300 transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-500">Exploring JavaScript</a></li>
            <li><a href="#" className="text-blue-500 dark:text-blue-300 transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-500">Understanding CSS</a></li>
          </ul>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 transition-transform transform hover:scale-110 duration-300">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 transition-transform transform hover:scale-110 duration-300">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 transition-transform transform hover:scale-110 duration-300">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
        </div>
        <button onClick={generatePDF} className="mt-4 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300">
          {t.downloadPDF}
        </button>
      </div>
    </div>
  );
};

export default Curriculum;

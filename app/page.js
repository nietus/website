// app/page.js

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faCode, faLanguage, faBriefcase, faInfoCircle, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FlagIcon } from 'react-flag-kit';
import translations from './translations.json';

export default function HomePage() {
  const [language, setLanguage] = useState('pt');
  const [key, setKey] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const t = translations[language];
  const [text] = useTypewriter({
    words: t.words,
    loop: true,
    key,
  });

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (v, i) => (
          <span
            key={i}
            className={`star ${i < rating ? "text-yellow-500" : "text-gray-300"} transition-transform transform hover:scale-125`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Antonio Neto</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" />
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(-50%); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeOut {
              from { opacity: 1; transform: translateX(0); }
              to { opacity: 0; transform: translateX(-50%); }
            }
            @keyframes slideInLeft {
              from {
                opacity: 0;
                transform: translateX(-100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(100%);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideInDown {
              from {
                opacity: 0;
                transform: translateY(-100%);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .fade-in {
              animation: fadeIn 0.5s forwards;
            }
            .fade-out {
              animation: fadeOut 0.5s forwards;
            }
            .slide-in-left {
              animation: slideInLeft 0.5s forwards;
            }
            .slide-in-right {
              animation: slideInRight 0.5s forwards;
            }
            .slide-in-up {
              animation: slideInUp 0.5s forwards;
            }
            .slide-in-down {
              animation: slideInDown 0.5s forwards;
            }
            .star {
              display: inline-block;
              transition: transform 0.3s;
            }
            .social-icon {
              transition: transform 0.3s;
            }
            .social-icon:hover {
              transform: scale(1.2);
            }
            @media (max-width: 1280px), (max-height: 720px) {
              .sidebar, .toggle-icon {
                display: none !important;
              }
            }
          `}
        </style>
      </Head>
      <div className="relative flex min-h-[100vh] bg-gray-50 animate-fade-in">
        {!isSidebarVisible && (
          <div className="absolute top-4 left-4 z-30 toggle-icon hidden md:block">
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              onClick={toggleSidebar}
              className="cursor-pointer text-gray-700 hover:text-green-800 transition-transform transform animate-bounce hover:scale-110"
            />
          </div>
        )}
        <div className={`fixed top-0 left-0 h-full w-[30%] bg-green-200 p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} sidebar`}>
          <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
            <h2 className="text-xl font-semibold flex items-center">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-700" /> {language === 'en' ? 'About Me' : 'Sobre Mim'}
            </h2>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              onClick={toggleSidebar}
              className={`cursor-pointer text-gray-700 hover:text-green-800 transition-transform transform hover:scale-110 ${isSidebarVisible ? 'fade-in' : 'fade-out'}`}
            />
          </div>
          <p className="mb-4">{t.aboutMe}</p>
          <div className="mb-6 w-full">
            <h3 className="text-xl font-semibold mb-2 flex items-center border-b border-gray-600 pb-2">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2 text-gray-700" /> {t.education}
            </h3>
            <p>{t.degree}</p>
          </div>
          <div className="mb-6 w-full">
            <h3 className="text-xl font-semibold mb-2 flex items-center border-b border-gray-600 pb-2">
              <FontAwesomeIcon icon={faCode} className="mr-2 text-gray-700" /> {t.skills}
            </h3>
            <ul>
              {t.skillsList.map((skill, index) => (
                <li key={index} className="flex justify-between">
                  <span>{skill.name}</span> {renderStars(skill.rating)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6 w-full">
            <h3 className="text-xl font-semibold mb-2 flex items-center border-b border-gray-600 pb-2">
              <FontAwesomeIcon icon={faLanguage} className="mr-2 text-gray-700" /> {t.languages}
            </h3>
            <ul>
              {t.languageList.map((language, index) => (
                <li key={index} className="flex justify-between">
                  <span>{language.name}</span> {renderStars(language.rating)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6 w-full">
            <h3 className="text-xl font-semibold mb-2 flex items-center border-b border-gray-600 pb-2">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-gray-700" /> {t.experience}
            </h3>
            <p>{t.experienceDetails}</p>
          </div>
          <div className="flex mt-6 justify-center space-x-4">
            <a href="https://www.linkedin.com/in/antonioniet/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-110 social-icon">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/nietus" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-110 social-icon">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="mailto:antonio.couto@sga.pucminas.br" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-110 social-icon">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-0">
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <FlagIcon code="US" size={32} className={`cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setLanguage('en')} />
            <FlagIcon code="BR" size={32} className={`cursor-pointer ${language === 'pt' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setLanguage('pt')} />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-light mb-4 text-green-700 animate-slide-in-down" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.welcome}</h1>
            <div className="text-2xl mb-4 animate-slide-in-up" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {t.iAm} <span className="text-green-500">{text}<Cursor /></span>
            </div>
            <Link href="/curriculum" className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block transition-transform transform hover:scale-105">
              {t.goToCurriculum}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

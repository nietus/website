// app/page.js

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faCode, faLanguage, faBriefcase, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FlagIcon } from 'react-flag-kit';
import translations from './translations.json';

export default function HomePage() {
  const [language, setLanguage] = useState('pt');
  const [key, setKey] = useState(0);

  const t = translations[language];
  const [text] = useTypewriter({
    words: t.words,
    loop: {},
    key,
  });

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [language]);

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'pt' ? 'en' : 'pt'));
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

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Antonio Neto</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" />
      </Head>
      <div className="relative flex min-h-[100vh] bg-gray-100 animate-fade-in">
        <div className="hidden md:flex flex-col w-1/4 bg-green-200 p-8 rounded-lg shadow-md">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center border-b border-gray-600 pb-2">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-700" /> {language === 'en' ? 'About Me' : 'Sobre Mim'}
            </h2>
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
          </div>
          <div className="flex justify-center space-x-4">
            <a href="https://www.linkedin.com/in/antonioniet/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/nietus" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="mailto:antonio.couto@sga.pucminas.br" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-0">
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <FlagIcon code="US" size={32} className={`cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50'}`} onClick={switchLanguage} />
            <FlagIcon code="BR" size={32} className={`cursor-pointer ${language === 'pt' ? 'opacity-100' : 'opacity-50'}`} onClick={switchLanguage} />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-light mb-4 text-green-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.welcome}</h1>
            <div className="text-2xl mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
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

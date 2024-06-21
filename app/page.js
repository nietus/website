// app/page.js

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FlagIcon } from 'react-flag-kit';

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const [key, setKey] = useState(0);

  const translations = {
    en: {
      welcome: 'Hello, World!',
      goToCurriculum: 'Explore My Curriculum',
      iAm: 'I am a',
      aboutMe: 'Hi, I am Antonio Neto, a passionate learner and developer. I love working on exciting projects and continuously improving my skills. I like to work with Intelligent Systems and Databases.',
      education: 'Education',
      degree: 'Bachelor of Computer Science (2026/2)',
      skills: 'Skills',
      skillsList: [
        'Java', 'Python', 'Docker', 'Machine Learning'
      ],
      projects: 'Projects',
      words: ['Learner', 'Developer', 'Scientist'],
      projectList: [
        {
          title: 'Estoque Master',
          description: 'A project to manage stock efficiently.',
          link: 'https://github.com/nietus/spark_crud',
        },
        {
          title: 'AnimeDB',
          description: 'Use of cryptography algorithms, pattern matching, data structures, and compression in an anime database.',
          link: 'https://github.com/AnimeAEDS3/aeds3',
        },
      ],
      experience: 'Experience',
      experienceDetails: 'Open-Source and College Projects',
    },
    pt: {
      welcome: 'Olá, Mundo!',
      goToCurriculum: 'Explore Meu Currículo',
      iAm: 'Eu sou um',
      aboutMe: 'Oi, eu sou Antonio Neto, um estudante e desenvolvedor apaixonado. Adoro trabalhar em projetos empolgantes e melhorar continuamente minhas habilidades. Gosto de trabalhar com Sistemas Inteligentes e Bancos de Dados.',
      education: 'Educação',
      degree: 'Bacharel em Ciência da Computação (2026/2)',
      skills: 'Habilidades',
      skillsList: [
        'Java', 'Python', 'Docker', 'Machine Learning'
      ],
      projects: 'Projetos',
      words: ['Estudante', 'Desenvolvedor', 'Cientista'],
      projectList: [
        {
          title: 'Estoque Master',
          description: 'Um projeto para gerenciar estoque de forma eficiente.',
          link: 'https://github.com/nietus/spark_crud',
        },
        {
          title: 'AnimeDB',
          description: 'Uso de algoritmos de criptografia, casamento de padrões, estruturas de dados e compactação em um banco de dados de anime.',
          link: 'https://github.com/AnimeAEDS3/aeds3',
        },
      ],
      experience: 'Experiência',
      experienceDetails: 'Open-Source e projetos de faculdade',
    },
  };

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
    setLanguage((prevLang) => (prevLang === 'en' ? 'pt' : 'en'));
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Antonio Neto&apos;s Website</title>
      </Head>
      <div className="relative flex min-h-[100vh] bg-gray-100 animate-fade-in">
        <div className="hidden md:block w-1/4 bg-green-200 p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{language === 'en' ? 'About Me' : 'Sobre Mim'}</h2>
          <p className="mb-4">{t.aboutMe}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{t.education}</h3>
            <p>{t.degree}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{t.skills}</h3>
            <ul>
              {t.skillsList.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{t.experience}</h3>
            <p>{t.experienceDetails}</p>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/antonioniet/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/nietus" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="mailto:antonio.couto@sga.pucminas.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-110">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-0">
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <FlagIcon code="US" size={32} className={`cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50'}`} onClick={() => switchLanguage()} />
            <FlagIcon code="BR" size={32} className={`cursor-pointer ${language === 'pt' ? 'opacity-100' : 'opacity-50'}`} onClick={() => switchLanguage()} />
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

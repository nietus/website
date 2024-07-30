"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FlagIcon } from "react-flag-kit";
import translations from "./translations.json";

const MainPage = () => {
  const [language, setLanguage] = useState("pt");
  const [loaded, setLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const sectionsRef = useRef([]);

  useEffect(() => {
    setLoaded(true);
    setInitialLoad(false); // Mark initial load as complete after first render
    changeBackground("pt"); // Set initial background for pt
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
    setLanguage((prevLang) => {
      const newLang = prevLang === "pt" ? "en" : "pt";
      changeBackground(newLang);
      return newLang;
    });
  };

  const changeBackground = (lang) => {
    if (lang === "en") {
      setBackgroundStyle({
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(66, 135, 245, 0.3) 0%, rgba(255, 135, 245, 0.1) 100%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
          linear-gradient(90deg, rgba(66, 135, 245, 0.2), rgba(66, 135, 245, 0.2)),
          linear-gradient(45deg, rgba(66, 135, 245, 0.2), rgba(66, 135, 245, 0.2))`,
        backgroundSize: `150px 150px, 100% 60px, 100% 1px, 100% 1px`,
        backgroundPosition: `0 0, 0 0, 0 50%, 0 30%`,
        backgroundRepeat: `repeat, repeat, repeat, repeat`,
        backgroundAttachment: `fixed`,
      });
    } else {
      setBackgroundStyle({
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(66, 153, 225, 0.4) 0%, rgba(66, 153, 225, 0.1) 100%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
          linear-gradient(90deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.2)),
          linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.2))`,
        backgroundSize: `150px 150px, 100% 60px, 100% 1px, 100% 1px`,
        backgroundPosition: `0 0, 0 0, 0 50%, 0 30%`,
        backgroundRepeat: `repeat, repeat, repeat, repeat`,
        backgroundAttachment: `fixed`,
      });
    }
  };

  const t = translations[language];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-sans ${
        initialLoad ? "opacity-0" : "opacity-100"
      } transition-opacity duration-1000`}
      style={backgroundStyle}
    >
      <div className="flex-grow flex flex-col justify-center items-center mt-[10vh]">
        <div className="absolute top-4 right-4 flex items-center space-x-4 no-print">
          <div className="flex items-center space-x-2">
            <FlagIcon
              code="US"
              size={32}
              className={`cursor-pointer ${
                language === "en" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-opacity duration-300`}
              onClick={() => switchLanguage("en")}
            />
            <FlagIcon
              code="BR"
              size={32}
              className={`cursor-pointer ${
                language === "pt" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-opacity duration-300`}
              onClick={() => switchLanguage("pt")}
            />
          </div>
          <a
            href={
              language === "en"
                ? "/Antonio_Neto_Curriculum.pdf"
                : "/Antonio_Neto_Curriculum (1).pdf"
            }
            className={`py-2 px-4 rounded-full transition-transform transform hover:scale-105 duration-300 items-center flex ${
              language === "en"
                ? "bg-blue-500 dark:bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600"
                : "bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600"
            }`}
            download
            >
            <FaDownload className="mr-2" />
            CV
          </a>
        </div>
        <div
          id="curriculum"
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-11/12 md:w-4/6"
          style={{ color: "black" }} // Ensure text color is solid black
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
            <div className="mb-6" ref={(el) => (sectionsRef.current[0] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.aboutMeTitle}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">{t.aboutMe}</p>
            </div>
            <div className="mb-6" ref={(el) => (sectionsRef.current[1] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.education}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">{t.degree}</p>
              <p className="text-lg mb-4 dark:text-gray-300">{t.confucius}</p>
            </div>
            <div className="mb-6" ref={(el) => (sectionsRef.current[2] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.experience}
              </h2>
              <p className="text-lg mb-4 dark:text-gray-300">
                {t.experienceDetails}
              </p>
            </div>
            <div className="mb-6" ref={(el) => (sectionsRef.current[3] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.skills}
              </h2>
              <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
                {t.skillsList.map((skill, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{skill.name}</span> {renderStars(skill.rating)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6" ref={(el) => (sectionsRef.current[4] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.languages}
              </h2>
              <ul className="text-lg mb-4 dark:text-gray-300 space-y-2">
                {t.languageList.map((language, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{language.name}</span> {renderStars(language.rating)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6" ref={(el) => (sectionsRef.current[5] = el)}>
              <h2
                className={`text-2xl font-semibold text-primary dark:text-white mt-4 mb-2 border-b-2 ${
                  language === "en" ? "border-blue-400" : "border-green-500"
                } pb-2`}
              >
                {t.projects}
              </h2>
              <ul
                className="text-lg mb-4 dark:text-gray-300 list-disc list-inside space-y-2"
                style={{ listStyleType: "none" }}
              >
                {t.projectList.map((project, index) => (
                  <li
                    key={index}
                    className="transition-transform transform duration-300"
                    style={{ display: "inline-block" }} // Ensure inline-block to scale
                  >
                    <a
                      target="_blank"
                      href={project.link}
                      className={`block text-black transition-transform duration-300 ${
                        language === "en"
                          ? "hover:text-blue-400"
                          : "hover:text-green-500"
                      } ${
                        language === "en"
                          ? "dark:hover:text-blue-400"
                          : "dark:hover:text-green-500"
                      } hover:scale-105`}
                    >
                      <div>
                        <span
                          className={`${
                            language === "en"
                              ? "text-blue-400"
                              : "text-green-500"
                          } ${
                            language === "en"
                              ? "dark:text-blue-400"
                              : "dark:text-green-300"
                          }`}
                        >
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
              className={`footer-icon no-hover ${
                language === "en" ? "hover:text-blue-400" : ""
              }`}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/nietus"
              target="_blank"
              rel="noopener noreferrer"
              className={`footer-icon no-hover ${
                language === "en" ? "hover:text-blue-400" : ""
              }`}
            >
              <FaGithub />
            </a>
            <a
              href="mailto:antonio.couto@sga.pucminas.br"
              className={`footer-icon no-hover ${
                language === "en" ? "hover:text-blue-400" : ""
              }`}
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

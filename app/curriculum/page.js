// app/curriculum/page.js

"use client";

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Curriculum = () => {
  const generatePDF = () => {
    const input = document.getElementById('curriculum');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('Curriculum_Antonio_Neto.pdf');
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div id="curriculum" className="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Antonio Neto</h1>
        <p className="mb-4">Student at PUC Minas</p>
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <p className="mb-4">Bachelor of Computer Science, PUC Minas</p>
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <p className="mb-4">Java Developer, XYZ Company</p>
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <p className="mb-4">Java, Python, HTML, CSS, JavaScript</p>
      </div>
      <button onClick={generatePDF} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Download PDF
      </button>
    </div>
  );
};

export default Curriculum;

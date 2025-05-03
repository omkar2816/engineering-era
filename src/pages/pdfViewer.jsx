
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pdfData from "../data/pdf.json";
import "../styles/pdfViewer.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Book, Loader } from "lucide-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PdfViewer() {
  const query = useQuery();
  const subject = query.get("subject");

  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);

  const subjectData = pdfData.subjects.find(
    (s) => s.subjectName === subject
  );

  // Check if we have valid data
  if (!subjectData || subjectData.pdfFiles.length === 0) {
    return (
      <div className="pdf-container">
        <div className="pdf-empty-state">
          <Book size={64} className="pdf-empty-icon" />
          <h2>No Documents Available</h2>
          <p>No PDF files are available for {subject || "the selected subject"}.</p>
        </div>
      </div>
    );
  }

  const pdfFiles = subjectData.pdfFiles;
  const currentFile = pdfFiles[currentPdfIndex];
  
  const pdfUrl = `https://sbkeyhdfbzxdadjywjgy.supabase.co/storage/v1/object/public/pdf/${currentFile}`;

  const handleFileChange = (index) => {
    setIsLoading(true);
    setCurrentPdfIndex(index);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const nextFile = () => {
    if (currentPdfIndex < pdfFiles.length - 1) {
      handleFileChange(currentPdfIndex + 1);
    }
  };

  const prevFile = () => {
    if (currentPdfIndex > 0) {
      handleFileChange(currentPdfIndex - 1);
    }
  };

  // Simulate PDF loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [currentPdfIndex]);

  return (
    <div className="pdf-container">
      <div className="pdf-header">
        <div className="pdf-breadcrumb">
          <span className="pdf-subject-name">{subject}</span>
          <span className="pdf-breadcrumb-separator">/</span>
          <span className="pdf-file-name">{currentFile}</span>
        </div>
        
        <div className="pdf-actions">
          <a 
            href={pdfUrl} 
            download={currentFile}
            className="pdf-action-button"
            title="Download PDF"
          >
            <Download size={18} />
            <span className="pdf-action-text">Download</span>
          </a>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="pdf-action-button"
            title="Open in new tab"
          >
            <ExternalLink size={18} />
            <span className="pdf-action-text">Open</span>
          </a>
        </div>
      </div>

      <div className="pdf-main">
        <motion.div 
          className={`pdf-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
          initial={false}
          animate={{ 
            width: sidebarOpen ? '300px' : '50px',
            minWidth: sidebarOpen ? '250px' : '50px'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="pdf-sidebar-toggle"
            onClick={toggleSidebar}
            whileHover={{ backgroundColor: "#334155" }}
            whileTap={{ backgroundColor: "#475569" }}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </motion.div>
          
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div 
                className="pdf-sidebar-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="pdf-sidebar-title">Document List</h3>
                <div className="pdf-files-list">
                  {pdfFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      className={`pdf-file-item ${index === currentPdfIndex ? "active" : ""}`}
                      onClick={() => handleFileChange(index)}
                      whileHover={{ backgroundColor: index === currentPdfIndex ? "#475569" : "#334155" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Book size={16} className="pdf-file-icon" />
                      <span className="pdf-file-name">{file}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="pdf-content"
          layout
          transition={{ duration: 0.3 }}
        >
          <div className="pdf-navigation">
            <button 
              className={`pdf-nav-button ${currentPdfIndex === 0 ? 'disabled' : ''}`}
              onClick={prevFile}
              disabled={currentPdfIndex === 0}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            <div className="pdf-pagination">
              {currentPdfIndex + 1} / {pdfFiles.length}
            </div>
            <button 
              className={`pdf-nav-button ${currentPdfIndex === pdfFiles.length - 1 ? 'disabled' : ''}`}
              onClick={nextFile}
              disabled={currentPdfIndex === pdfFiles.length - 1}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="pdf-frame-container">
            {isLoading && (
              <div className="pdf-loading">
                <Loader size={40} className="pdf-loading-spinner" />
                <p>Loading document...</p>
              </div>
            )}
            
            <div className={`pdf-frame-wrapper ${isLoading ? 'loading' : ''}`}>
              <iframe
                className="pdf-frame"
                src={pdfUrl}
                title={currentFile}
                frameBorder="0"
                allow="fullscreen"
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

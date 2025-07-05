import React, { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  X,
  Calendar,
  Users,
  Star,
  Image,
  ZoomIn,
} from "lucide-react";
import ImageGalleryModal from "./ImageGalleryModal";

const ProjectModal = ({ selectedProject, onClose }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const project = selectedProject;

  const getIcon = (iconType) => {
    const iconProps = { className: "w-5 h-5" };
    switch (iconType) {
      case "Globe":
        return <Globe {...iconProps} />;
      case "Code":
        return <Code {...iconProps} />;
      case "Smartphone":
        return <Smartphone {...iconProps} />;
      case "Database":
        return <Database {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
      onClose();
    }, 400);
  };

  const openGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !galleryOpen && !isClosing) {
        handleCloseModal();
      }
    };

    if (project) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [project, galleryOpen, isClosing]);

  if (!project) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg transition-all duration-400 ease-out ${
          isClosing
            ? "animate-[fadeOut_0.4s_ease-out] opacity-0"
            : "animate-[fadeIn_0.4s_ease-out] opacity-100"
        }`}
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 via-gray-900 to-gray-700/30"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div
          className={`relative bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-400 ease-out ${
            isClosing
              ? "animate-[slideDown_0.4s_ease-out] opacity-0 scale-95 translate-y-8"
              : "animate-[slideUp_0.5s_ease-out] opacity-100 scale-100 translate-y-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseModal}
            disabled={isClosing}
            className={`absolute cursor-pointer top-6 right-6 z-10 p-3 bg-gray-800/60 backdrop-blur-sm rounded-full hover:bg-gray-700/70 transition-all duration-300 border border-gray-600/50 hover:border-gray-500/60 group hover:scale-110 hover:rotate-90 ${
              isClosing ? "pointer-events-none" : ""
            }`}
          >
            <X className="w-6 h-6 text-gray-200 group-hover:text-white transition-colors" />
          </button>
          <div className="enhanced-scrollbar overflow-y-auto max-h-[90vh]">
            <div className="relative h-80 md:h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-gray-700/40"></div>
              <img
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
              />
              <div
                className={`absolute bottom-8 left-8 right-8 z-10 transition-all duration-500 ${
                  isClosing
                    ? "opacity-0 translate-y-4"
                    : "animate-[fadeInUp_0.6s_ease-out_0.2s_both] opacity-100 translate-y-0"
                }`}
              >
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-gray-600/50 hover:scale-105 transition-transform duration-300">
                    {getIcon(project.iconType)}
                    <span className="text-gray-200">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-gray-600/50 hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-gray-200">{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-gray-600/50 hover:scale-105 transition-transform duration-300">
                    <Users className="w-4 h-4" />
                    <span className="text-gray-200">{project.team}</span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-200 text-lg">
                    Status: {project.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 relative">
              <div
                className={`flex flex-wrap gap-4 mb-12 transition-all duration-500 ${
                  isClosing
                    ? "opacity-0 translate-y-4"
                    : "animate-[fadeInUp_0.4s_ease-out_0.4s_both] opacity-100 translate-y-0"
                }`}
              >
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-full hover:bg-gray-600/60 hover:border-gray-500/60 transition-all duration-300 font-medium text-gray-200 shadow-lg hover:shadow-gray-500/25 hover:scale-105 hover:-translate-y-1"
                  >
                    <Github className="w-5 h-5" />
                    <span>Ver Código</span>
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-full hover:bg-gray-600/60 hover:border-gray-500/60 transition-all duration-300 font-medium text-gray-200 shadow-lg hover:shadow-gray-500/25 hover:scale-105 hover:-translate-y-1"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Ver Demo</span>
                  </a>
                )}
              </div>
              {project.images.length > 1 && (
                <div
                  className={`mb-12 transition-all duration-500 ${
                    isClosing
                      ? "opacity-0 translate-y-4"
                      : "animate-[fadeInUp_0.4s_ease-out_0.6s_both] opacity-100 translate-y-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Image className="w-6 h-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      Galeria de Imagens
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => openGallery(index)}
                        className="relative cursor-pointer aspect-video rounded-xl overflow-hidden transition-all duration-300 group border border-gray-600/50 hover:border-gray-500/60 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-500/25"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ZoomIn className="w-8 h-8 text-white drop-shadow-lg scale-0 group-hover:scale-100 transition-transform duration-200" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div
                className={`mb-12 transition-all duration-500 ${
                  isClosing
                    ? "opacity-0 translate-y-4"
                    : "animate-[fadeInUp_0.4s_ease-out_0.8s_both] opacity-100 translate-y-0"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Visão Geral
                </h3>
                <div className="p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl hover:border-gray-500/60 transition-all duration-300">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.detailedDescription}
                  </p>
                </div>
              </div>
              <div
                className={`mb-12 transition-all duration-500 ${
                  isClosing
                    ? "opacity-0 translate-y-4"
                    : "animate-[fadeInUp_0.4s_ease-out_1s_both] opacity-100 translate-y-0"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Tecnologias Utilizadas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-full text-gray-200 hover:bg-gray-600/60 hover:border-gray-500/60 transition-all duration-300 font-medium shadow-lg hover:shadow-gray-500/25 hover:scale-105 hover:-translate-y-1"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`mb-12 transition-all duration-500 ${
                  isClosing
                    ? "opacity-0 translate-y-4"
                    : "animate-[fadeInUp_0.4s_ease-out_1.2s_both] opacity-100 translate-y-0"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Principais Funcionalidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl hover:bg-gray-700/60 hover:border-gray-500/60 transition-all duration-300 group hover:scale-102 hover:-translate-y-1"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 flex-shrink-0 group-hover:bg-gray-300 group-hover:shadow-lg group-hover:shadow-gray-400/50 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {project.challenges && (
                <div
                  className={`mb-12 transition-all duration-500 ${
                    isClosing
                      ? "opacity-0 translate-y-4"
                      : "animate-[fadeInUp_0.4s_ease-out_1.4s_both] opacity-100 translate-y-0"
                  }`}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">
                    Challenges & Solutions
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl hover:bg-gray-700/60 hover:border-gray-500/60 transition-all duration-300 group hover:scale-102 hover:-translate-y-1"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <div className="w-3 h-3 bg-gray-500 rounded-full mt-2 flex-shrink-0 group-hover:bg-gray-400 group-hover:shadow-lg group-hover:shadow-gray-400/50 transition-all duration-300 group-hover:scale-125" />
                        <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ImageGalleryModal
        images={project.images}
        projectTitle={project.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={selectedImageIndex}
      />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .enhanced-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(107, 114, 128, 0.5) rgba(31, 41, 55, 0.3);
        }
        .enhanced-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 6px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(107, 114, 128, 0.6),
            rgba(75, 85, 99, 0.6)
          );
          border-radius: 6px;
          backdrop-filter: blur(4px);
          transition: background 0.3s ease;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(107, 114, 128, 0.8),
            rgba(75, 85, 99, 0.8)
          );
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(
            180deg,
            rgba(107, 114, 128, 1),
            rgba(75, 85, 99, 1)
          );
        }
        .enhanced-scrollbar::-webkit-scrollbar-corner {
          background: rgba(31, 41, 55, 0.3);
        }
      `}</style>
    </>
  );
};

export default ProjectModal;

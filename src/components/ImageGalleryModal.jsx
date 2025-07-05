import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react";

const ImageGalleryModal = ({
  images,
  projectTitle,
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleArrowKeys = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, images.length, onClose]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] cursor-pointer"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-8 right-8 w-12 h-12 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md rounded-full hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600 group z-20 hover:scale-110"
      >
        <X className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-8 cursor-pointer top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md rounded-full hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600 group z-20 hover:scale-110 hover:-translate-x-2"
          >
            <ChevronLeft className="w-7 h-7 text-zinc-300 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextImage}
            className="absolute cursor-pointer right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md rounded-full hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600 group z-20 hover:scale-110 hover:translate-x-2"
          >
            <ChevronRight className="w-7 h-7 text-zinc-300 group-hover:text-white transition-colors" />
          </button>
        </>
      )}

      <div
        className="flex items-center justify-center h-full p-12 cursor-default"
        onClick={handleBackdropClick}
      >
        <div
          className={`relative transition-all duration-700 ease-out animate-[slideUp_0.6s_ease-out] ${
            isZoomed ? "w-full h-full" : "max-w-6xl max-h-[85vh]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${projectTitle} - Image ${currentIndex + 1}`}
            className={`w-full h-full object-contain rounded-2xl shadow-2xl transition-all duration-700 ${
              isZoomed ? "object-cover rounded-none" : "object-contain"
            }`}
            style={{
              filter: "drop-shadow(0 0 40px rgba(0, 0, 0, 0.8))",
            }}
          />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-md rounded-full px-4 py-2 text-zinc-300 text-sm border border-zinc-700/50">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageGalleryModal;

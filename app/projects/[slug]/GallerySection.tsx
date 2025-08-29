"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ImageSource = Parameters<typeof urlFor>[0];

type GallerySectionProps = {
  gallery: (string | ImageSource)[];
  projectTitle: string;
};

// Modal component for expanded image view
function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  alt,
  currentIndex,
  totalImages,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
  currentIndex: number;
  totalImages: number;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* Navigation buttons */}
        {totalImages > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 z-10"
              disabled={currentIndex === 0}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 z-10"
              disabled={currentIndex === totalImages - 1}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {totalImages}
            </div>
          </>
        )}

        {/* Main image */}
        <Image
          src={imageSrc}
          alt={alt}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}

export function GallerySection({ gallery, projectTitle }: GallerySectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? gallery.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (gallery.length === 0) {
    return (
      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
        No gallery images yet.
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => openModal(i)}
          >
            {typeof img === "string" ? (
              <Image
                src={img}
                alt={`${projectTitle} ${i + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src={urlFor(img).url()}
                alt={`${projectTitle} ${i + 1}`}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/0 hover:text-white/80 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={
            typeof gallery[selectedImageIndex] === "string"
              ? (gallery[selectedImageIndex] as string)
              : urlFor(gallery[selectedImageIndex] as ImageSource).url()
          }
          alt={`${projectTitle} ${selectedImageIndex + 1}`}
          currentIndex={selectedImageIndex}
          totalImages={gallery.length}
          onNavigate={navigateImage}
        />
      )}
    </>
  );
}

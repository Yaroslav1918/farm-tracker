"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/farm-1.png",
  "/farm-2.png",
  "/farm-4.png",
  "/farm-5.jpg",
  "/farm-11.jpg",
  "/farm-7.jpg",
  "/farm-8.jpg",
  "/farm-9.jpg",
  "/farm-10.jpg",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section className="w-full bg-white mt-30">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-6 text-center "> Our farms and fields</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 p-10  max-w-7xl mx-auto">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative h-70 overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setSelectedImage(src)}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                src={src}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                fill
                alt={`gallery-photo-${index}`}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl h-[80vh] p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="enlarged-photo"
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

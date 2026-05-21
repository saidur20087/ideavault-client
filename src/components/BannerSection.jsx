"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const BannerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Turn Your Startup Ideas Into Reality",
      description:
        "Share, discover, and validate innovative startup ideas with a vibrant global community. No complex schedulers, just raw feedback.",
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Connect with Aspiring Co-Founders",
      description:
        "Find developers, designers, and business minds to build your vision. Collaborate with verified users across diverse tech and business categories.",
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Validate Before You Build",
      description:
        "Track interactions and get feedback to gauge market interest before spending resources on development.",
      imageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800/50 min-h-[500px] flex items-center">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 z-10" />

          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      <div className="max-w-5xl mx-auto text-center relative z-20 w-full px-6 py-24 text-white">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-5 border border-indigo-100 dark:border-indigo-900/30">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-amber-500 gap-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
          Community Powered Validation Platform
        </span>

        <div className="min-h-[220px] md:min-h-[180px] flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </h1>

          <p className="text-base md:text-xl text-gray-200 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            {slides[currentSlide].description}
          </p>
        </div>

        <Link
          href="#ideas"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-black hover:opacity-95 shadow-xl shadow-orange-500/10 transition-all active:scale-95"
        >
          Explore Ideas <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-700 text-white shadow-md transition z-30"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-700 text-white shadow-md transition z-30"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default BannerSection;
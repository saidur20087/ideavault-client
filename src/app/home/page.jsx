'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { ArrowRight, Lightbulb, MessageSquare, Rocket, ShieldCheck, Cpu, HeartPulse, GraduationCap, DollarSign, Loader2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const HomePage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Turn Your Startup Ideas Into Reality",
      description: "Share, discover, and validate innovative startup ideas with a vibrant global community. No complex schedulers, just raw feedback.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
    },
    {
      title: "Connect with Aspiring Co-Founders",
      description: "Find developers, designers, and business minds to build your vision. Collaborate with verified users across diverse tech and business categories.",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
    },
    {
      title: "Validate Before You Build",
      description: "Track interactions and get feedback to gauge market interest before spending resources on development. Refine concepts collectives based on real community insights.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));


  useEffect(() => {
    fetch('http://localhost:5000/api/ideas')
      .then((res) => res.json())
      .then((data) => {

        setIdeas(data.ideas.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading trending ideas:", err);
        setLoading(false);
      });
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const categories = [
    { name: "AI & Automation", icon: <Cpu className="w-6 h-6 text-indigo-500" /> },
    { name: "HealthTech", icon: <HeartPulse className="w-6 h-6 text-emerald-500" /> },
    { name: "EdTech", icon: <GraduationCap className="w-6 h-6 text-amber-500" /> },
    { name: "FinTech", icon: <DollarSign className="w-6 h-6 text-blue-500" /> }
  ];

  const steps = [
    { title: "Share Your Idea", desc: "Post your innovative startup concepts with details.", icon: <Lightbulb className="w-6 h-6" /> },
    { title: "Get Feedback", desc: "The community reviews, comments, and suggests refinements.", icon: <MessageSquare className="w-6 h-6" /> },
    { title: "Validate Concept", desc: "Track community interactions and engagement metrics.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Scale Up", desc: "Refine your pitch based on real feedback and launch.", icon: <Rocket className="w-6 h-6" /> }
  ];

  return (
    <div className="bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* 1. Banner Section */}
      <div className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800/50 min-h-[500px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/50 dark:bg-black/60 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover object-center" />
          </div>
        ))}

        <div className="max-w-5xl mx-auto text-center relative z-20 w-full px-6 py-24 text-white">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-5 border border-indigo-100 dark:border-indigo-900/30">
            ✨ Community Powered Validation Platform
          </span>

          <div className="min-h-[220px] md:min-h-[180px] flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-xl text-gray-200 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
              {slides[currentSlide].description}
            </p>
          </div>

          <Link href="#ideas" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-black hover:opacity-95 shadow-xl shadow-orange-500/10 transition-all active:scale-95">
            Explore Ideas <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-700 text-white shadow-md transition z-30">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-700 text-white shadow-md transition z-30">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 2. Trending Ideas Section */}
      <div id="ideas" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Trending Startup Ideas</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">Discover top-voted and highly discussed concepts from global innovators.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-amber-500" />
            <p className="text-sm text-gray-500 mt-4">Loading amazing ideas from database...</p>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-2xl border-gray-200 dark:border-gray-800">
            <p className="text-gray-500">No startup ideas shared yet. Be the pioneer!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="flex flex-col justify-between bg-white dark:bg-[#131926]/40 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                      {idea.category || 'General Tech'}
                    </span>


                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(idea.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {idea.description || idea.shortDescription}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800/60">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Interactions: {idea.interactions || 0}
                  </span>
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-indigo-600 font-semibold flex items-center gap-1"
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="bg-gray-50 dark:bg-[#0f1524] border-y border-gray-100 dark:border-gray-800/40 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">How IdeaVault Works</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">Four simple steps to transform your raw thoughts into fully validated business concepts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group text-center md:text-left">
                <div className="w-12 h-12 mb-5 mx-auto md:mx-0 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl flex items-center justify-center text-indigo-600 dark:text-amber-500 transition-transform group-hover:-translate-y-1">
                  {step.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-6 left-[85%] w-1/2 h-[1px] bg-gray-200 dark:bg-gray-800 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Extra Section 2: Explore by Category */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Explore by Category</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">Filter through tailored domains to find the specific industry innovation you care about.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-4 p-6 bg-white dark:bg-[#131926]/20 border border-gray-200 dark:border-gray-800/60 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#131926]/60 hover:border-indigo-500/40 dark:hover:border-amber-500/40 cursor-pointer transition-all group"
            >
              <div className="p-3 bg-gray-50 dark:bg-[#0b0f19] rounded-xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-amber-500 transition-colors">
                  {cat.name}
                </h4>
                <span className="text-xs text-gray-400">View Active Ideas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
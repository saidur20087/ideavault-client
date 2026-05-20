"use client";

import {
  Lightbulb,
  MessageSquare,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Share Your Idea",
      desc: "Post your innovative startup concepts with details.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Get Feedback",
      desc: "The community reviews, comments, and suggests refinements.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Validate Concept",
      desc: "Track community interactions and engagement metrics.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Scale Up",
      desc: "Refine your pitch based on real feedback and launch.",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#0f1524] border-y border-gray-100 dark:border-gray-800/40 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            How IdeaVault Works
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            Four simple steps to transform your raw thoughts into fully validated business concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group text-center md:text-left"
            >
              <div className="w-12 h-12 mb-5 mx-auto md:mx-0 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl flex items-center justify-center text-indigo-600 dark:text-amber-500 transition-transform group-hover:-translate-y-1">
                {step.icon}
              </div>

              <h4 className="font-bold text-lg mb-2">
                {step.title}
              </h4>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>

              {index < 3 && (
                <div className="hidden lg:block absolute top-6 left-[85%] w-1/2 h-[1px] bg-gray-200 dark:bg-gray-800 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
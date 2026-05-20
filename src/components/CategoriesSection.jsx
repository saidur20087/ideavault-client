"use client";

import {
  Cpu,
  HeartPulse,
  GraduationCap,
  DollarSign,
} from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      name: "AI & Automation",
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
    },
    {
      name: "HealthTech",
      icon: <HeartPulse className="w-6 h-6 text-emerald-500" />,
    },
    {
      name: "EdTech",
      icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
    },
    {
      name: "FinTech",
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Explore by Category
        </h2>

        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
          Filter through tailored domains to find the specific industry innovation you care about.
        </p>
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

              <span className="text-xs text-gray-400">
                View Active Ideas
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
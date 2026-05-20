import BannerSection from "@/components/BannerSection";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorks from "@/components/HowItWorks";
import TrendingIdeas from "@/components/TrendingIdeas";


const HomePage = () => {
  return (
    <div className="bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100">
      <BannerSection />

      <TrendingIdeas />

      <HowItWorks />

      <CategoriesSection />
    </div>
  );
};

export default HomePage;
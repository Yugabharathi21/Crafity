
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedCrafts from "@/components/FeaturedCrafts";
import PopularCrafts from "@/components/PopularCrafts";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedCrafts />
      <PopularCrafts />
      <Testimonials />
      <About />
      <Footer />
    </div>
  );
};

export default Index;

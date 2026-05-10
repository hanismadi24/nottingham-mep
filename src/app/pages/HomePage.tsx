import { Link } from "react-router";
import {
  ArrowRight,
  Building2,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { projects } from "../data/projects";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <MetricsSection />
      <FeaturedProjectsSection />
      <ServicesSection />
        <CTASection />
      <ClientsSection />
    
    </div>
  );
}

function HeroSection() {
const [currentImage, setCurrentImage] = useState(0);
const [imagesLoaded, setImagesLoaded] = useState(false);
  const heroImages = [
   
     "/banner/1.png",
       "/banner/2.png",
         "/banner/3.png",  
           "/banner/5.jpg", 
          "/banner/6.png",
        
    
    
  ];
useEffect(() => {
  const preloadImages = async () => {
    const promises = heroImages.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    await Promise.all(promises);

    setImagesLoaded(true);
  };

  preloadImages();
}, []);
useEffect(() => {
  if (!imagesLoaded) return;

  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, [imagesLoaded]);
if (!imagesLoaded) {
  return (
    <div className="h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="w-14 h-14 border-4 border-white/20 border-t-[#a11d17] rounded-full animate-spin"></div>
    </div>
  );
}
  return (
    <section className="relative h-[90vh] min-h-[600px] bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt="Engineering Excellence"
            className="absolute w-full h-full object-cover object-[center_20%] opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImage === index ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            Engineering Landmark Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-gray-200 mb-5"
          >
            Innovative MEP Design | Sustainable Solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 items-start"
          >
            <Link
              to="/projects"
              className="w-fit px-5 py-2.5 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white text-sm rounded-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              Explore Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/contact"
              className="w-fit px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    {
      value: 600,
      suffix: "+",
      label: "Projects Completed",
      icon: Building2,
    },
    {
      value: 16,
      suffix: "+",
      label: "Years Experience",
      icon: Award,
    },
    {
      value: 7,
      suffix: "+",
      label: "Countries",
      icon: Globe,
    },
    {
      value: 50,
      suffix: "+",
      label: "Clients",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  index,
}: {
  metric: any;
  index: number;
}) {
  const [count, setCount] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = metric.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= metric.value) {
        setCount(metric.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [metric.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-2xl mb-4">
        <Icon size={32} className="text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-2">
        {count}
        {metric.suffix}
      </div>
      <div className="text-[#64748b]">{metric.label}</div>
    </motion.div>
  );
}

function FeaturedProjectsSection() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#64748b]"
          >
            Delivering excellence across diverse sectors
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all group"
          >
            View All Projects
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block group"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white text-xs mb-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#a11d17] rounded-full">
                  {project.sector}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  {project.country}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#a11d17] transition-colors">
              {project.name}
            </h3>
            <p className="text-[#64748b] text-sm mb-4">
              {project.location}
            </p>
            <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
              View Case Study
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Mechanical",
      description:
        "HVAC, ventilation, and climate control systems",
      icon: "⚙️",
    },
    {
      title: "Electrical",
      description:
        "Power distribution, lighting, and smart systems",
      icon: "⚡",
    },
    {
      title: "Plumbing",
      description:
        "Water supply, drainage, and sanitary systems",
      icon: "💧",
    },
    {
      title: "District Cooling",
      description: "Centralized cooling for large developments",
      icon: "❄️",
    },
    {
      title: "BIM Coordination",
      description: "3D modeling and clash detection",
      icon: "🏗️",
    },
    {
      title: "Sustainability",
      description: "Green building and LEED consulting",
      icon: "🌱",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#64748b]"
          >
            Comprehensive MEP solutions for every project
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl border border-[#e2e8f0] hover:border-[#a11d17] hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="text-5xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#a11d17] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#64748b]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all group"
          >
            Explore All Services
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}


import { ChevronLeft, ChevronRight } from "lucide-react";

function ClientsSection() {
  const clients = Array.from({ length: 37 }, (_, i) => ({
    id: i + 1,
    logo: `/clients/image (${i + 1}).png`,
  }));

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prev) =>
      prev + 1 >= totalPages ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentPage((prev) =>
      prev - 1 < 0 ? totalPages - 1 : prev - 1
    );
  };

  const visibleClients = clients.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-20 bg-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>

          <p className="text-xl text-gray-400">
            Our valued clients and partners
          </p>
        </div>

        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#a11d17] hover:text-white transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#a11d17] hover:text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>

          {/* Clients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-10">
            {visibleClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-6 h-28 flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={client.logo}
                  alt={`Client ${client.id}`}
                className="max-h-14 w-auto object-contain transition-all duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#a11d17] to-[#7d1712] rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to bring your vision to life with
            innovative MEP solutions
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#a11d17] rounded-lg hover:shadow-2xl transition-all group font-semibold"
          >
            Get in Touch
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Globe,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import api, { API_BASE_URL } from "../../api";
import { getIcon } from "../pages/icons";

// ==================== PARTICLE ANIMATION CLASS (Pure JS) ====================
// This is the extracted logic from your attached file
// ==================== PARTICLE ANIMATION CLASS (Pure JS) ====================
class ParticleAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private width: number = 0;
  private height: number = 0;
  private particles: Particle[] = [];
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private scrollActive: boolean = true;
  private animationFrameId: number | null = null;
  private container: HTMLElement;

  constructor(container: HTMLElement, canvasId: string) {
    this.container = container;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.init();
    this.bindEvents();
    this.animate();
  }

  private init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.container.style.height = this.height + "px";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.mousePosition = { x: this.width / 2, y: this.height / 2 };

    // Create particles grid
    this.particles = [];
    for (let x = 0; x < this.width; x += this.width / 20) {
      for (let y = 0; y < this.height; y += this.height / 20) {
        const px = x + Math.random() * (this.width / 20);
        const py = y + Math.random() * (this.height / 20);
        this.particles.push(new Particle(px, py));
      }
    }

    // Find closest particles for each particle
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      const closest: Particle[] = [];
      for (let j = 0; j < this.particles.length; j++) {
        const other = this.particles[j];
        if (particle !== other) {
          for (let k = 0; k < 5; k++) {
            if (!closest[k] || this.distance(particle, other) < this.distance(particle, closest[k])) {
              closest[k] = other;
              break;
            }
          }
        }
      }
      particle.closest = closest;
    }

    // Create circles for each particle
    for (const particle of this.particles) {
      particle.circle = new ParticleCircle(particle, 2 + 2 * Math.random(), "rgba(255,255,255,0.3)");
    }
  }

  private bindEvents() {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }
    window.addEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("resize", this.onResize.bind(this));
  }

  private onMouseMove(e: MouseEvent) {
    let x = 0, y = 0;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else if (e.clientX || e.clientY) {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    this.mousePosition = { x, y };
  }

  private onScroll() {
    this.scrollActive = document.body.scrollTop <= this.height;
  }

  private onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.container.style.height = this.height + "px";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  private drawLines(particle: Particle) {
    if (!this.ctx || !particle.active) return;
    for (const closest of particle.closest) {
      if (!closest.active) continue;
      this.ctx.beginPath();
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.lineTo(closest.x, closest.y);
      this.ctx.strokeStyle = `rgba(255,255,255,${particle.active})`;
      this.ctx.stroke();
    }
  }

  private updateParticles() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const particle of this.particles) {
      const dist = this.distance(this.mousePosition, particle);
      if (dist < 4000) {
        particle.active = 0.3;
        // Fixed: Check if circle exists before accessing
        if (particle.circle) particle.circle.active = 0.6;
      } else if (dist < 20000) {
        particle.active = 0.1;
        // Fixed: Check if circle exists before accessing
        if (particle.circle) particle.circle.active = 0.3;
      } else if (dist < 40000) {
        particle.active = 0.02;
        // Fixed: Check if circle exists before accessing
        if (particle.circle) particle.circle.active = 0.1;
      } else {
        particle.active = 0;
        // Fixed: Check if circle exists before accessing
        if (particle.circle) particle.circle.active = 0;
      }
      this.drawLines(particle);
      // Fixed: Check if circle exists before drawing
      if (particle.circle) particle.circle.draw(this.ctx);
    }
  }

  private animate = () => {
    this.updateParticles();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener("mousemove", this.onMouseMove.bind(this));
    window.removeEventListener("scroll", this.onScroll.bind(this));
    window.removeEventListener("resize", this.onResize.bind(this));
  }
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  active: number = 0;
  closest: Particle[] = [];
  circle: ParticleCircle | null = null; // This can be null

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }
}

class ParticleCircle {
  pos: Particle;
  radius: number;
  color: string;
  active: number = 0;

  constructor(pos: Particle, radius: number, color: string) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(255,255,255,${this.active})`;
    ctx.fill();
  }
}
// ==================== END PARTICLE ANIMATION ====================
// ==================== END PARTICLE ANIMATION ====================

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
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ParticleAnimation | null>(null);

  // Load hero images from API
  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      const response = await api.get("/HeroSliders");
      setHeroImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Preload images
useEffect(() => {
  if (heroImages.length === 0) return;

  const loadFirstImage = () => {
    const imgDesktop = new Image();
    const imgMobile = new Image();

    imgDesktop.src = `${API_BASE_URL}${heroImages[0].desktopImage}`;
    imgMobile.src = `${API_BASE_URL}${heroImages[0].mobileImage}`;

  
    imgDesktop.onload = imgMobile.onload = () => {
      setImagesLoaded(true);
    };
  };

  loadFirstImage();
}, [heroImages]);
useEffect(() => {
  if (!imagesLoaded || heroImages.length <= 1) return;

  heroImages.slice(1).forEach((item) => {
    const img = new Image();
    img.src = `${API_BASE_URL}${item.desktopImage}`;
  });

}, [imagesLoaded, heroImages]);
  // Auto-rotate images
  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [imagesLoaded, heroImages]);

  // Initialize particle animation when images are loaded
useEffect(() => {
  // Only run on desktop
  if (
    !imagesLoaded ||
    !containerRef.current ||
    window.innerWidth < 1024
  ) {
    return;
  }

  const timer = setTimeout(() => {
    animationRef.current = new ParticleAnimation(
      containerRef.current!,
      "particle-canvas"
    );
  }, 100);

  return () => {
    clearTimeout(timer);
    animationRef.current?.destroy();
  };
}, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white/20 border-t-[#a11d17] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      id="large-header"
      className="large-header relative h-[100vh] min-h-[600px] bg-[#0F172A] overflow-hidden"
    >
      {/* Particle Canvas - This is where the animation will draw */}
    {window.innerWidth >= 1024 && (
  <canvas
    id="particle-canvas"
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    style={{ width: "100%", height: "100%" }}
  />
)}

      {/* Background Images */}
    
<div className="absolute inset-0 z-0">
  <AnimatePresence mode="wait">
   
    <picture key={currentImage}>
      
    
      <source
        media="(max-width: 1023px)"
        srcSet={`${API_BASE_URL}${heroImages[currentImage]?.mobileImage}`}
      />

     
      <motion.img
        src={`${API_BASE_URL}${heroImages[currentImage]?.desktopImage}`}
        alt={heroImages[currentImage]?.title || "Hero"}
        loading={currentImage === 0 ? "eager" : "lazy"}
       
        className="absolute w-full h-full object-cover object-center lg:object-[center_20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    </picture>
  </AnimatePresence>
</div>

      {/* Dark Overlay for better text readability */}
       

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#FFF] font-semibold tracking-widest uppercase mb-2 block text-xs md:text-sm">
              FEATURED PROJECT
            </span>

            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 leading-tight">
              {heroImages[currentImage]?.title}
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-[3px] bg-[#a11d17] mb-4 rounded-full mx-auto"
            />

            <p className="text-xs md:text-sm text-gray-100 mb-6 max-w-lg mx-auto">
              {heroImages[currentImage]?.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link
                to={heroImages[currentImage]?.buttonUrl || "/projects"}
                className="px-6 py-2 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white text-xs font-medium rounded-md hover:scale-105 transition-all"
              >
                {heroImages[currentImage]?.buttonText || "Explore"}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 text-white hover:bg-[#a11d17] transition-all z-20 hidden md:block"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 text-white hover:bg-[#a11d17] transition-all z-20 hidden md:block"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`transition-all duration-300 rounded-full ${
              currentImage === i ? "w-6 h-1.5 bg-[#a11d17]" : "w-1.5 h-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// Rest of your components remain the same...
function MetricsSection() {
  const metrics = [
    { value: 600, suffix: "+", label: "Projects Completed", icon: Building2 },
    { value: 16, suffix: "+", label: "Years Experience", icon: Award },
    { value: 7, suffix: "+", label: "Countries", icon: Globe },
    { value: 50, suffix: "+", label: "Clients", icon: TrendingUp },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric, index }: { metric: any; index: number }) {
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
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get("/Projects");
      console.log('Projects data:', response.data); // ✅ تحقق من البيانات
      
      const sortedProjects = [...response.data].sort((a, b) => {
        const orderA = a.displayOrder ?? 999;
        const orderB = b.displayOrder ?? 999;
        return orderA - orderB;
      });
      setFeaturedProjects(sortedProjects.slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

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
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all group"
          >
            View All Projects
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ دالة للحصول على رابط الصورة
  const getImageUrl = (project: any) => {
    // إذا كان هناك image مباشر
    if (project.image) {
      return `${API_BASE_URL}${project.image}`;
    }
    // إذا كان هناك desktopUrl في gallery
    if (project.gallery && project.gallery.length > 0) {
      const firstImage = project.gallery[0];
      if (typeof firstImage === 'string') {
        return `${API_BASE_URL}${firstImage}`;
      }
      if (firstImage.desktopUrl) {
        return `${API_BASE_URL}${firstImage.desktopUrl}`;
      }
    }
    // صورة افتراضية
    return '/placeholder-image.jpg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projects/${project.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={getImageUrl(project)}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white text-xs mb-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#a11d17] rounded-full">{project.sector}</span>
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
            <p className="text-[#64748b] text-sm mb-4">{project.location}</p>
            <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
              View Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServicesSection() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get("/Services");
      setServices(response.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#64748b]">Loading Services...</div>
    );
  }

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
            className="text-lg text-[#64748b] max-w-2xl mx-auto"
          >
            Comprehensive MEP solutions for every project
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white p-7 rounded-2xl border border-[#e2e8f0] hover:border-[#a11d17] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-5xl mb-5">{getIcon(service.icon)}</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#a11d17] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#64748b] text-lg leading-relaxed line-clamp-3">
                {service.shortDescription}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-xl hover:shadow-lg transition-all group"
          >
            Explore All Services
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const clients = Array.from({ length: 37 }, (_, i) => ({
    id: i + 1,
    logo: `/clients/image (${i + 1}).png`,
  }));

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
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
          <p className="text-xl text-gray-400">Our valued clients and partners</p>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#a11d17] hover:text-white transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#a11d17] hover:text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-10">
            {visibleClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-6 h-28 flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
             <img
  src={client.logo}
  alt={`Client ${client.id}`}
  loading="lazy"
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
            Our team of experts is ready to bring your vision to life with innovative MEP solutions
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#a11d17] rounded-lg hover:shadow-2xl transition-all group font-semibold"
          >
            Get in Touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
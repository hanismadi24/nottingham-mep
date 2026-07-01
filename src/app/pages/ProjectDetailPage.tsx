import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  User,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import api, { API_BASE_URL } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// تعريف الـ interface لصور المعرض
interface GalleryImage {
  desktopUrl: string;
  mobileUrl?: string;
}

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  // دالة مساعدة للحصول على صورة الموبايل مع fallback
  const getMobileImage = (img: any): string => {
    if (img?.mobileUrl) return img.mobileUrl;
    if (img?.mobileImage) return img.mobileImage;
    if (img?.desktopUrl) return img.desktopUrl;
    if (img?.image) return img.image;
    return '';
  };

  // دالة مساعدة للحصول على صورة الديستكوب
  const getDesktopImage = (img: any): string => {
    if (img?.desktopUrl) return img.desktopUrl;
    if (img?.image) return img.image;
    if (img?.desktop) return img.desktop;
    return '';
  };

  // دمج الصور في مصفوفة موحدة
  const galleryImages = project?.gallery || [];
  
  const allImages = [
    // الصورة الرئيسية
    {
      desktop: project?.image,
      mobile: project?.imageMobileUrl || project?.image
    },
    // صور المعرض
    ...galleryImages.map((img: any) => ({
      desktop: getDesktopImage(img),
      mobile: getMobileImage(img)
    }))
  ].filter(img => img.desktop); // فقط الصور التي لها نسخة ديستكوب

  const loadProject = async (id: string) => {
    try {
      const response = await api.get(`/Projects/${id}`);
      setProject(response.data);

      const allProjectsResponse = await api.get("/Projects");
      const allProjects = allProjectsResponse.data;

      // نفس القطاع
      const sectorProjects = allProjects.filter(
        (p: any) =>
          p.sector === response.data.sector &&
          p.id !== response.data.id
      );

      // إذا لم يوجد مشاريع في نفس القطاع -> عشوائي
      const finalProjects = sectorProjects.length > 0
        ? sectorProjects
        : allProjects
            .filter((p: any) => p.id !== response.data.id)
            .sort(() => 0.5 - Math.random());

      setRelatedProjects(finalProjects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#a11d17] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            Project Not Found
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#a11d17] hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO - مع دعم صور الموبايل والديستكوب */}
      <div className="relative h-[60vh] min-h-[500px] bg-[#0F172A] overflow-hidden">
        
        {/* SWIPER IMAGE BACKGROUND CAROUSEL */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".custom-prev-button",
              nextEl: ".custom-next-button",
            }}
            loop={allImages.length > 1}
            className="w-full h-full"
          >
            {allImages.map((imgObj, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                {/* 
                  ✅ استخدام <picture> مع <source> لعرض الصورة المناسبة حسب الجهاز
                  - على الموبايل: تعرض صورة الموبايل إذا كانت موجودة
                  - على الديستكوب: تعرض صورة الديستكوب
                */}
                <picture className="w-full h-full block">
                  {/* صورة الموبايل (للشاشات الصغيرة) */}
                  {imgObj.mobile && (
                    <source
                      media="(max-width: 1023px)"
                      srcSet={`${API_BASE_URL}${imgObj.mobile}`}
                    />
                  )}
                  {/* صورة الديستكوب (للشاشات الكبيرة) */}
                  <source
                    media="(min-width: 1024px)"
                    srcSet={`${API_BASE_URL}${imgObj.desktop}`}
                  />
                  {/* Fallback: صورة الديستكوب */}
                  <img
                    src={`${API_BASE_URL}${imgObj.desktop}`}
                    alt={`${project?.name || "Project"} view ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center select-none subpixel-antialiased"
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* FLOATING TEXT AND BUTTON INTERFACE CONTAINER */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between pt-15 pb-12 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-auto">
            {/* Back Button */}
          
          </div>

          {/* Bottom Panel */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-auto">
            
            {/* Text Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="px-3 py-1 bg-[#a11d17] text-white rounded-full text-xs font-semibold tracking-wide"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                >
                  {project?.sector}
                </span>
              </div>

              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight leading-tight"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.75), 0 1px 2px rgba(0,0,0,0.9)" }}
              >
                {project?.name}
              </h1>

              <div
                className="flex items-center gap-2 text-white text-sm md:text-base font-medium"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)" }}
              >
                <MapPin size={16} className="drop-shadow-lg" />
                {project?.location}
              </div>
            </motion.div>

            {/* Swiper Navigation */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-white/10 self-end md:self-auto shadow-2xl">
                <button
                  className="custom-prev-button p-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                
                <button
                  className="custom-next-button p-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* OVERVIEW */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                Project Overview
              </h2>
              <p className="text-[#64748b] leading-relaxed">
                {project.description}
              </p>
            </motion.section>

            {/* SCOPE */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                Scope of Work
              </h2>
              <p className="text-[#64748b] leading-relaxed">
                {project.scope}
              </p>
            </motion.section>

            {/* SERVICES */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                Services Provided
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.serviceType?.map((service: string, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-gradient-to-r from-[#a11d17]/10 to-[#7d1712]/10 rounded-lg border border-[#a11d17]/20 text-[#0F172A]"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* RIGHT - Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">
                Project Details
              </h3>

              <div className="space-y-4">
                <DetailItem
                  icon={User}
                  label="Client"
                  value={project.client}
                />
                <DetailItem
                  icon={MapPin}
                  label="Location"
                  value={project.location}
                />
                <DetailItem
                  icon={Building2}
                  label="Built-up Area"
                  value={project.builtUpArea}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
                <Link
                  to="/contact"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Request Consultation
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0F172A]">
                  Related Projects
                </h2>
                <p className="text-[#64748b] mt-2">
                  Similar projects you may like
                </p>
              </div>
            </div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {relatedProjects.map((relatedProject) => (
                <SwiperSlide key={relatedProject.id}>
                  <Link
                    to={`/projects/${relatedProject.id}`}
                    className="group block h-full"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={`${API_BASE_URL}${relatedProject.image}`}
                          alt={relatedProject.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#a11d17] text-white text-xs rounded-full">
                            {relatedProject.sector}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#a11d17] transition-colors">
                          {relatedProject.name}
                        </h3>
                        <p className="text-sm text-[#64748b] flex items-center gap-2 mb-4">
                          <MapPin size={15} />
                          {relatedProject.location}
                        </p>
                        <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
                          View Project
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button className="custom-prev w-11 h-11 rounded-full bg-[#a11d17] text-white flex items-center justify-center hover:bg-[#7d1712] transition-all shadow-md">
                <ChevronLeft size={20} />
              </button>
              <button className="custom-next w-11 h-11 rounded-full bg-[#a11d17] text-white flex items-center justify-center hover:bg-[#7d1712] transition-all shadow-md">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-sm text-[#64748b]">{label}</div>
        <div className="font-semibold text-[#0F172A]">{value}</div>
      </div>
    </div>
  );
}
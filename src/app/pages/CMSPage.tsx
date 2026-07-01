import { motion } from "motion/react";
import React,{ useEffect, useState } from "react";
import api, { API_BASE_URL } from "../../api";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Settings, FileText, Briefcase, Info, Phone, Users, Send, Edit2, Trash2, Plus, Eye, MessageSquare, MapPin, Building, Mail, Clock, Globe,Calendar, Search,X, Check, Image as ImageIcon, LogOut } from "lucide-react";
import { emojiMap } from "../pages/icons";

type EmojiKey = keyof typeof emojiMap;
import ProjectFormModal from "../pages/ProjectFormModal";
import { Navigate, useNavigate } from "react-router-dom";
// --- Interfaces for API Data ---
interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  currentPosition: string;
  yearsOfExperience: string;
  coverLetter: string;
  cvFile: string;
  createdDate: string;
}

interface ContactBranch {
  id: string;
  name: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  googleMapUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface ContactSettings {
  id: string;
  heroTitle: string;
  heroDescription: string;
}

interface ContactMessage {
  id: string;
  branchId: string;
  branchName?: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdDate: string;
}

export function CMSPage() {
 
    const navigate = useNavigate(); // ✅ استخدام useNavigate
  const token = localStorage.getItem("token");
  const [isLoggingOut, setIsLoggingOut] = useState(false); // ✅ حالة التحميل
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  const [activeTab, setActiveTab] = useState<"site" | "hero" | "services" | "projects" | "about" | "contact" | "messages" | "careers">("site");

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: FileText },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact Settings", icon: Phone },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "careers", label: "Career Applications", icon: Users },
  ];

 
// واستبدله بـ:


const handleLogout = async () => {
  if (!confirm("Are you sure you want to logout?")) {
    return;
  }

  setIsLoggingOut(true);

  try {
    // محاولة استدعاء API logout
    await api.post("/Auth/logout");
  } catch (error) {
    console.error("Logout API error:", error);
    // حتى لو فشل الـ API، نقوم بتسجيل الخروج محلياً
  } finally {
    // تنظيف localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    
    // حذف الـ Authorization header
    delete api.defaults.headers.common["Authorization"];
    
    setIsLoggingOut(false);
    // التوجيه إلى login باستخدام navigate
    navigate("/login", { replace: true });
  }
};
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">
              Manage website content, contact branches, and view messages
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[#e2e8f0]">
            <div className="flex overflow-x-auto items-center justify-between">
              {/* ✅ Tabs على اليسار */}
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-[#a11d17] text-[#a11d17]"
                          : "border-transparent text-[#64748b] hover:text-[#0F172A]"
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ✅ Logout Button بجانب Career Applications */}
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-px h-8 bg-[#e2e8f0]"></div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 text-[#64748b] hover:text-[#a11d17] px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#a11d17] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                      <span className="text-sm font-medium">Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {activeTab === "hero" && <HeroSection />}
            {activeTab === "services" && <ServicesSection />}
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "contact" && <ContactManagementSection />}
            {activeTab === "messages" && <MessagesManagementSection />}
            {activeTab === "careers" && <CareersManagementSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HERO SECTION ---
// --- IMPROVED HERO SECTION ---
// --- HERO SECTION (النسخة المبسطة والتي تعمل 100%) ---
function HeroSection() {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [editingHero, setEditingHero] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<{ desktop: string; mobile: string }>({ desktop: "", mobile: "" });
  
  const [heroForm, setHeroForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonUrl: "",
    displayOrder: 1,
    isActive: true,
  });
  
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      setLoading(true);
      console.log("Loading heroes...");
      const response = await api.get("/HeroSliders");
      console.log("Heroes loaded:", response.data);
      const sortedHeroes = [...response.data].sort((a, b) => a.displayOrder - b.displayOrder);
      setHeroes(sortedHeroes);
    } catch (error) {
      console.error("Error loading heroes:", error);
      alert("Failed to load heroes: " + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHeroForm({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonUrl: "",
      displayOrder: heroes.length + 1,
      isActive: true,
    });
    setDesktopImage(null);
    setMobileImage(null);
    setImagePreview({ desktop: "", mobile: "" });
    setEditingHero(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (hero: any) => {
    setEditingHero(hero);
    setHeroForm({
      title: hero.title,
      subtitle: hero.subtitle || "",
      buttonText: hero.buttonText || "",
      buttonUrl: hero.buttonUrl || "",
      displayOrder: hero.displayOrder,
      isActive: hero.isActive !== undefined ? hero.isActive : true,
    });
    if (hero.desktopImage) {
      setImagePreview(prev => ({ ...prev, desktop: `${API_BASE_URL}${hero.desktopImage}` }));
    }
    if (hero.mobileImage) {
      setImagePreview(prev => ({ ...prev, mobile: `${API_BASE_URL}${hero.mobileImage}` }));
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", heroForm.title);
      formData.append("Subtitle", heroForm.subtitle);
      formData.append("ButtonText", heroForm.buttonText);
      formData.append("ButtonUrl", heroForm.buttonUrl);
      formData.append("DisplayOrder", heroForm.displayOrder.toString());
      formData.append("IsActive", heroForm.isActive.toString());

      if (desktopImage) formData.append("DesktopImage", desktopImage);
      if (mobileImage) formData.append("MobileImage", mobileImage);

      if (editingHero) {
        console.log("Updating hero:", editingHero.id);
        await api.put(`/HeroSliders/${editingHero.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Hero updated successfully");
      } else {
        console.log("Creating new hero");
        await api.post("/HeroSliders", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Hero created successfully");
      }

      await loadHeroes();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving hero:", error);
      alert(editingHero ? "Error updating hero" : "Error creating hero");
    } finally {
      setLoading(false);
    }
  };

 const deleteHero = async (id: string) => {
  if (!confirm("Are you sure you want to delete this hero slide?")) return;
  try {
    setLoading(true);
    console.log(`Deleting hero with ID: ${id}`);
    await api.delete(`/HeroSliders/${id}`);  // id هو string
    await loadHeroes();
    alert("Hero deleted successfully");
  } catch (error) {
    console.error("Error deleting hero:", error);
    alert("Error deleting hero");
  } finally {
    setLoading(false);
  }
};

  const toggleHeroStatus = async (hero: any) => {
    try {
      console.log("Toggling status for hero:", hero.id);
      await api.patch(`/HeroSliders/${hero.id}/toggle-active`);
      await loadHeroes();
    } catch (error) {
      console.error("Error toggling hero status:", error);
      alert("Failed to update hero status");
    }
  };

  // ✅ دالة إعادة الترتيب
  const moveHero = async (hero: any, direction: 'up' | 'down') => {
    const currentIndex = heroes.findIndex(h => h.id === hero.id);
    
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === heroes.length - 1) return;
    
    const targetHero = direction === 'up' ? heroes[currentIndex - 1] : heroes[currentIndex + 1];
    
    try {
      setLoading(true);
      
      // تحديث ترتيب hero الحالي
      const formData1 = new FormData();
      formData1.append("Title", hero.title);
      formData1.append("Subtitle", hero.subtitle || "");
      formData1.append("ButtonText", hero.buttonText || "");
      formData1.append("ButtonUrl", hero.buttonUrl || "");
      formData1.append("DisplayOrder", targetHero.displayOrder.toString());
      formData1.append("IsActive", hero.isActive.toString());
      await api.put(`/HeroSliders/${hero.id}`, formData1, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // تحديث ترتيب الهدف
      const formData2 = new FormData();
      formData2.append("Title", targetHero.title);
      formData2.append("Subtitle", targetHero.subtitle || "");
      formData2.append("ButtonText", targetHero.buttonText || "");
      formData2.append("ButtonUrl", targetHero.buttonUrl || "");
      formData2.append("DisplayOrder", hero.displayOrder.toString());
      formData2.append("IsActive", targetHero.isActive.toString());
      await api.put(`/HeroSliders/${targetHero.id}`, formData2, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      await loadHeroes();
    } catch (error) {
      console.error("Error moving hero:", error);
      alert("Failed to reorder heroes");
    } finally {
      setLoading(false);
    }
  };

  const handleImageDrop = (e: React.DragEvent, type: 'desktop' | 'mobile') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (type === 'desktop') {
        setDesktopImage(file);
        setImagePreview(prev => ({ ...prev, desktop: URL.createObjectURL(file) }));
      } else {
        setMobileImage(file);
        setImagePreview(prev => ({ ...prev, mobile: URL.createObjectURL(file) }));
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'desktop') {
        setDesktopImage(file);
        setImagePreview(prev => ({ ...prev, desktop: URL.createObjectURL(file) }));
      } else {
        setMobileImage(file);
        setImagePreview(prev => ({ ...prev, mobile: URL.createObjectURL(file) }));
      }
    }
  };

  const removeImage = (type: 'desktop' | 'mobile') => {
    if (type === 'desktop') {
      setDesktopImage(null);
      setImagePreview(prev => ({ ...prev, desktop: "" }));
    } else {
      setMobileImage(null);
      setImagePreview(prev => ({ ...prev, mobile: "" }));
    }
  };

  if (loading && heroes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hero Slider Management</h2>
          <p className="text-gray-500 mt-1">Manage homepage hero sliders and banners</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#a11d17] text-white px-6 py-3 rounded-lg hover:bg-[#8a1813] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add New Slide
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Slides</p>
              <p className="text-3xl font-bold">{heroes.length}</p>
            </div>
            <FileText size={32} className="opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Slides</p>
              <p className="text-3xl font-bold">{heroes.filter(h => h.isActive !== false).length}</p>
            </div>
            <Eye size={32} className="opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Display Order</p>
              <p className="text-3xl font-bold">{heroes.length > 0 ? `${heroes[0]?.displayOrder} - ${heroes[heroes.length-1]?.displayOrder}` : '0'}</p>
            </div>
            <ArrowUp size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Heroes Grid */}
      {heroes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No hero slides yet. Click "Add New Slide" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {heroes.map((hero, index) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                hero.isActive === false ? 'opacity-75 bg-gray-50' : ''
              }`}
            >
              {/* Image Preview Section */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Desktop Image */}
                  <div className="relative h-48 md:h-64 bg-gray-100">
                    {hero.desktopImage ? (
                      <>
                        <img
                          src={`${API_BASE_URL}${hero.desktopImage}`}
                          alt={`${hero.title} - Desktop`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm">
                            Desktop Version
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Building size={32} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">No desktop image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Image */}
                  <div className="relative h-48 md:h-64 bg-gray-100">
                    {hero.mobileImage ? (
                      <>
                        <img
                          src={`${API_BASE_URL}${hero.mobileImage}`}
                          alt={`${hero.title} - Mobile`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <span className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm">
                            Mobile Version
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Phone size={32} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">No mobile image</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => toggleHeroStatus(hero)}
                    className={`p-2 rounded-lg shadow-md transition-colors ${
                      hero.isActive !== false
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }`}
                    title={hero.isActive !== false ? 'Deactivate' : 'Activate'}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(hero)}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteHero(hero.id)}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
                
                {/* Order Controls */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                  <button
                    onClick={() => moveHero(hero, 'up')}
                    disabled={index === 0}
                    className={`p-2 rounded-lg shadow-md transition-colors ${
                      index === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                    title="Move Up"
                  >
                    <ArrowUp size={16} className={index === 0 ? 'text-gray-400' : 'text-[#a11d17]'} />
                  </button>
                  <div className="bg-white p-2 rounded-lg shadow-md text-center min-w-[50px]">
                    <span className="text-xs text-gray-500">Order</span>
                    <p className="font-bold text-[#a11d17]">{hero.displayOrder}</p>
                  </div>
                  <button
                    onClick={() => moveHero(hero, 'down')}
                    disabled={index === heroes.length - 1}
                    className={`p-2 rounded-lg shadow-md transition-colors ${
                      index === heroes.length - 1
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                    title="Move Down"
                  >
                    <ArrowDown size={16} className={index === heroes.length - 1 ? 'text-gray-400' : 'text-[#a11d17]'} />
                  </button>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{hero.title}</h3>
                    <p className="text-gray-600">{hero.subtitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hero.isActive !== false
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {hero.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                {hero.buttonText && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm font-medium text-gray-700">Button:</span>
                    <span className="text-sm text-[#a11d17]">{hero.buttonText}</span>
                    {hero.buttonUrl && (
                      <a
                        href={hero.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline ml-2"
                      >
                        ({hero.buttonUrl})
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingHero ? "Edit Hero Slide" : "Create New Hero Slide"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                      placeholder="Enter main title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <textarea
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all min-h-[100px]"
                      placeholder="Enter subtitle or description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.buttonText}
                        onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                        placeholder="e.g., Learn More"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button URL
                      </label>
                      <input
                        type="text"
                        value={heroForm.buttonUrl}
                        onChange={(e) => setHeroForm({ ...heroForm, buttonUrl: e.target.value })}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                        placeholder="e.g., /contact"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={heroForm.displayOrder}
                        onChange={(e) => setHeroForm({ ...heroForm, displayOrder: Number(e.target.value) })}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={heroForm.isActive}
                          onChange={(e) => setHeroForm({ ...heroForm, isActive: e.target.checked })}
                          className="w-4 h-4 text-[#a11d17] focus:ring-[#a11d17]"
                        />
                        <span className="text-sm font-medium text-gray-700">Active</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image Uploads */}
                <div className="space-y-4">
                  {/* Desktop Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desktop Image (1920x1080 recommended)
                    </label>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleImageDrop(e, 'desktop')}
                      className="border-2 border-dashed rounded-lg p-4 text-center hover:border-[#a11d17] transition-colors"
                    >
                      {imagePreview.desktop ? (
                        <div className="relative">
                          <img
                            src={imagePreview.desktop}
                            alt="Desktop preview"
                            className="max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <button
                            onClick={() => removeImage('desktop')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageSelect(e, 'desktop')}
                            className="hidden"
                            id="desktop-image-upload"
                          />
                          <label htmlFor="desktop-image-upload" className="cursor-pointer">
                            <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600">Click to upload or drag & drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Image (750x1334 recommended)
                    </label>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleImageDrop(e, 'mobile')}
                      className="border-2 border-dashed rounded-lg p-4 text-center hover:border-[#a11d17] transition-colors"
                    >
                      {imagePreview.mobile ? (
                        <div className="relative">
                          <img
                            src={imagePreview.mobile}
                            alt="Mobile preview"
                            className="max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <button
                            onClick={() => removeImage('mobile')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageSelect(e, 'mobile')}
                            className="hidden"
                            id="mobile-image-upload"
                          />
                          <label htmlFor="mobile-image-upload" className="cursor-pointer">
                            <Phone size={40} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600">Click to upload or drag & drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !heroForm.title}
                className="bg-[#a11d17] text-white px-6 py-2 rounded-lg hover:bg-[#8a1813] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {editingHero ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {editingHero ? "Update Slide" : "Create Slide"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// --- SERVICES SECTION ---
function ServicesSection() {
  const emojiKeys = Object.keys(emojiMap) as EmojiKey[];
  const [services, setServices] = useState<any[]>([]);
  const [iconSearch, setIconSearch] = useState("");
  const [iconOpen, setIconOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const filteredIcons = emojiKeys.filter((icon) => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );
  
  const [newService, setNewService] = useState({
    title: "",
    shortDescription: "",
    description: "",
    icon: "",
    displayOrder: 1,
    features: "",
    isActive: true,
  });
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get("/Services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setNewService({
      title: "",
      shortDescription: "",
      description: "",
      icon: "",
      displayOrder: 1,
      features: "",
      isActive: true,
    });
    setServiceImage(null);
    setImagePreview("");
    setEditingService(null);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setNewService({
      title: service.title,
      shortDescription: service.shortDescription || "",
      description: service.description,
      icon: service.icon,
      displayOrder: service.displayOrder,
      features: service.features?.join("\n") || "",
      isActive: service.isActive !== undefined ? service.isActive : true,
    });
    if (service.image) {
      setImagePreview(`${API_BASE_URL}${service.image}`);
    }
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", newService.title);
      formData.append("ShortDescription", newService.shortDescription);
      formData.append("Description", newService.description);
      formData.append("Icon", newService.icon);
      formData.append("DisplayOrder", newService.displayOrder.toString());
      formData.append("IsActive", newService.isActive.toString());
      
      if (serviceImage) formData.append("Image", serviceImage);
      
      newService.features.split("\n")
        .filter((x) => x.trim() !== "")
        .forEach((feature) => formData.append("Features", feature.trim()));

      if (editingService) {
        await api.put(`/Services/${editingService.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Service updated successfully");
      } else {
        await api.post("/Services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Service created successfully");
      }

      loadServices();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.log(error);
      alert(editingService ? "Error updating service" : "Error creating service");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this service?")) return;
      await api.delete(`/Services/${id}`);
      loadServices();
      alert("Service deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting service");
    }
  };

  const renderIcon = (iconName: string) => emojiMap[iconName as EmojiKey] || "⚙️";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setServiceImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Services Management</h2>
          <p className="text-gray-500 mt-1">Manage your services and their features</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#a11d17] text-white px-6 py-3 rounded-lg hover:bg-[#8a1813] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {service.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${API_BASE_URL}${service.image}`}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{service.icon && renderIcon(service.icon)}</div>
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{service.shortDescription}</p>
              
              <p className="text-gray-700 mb-6 line-clamp-3">{service.description}</p>
              
              {service.features && service.features.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Check size={16} className="text-green-600" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.slice(0, 4).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#a11d17] rounded-full"></div>
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {service.features.length > 4 && (
                    <p className="text-xs text-gray-400 mt-2">
                      +{service.features.length - 4} more features
                    </p>
                  )}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  Order: {service.displayOrder}
                </span>
                {!service.image && (
                  <button
                    onClick={() => openEditModal(service)}
                    className="text-[#a11d17] hover:text-[#8a1813] font-medium"
                  >
                    Add Image
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No services yet. Click "Add New Service" to get started.</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingService ? "Edit Service" : "Create New Service"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                      placeholder="Enter service title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                    <input
                      type="text"
                      value={newService.shortDescription}
                      onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                      placeholder="Brief description (max 100 chars)"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all min-h-[120px]"
                      placeholder="Detailed description of the service"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon *</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIconOpen(!iconOpen)}
                        className="w-full border rounded-lg p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        {newService.icon ? (
                          <>
                            <span className="text-3xl">{emojiMap[newService.icon as keyof typeof emojiMap]}</span>
                            <span className="text-gray-700">{newService.icon}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Select an icon</span>
                        )}
                      </button>
                      
                      {iconOpen && (
                        <div className="absolute z-50 bg-white border rounded-lg mt-2 w-full shadow-xl">
                          <div className="p-3 border-b">
                            <input
                              type="text"
                              placeholder="Search icons..."
                              value={iconSearch}
                              onChange={(e) => setIconSearch(e.target.value)}
                              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#a11d17]"
                              autoFocus
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-2 p-3 max-h-64 overflow-y-auto">
                            {filteredIcons.map((key) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  setNewService({ ...newService, icon: key });
                                  setIconOpen(false);
                                }}
                                className="flex flex-col items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <span className="text-3xl">{emojiMap[key]}</span>
                                <span className="text-xs mt-1 text-gray-600 group-hover:text-gray-900">{key}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={newService.displayOrder}
                      onChange={(e) => setNewService({ ...newService, displayOrder: Number(e.target.value) })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all"
                      placeholder="Order number"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      value={newService.features}
                      onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none transition-all min-h-[150px] font-mono text-sm"
                      placeholder="24/7 Support&#10;Fast Response Time&#10;Expert Team&#10;Best Price Guarantee"
                    />
                    <p className="text-xs text-gray-500 mt-1">Press Enter after each feature</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-[#a11d17] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-40 mx-auto rounded-lg object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setServiceImage(null);
                                setImagePreview("");
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="py-8">
                            <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600">Click to upload image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newService.isActive}
                        onChange={(e) => setNewService({ ...newService, isActive: e.target.checked })}
                        className="w-4 h-4 text-[#a11d17] focus:ring-[#a11d17]"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !newService.title || !newService.shortDescription || !newService.description || !newService.icon}
                className="bg-[#a11d17] text-white px-6 py-2 rounded-lg hover:bg-[#8a1813] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {editingService ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {editingService ? "Update Service" : "Create Service"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// في CMSPage.tsx، استبدل تعريف Project بهذا:
interface GalleryImage {
  desktopUrl: string;
  mobileUrl: string;
}
interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  country: string;
  sector: string;
  client: string;
  projectType: string;
  builtUpArea?: string;  // تأكد من وجود علامة ? هنا
  year: string;
  image: string;
    imageMobileUrl?: string; // ← أضف هذا الحقل
  description: string;
  scope: string;
  serviceType: string[];
  gallery: GalleryImage[]; // ← تغير من string[] إلى GalleryImage[]

  displayOrder?: number; // تأكد من وجود علامة ? هنا
}
function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = projects.filter(project => 
        project.name?.toLowerCase().includes(term) ||
        project.location?.toLowerCase().includes(term) ||
        project.sector?.toLowerCase().includes(term) ||
        project.client?.toLowerCase().includes(term) ||
        project.city?.toLowerCase().includes(term) ||
        project.country?.toLowerCase().includes(term) ||
        project.description?.toLowerCase().includes(term) ||
        project.serviceType?.some(service => service.toLowerCase().includes(term))
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  const fetchProjects = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Project[]>('/Projects');
      console.log('Fetched projects:', response.data);
      
      // Sort projects by displayOrder when fetching
      const sortedProjects = [...response.data].sort((a, b) => {
        const orderA = a.displayOrder ?? 999;
        const orderB = b.displayOrder ?? 999;
        return orderA - orderB;
      });
      
      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/Projects/${id}`);
        await fetchProjects();
        alert('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleEdit = (project: Project): void => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = (): void => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleModalSuccess = (): void => {
    fetchProjects();
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // دالة مساعدة لإنشاء FormData للمشروع
  const createProjectFormData = (project: Project, newOrder: number): FormData => {
    const formData = new FormData();
    
    // البيانات الأساسية
    formData.append('Slug', project.slug || project.id);
    formData.append('Name', project.name);
    formData.append('Location', project.location || '');
    formData.append('City', project.city || '');
    formData.append('Country', project.country || '');
    formData.append('Sector', project.sector || '');
    formData.append('Client', project.client || '');
    formData.append('ProjectType', project.projectType || '');
    formData.append('BuiltUpArea', project.builtUpArea || '');
    formData.append('Year', project.year || '');
    formData.append('Description', project.description || '');
    formData.append('Scope', project.scope || '');
    formData.append('DisplayOrder', newOrder.toString());

    // الخدمات
    if (project.serviceType && project.serviceType.length > 0) {
      project.serviceType.forEach(service => {
        formData.append('ServiceTypes', service);
      });
    }

    // صور المعرض الموجودة (Desktop + Mobile)
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.forEach(item => {
        if (item.desktopUrl) {
          formData.append('KeepGalleryImages', item.desktopUrl);
        }
        if (item.mobileUrl) {
          formData.append('KeepGalleryMobileImages', item.mobileUrl);
        }
      });
    }

    // الصورة الرئيسية (Desktop)
    if (project.image) {
      formData.append('KeepMainImage', project.image);
    }

    // صورة الموبايل الرئيسية
    if (project.imageMobileUrl) {
      formData.append('KeepMainImageMobile', project.imageMobileUrl);
    }

    return formData;
  };

  const handleDisplayOrderChange = async (projectId: string, newOrder: number): Promise<void> => {
    try {
      setUpdatingOrderId(projectId);
      setUpdateError(null);
      
      console.log(`Updating display order for ${projectId} to ${newOrder}`);

      // استخدام PATCH أولاً (الأفضل)
      try {
        await api.patch(`/Projects/${projectId}/displayorder`, {
          displayOrder: newOrder
        });
        console.log('✅ PATCH succeeded');
      } catch (patchError: any) {
        console.log('PATCH failed, trying PUT...', patchError);
        
        // Fallback: استخدام PUT مع البيانات الكاملة
        const projectToUpdate = projects.find(p => p.id === projectId);
        if (!projectToUpdate) {
          throw new Error('Project not found');
        }

        const formData = createProjectFormData(projectToUpdate, newOrder);

        await api.put(`/Projects/${projectId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('✅ PUT succeeded');
      }
      
      // تحديث القائمة بعد التغيير
      await fetchProjects();
      
    } catch (error: any) {
      console.error('Error updating display order:', error);
      
      let errorMessage = 'Failed to update display order';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.title) {
        errorMessage = error.response.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setUpdateError(errorMessage);
      alert(`Failed to update display order: ${errorMessage}`);
    } finally {
      setUpdatingOrderId(null);
      setTimeout(() => setUpdateError(null), 3000);
    }
  };

  const moveProjectUp = (project: Project, currentIndex: number): void => {
    if (currentIndex === 0) return;
    
    const currentOrder = project.displayOrder ?? currentIndex + 1;
    const newOrder = currentOrder - 1;
    handleDisplayOrderChange(project.id, newOrder);
  };

  const moveProjectDown = (project: Project, currentIndex: number): void => {
    if (currentIndex === filteredProjects.length - 1) return;
    
    const currentOrder = project.displayOrder ?? currentIndex + 1;
    const newOrder = currentOrder + 1;
    handleDisplayOrderChange(project.id, newOrder);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6">
          <p className="text-[#64748b]">Loading projects...</p>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((n: number) => (
            <div key={n} className="border border-[#e2e8f0] rounded-xl p-6 animate-pulse">
              <div className="flex gap-4 mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-2 px-4 py-2 bg-[#a11d17] text-white rounded-lg hover:bg-[#8a1813]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-[#64748b]">
              Total Projects: <span className="font-bold text-[#0F172A]">{filteredProjects.length}</span>
              {searchTerm && (
                <span className="text-sm ml-2">
                  (from {projects.length} total)
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                  className="pl-10 pr-10 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] focus:border-transparent w-64"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748b] hover:text-[#a11d17]"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-[#a11d17] text-white rounded-lg hover:bg-[#8a1813] flex items-center gap-2"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>
          </div>
          
          {updateError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{updateError}</p>
            </div>
          )}
          
          {searchTerm && filteredProjects.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-yellow-800">
                No projects found matching "{searchTerm}"
              </p>
              <button
                onClick={clearSearch}
                className="mt-2 text-sm text-[#a11d17] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        <div className="grid gap-6">
          {filteredProjects.map((project: Project, index: number) => (
            <div key={project.id} className="border border-[#e2e8f0] rounded-xl p-6 hover:shadow-lg transition-shadow relative">
              {/* Display Order Editor Section */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-2 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#64748b] font-medium">Order:</span>
                  {updatingOrderId === project.id ? (
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 border-2 border-[#a11d17] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-[#64748b]">Updating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveProjectUp(project, index)}
                        disabled={index === 0}
                        className={`p-1 rounded transition-colors ${
                          index === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-[#a11d17] hover:bg-[#a11d17]/10'
                        }`}
                        title="Move up (decrease order number)"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <input
                        type="number"
                        value={project.displayOrder ?? index + 1}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          if (!isNaN(newValue) && newValue > 0) {
                            handleDisplayOrderChange(project.id, newValue);
                          }
                        }}
                        className="w-14 text-center text-sm border border-[#e2e8f0] rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-[#a11d17] focus:border-[#a11d17]"
                        min="1"
                        step="1"
                      />
                      <button
                        onClick={() => moveProjectDown(project, index)}
                        disabled={index === filteredProjects.length - 1}
                        className={`p-1 rounded transition-colors ${
                          index === filteredProjects.length - 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-[#a11d17] hover:bg-[#a11d17]/10'
                        }`}
                        title="Move down (increase order number)"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mb-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex gap-4 mb-4 mt-8">
                {project.image && (
                  <img 
                    src={`${API_BASE_URL}${project.image}`} 
                    alt={project.name} 
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{project.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-[#64748b] flex items-center gap-1">
                      <MapPin size={14} /> Location: <span className="text-[#0F172A]">{project.location}</span>
                    </span>
                    <span className="text-[#64748b] flex items-center gap-1">
                      <Briefcase size={14} /> Sector: <span className="text-[#0F172A]">{project.sector}</span>
                    </span>
                    <span className="text-[#64748b] flex items-center gap-1">
                      <Users size={14} /> Client: <span className="text-[#0F172A]">{project.client}</span>
                    </span>
                    <span className="text-[#64748b] flex items-center gap-1">
                      <Calendar size={14} /> Year: <span className="text-[#0F172A]">{project.year}</span>
                    </span>
                    {project.city && (
                      <span className="text-[#64748b] flex items-center gap-1">
                        <Building size={14} /> City: <span className="text-[#0F172A]">{project.city}</span>
                      </span>
                    )}
                    {project.country && (
                      <span className="text-[#64748b] flex items-center gap-1">
                        <Globe size={14} /> Country: <span className="text-[#0F172A]">{project.country}</span>
                      </span>
                    )}
                    {project.builtUpArea && (
                      <span className="text-[#64748b] flex items-center gap-1">
                        <Building size={14} /> Built-up Area: <span className="text-[#0F172A]">{project.builtUpArea} m²</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {project.description && (
                <p className="text-[#64748b] text-sm mb-4 line-clamp-2">{project.description}</p>
              )}
              
              {project.serviceType && project.serviceType.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.serviceType.map((service: string) => (
                    <span key={service} className="px-3 py-1 bg-[#a11d17]/10 text-[#a11d17] text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              )}
              
              {/* عرض صور المعرض */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-[#64748b] mb-2">Gallery Images:</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.gallery.slice(0, 4).map((item: GalleryImage, idx: number) => (
                      <div key={idx} className="relative flex-shrink-0">
                        <img 
                          src={`${API_BASE_URL}${item.desktopUrl}`}
                          alt={`${project.name} gallery ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-[#e2e8f0]"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                        {item.mobileUrl && (
                          <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-[8px] px-1 rounded">
                            📱
                          </div>
                        )}
                      </div>
                    ))}
                    {project.gallery.length > 4 && (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-[#64748b] flex-shrink-0">
                        +{project.gallery.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}

// --- CONTACT MANAGEMENT SECTION ---
function ContactManagementSection() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [branches, setBranches] = useState<ContactBranch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBranch, setEditingBranch] = useState<ContactBranch | null>(null);
  
  const [branchForm, setBranchForm] = useState({
    name: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    googleMapUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  const [settingsForm, setSettingsForm] = useState({
    heroTitle: "",
    heroDescription: "",
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Contact");
      setSettings(response.data.settings);
      setBranches(response.data.branches);
      if (response.data.settings) {
        setSettingsForm({
          heroTitle: response.data.settings.heroTitle || "",
          heroDescription: response.data.settings.heroDescription || "",
        });
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      alert("Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    try {
      if (!settings?.id) {
        await api.post("/Contact/Settings", settingsForm);
      } else {
        await api.put(`/Contact/Settings/${settings.id}`, settingsForm);
      }
      alert("Settings updated successfully!");
      fetchContactData();
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings");
    }
  };

  const updateBranch = async () => {
    if (!editingBranch) return;
    try {
      await api.put(`/Contact/Branches/${editingBranch.id}`, branchForm);
      alert("Branch updated successfully!");
      setEditingBranch(null);
      fetchContactData();
    } catch (error) {
      console.error("Error updating branch:", error);
      alert("Failed to update branch");
    }
  };

  const startEditBranch = (branch: ContactBranch) => {
    setEditingBranch(branch);
    setBranchForm({
      name: branch.name,
      country: branch.country,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      workingHours: branch.workingHours || "",
      googleMapUrl: branch.googleMapUrl || "",
      displayOrder: branch.displayOrder,
      isActive: branch.isActive,
    });
  };

  const cancelEdit = () => {
    setEditingBranch(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="border border-[#e2e8f0] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Contact Page Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Hero Title</label>
            <input
              type="text"
              value={settingsForm.heroTitle}
              onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
              className="w-full border border-[#e2e8f0] rounded-lg p-3"
              placeholder="e.g., Contact Us"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Hero Description</label>
            <textarea
              value={settingsForm.heroDescription}
              onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
              className="w-full border border-[#e2e8f0] rounded-lg p-3"
              rows={3}
              placeholder="e.g., Get in touch with our team"
            />
          </div>
          <button
            onClick={updateSettings}
            className="bg-[#a11d17] text-white px-6 py-2 rounded-lg hover:bg-[#8a1813]"
          >
            Save Settings
          </button>
        </div>
      </div>

      <div className="border border-[#e2e8f0] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Branches Management</h2>
        
        {editingBranch && (
          <div className="bg-[#F8FAFC] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Edit Branch: {editingBranch.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Branch Name *"
                value={branchForm.name}
                onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Country *"
                value={branchForm.country}
                onChange={(e) => setBranchForm({ ...branchForm, country: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Address *"
                value={branchForm.address}
                onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Phone *"
                value={branchForm.phone}
                onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="email"
                placeholder="Email *"
                value={branchForm.email}
                onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Working Hours"
                value={branchForm.workingHours}
                onChange={(e) => setBranchForm({ ...branchForm, workingHours: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Google Map URL"
                value={branchForm.googleMapUrl}
                onChange={(e) => setBranchForm({ ...branchForm, googleMapUrl: e.target.value })}
                className="border rounded-lg p-3"
              />
              <input
                type="number"
                placeholder="Display Order"
                value={branchForm.displayOrder}
                onChange={(e) => setBranchForm({ ...branchForm, displayOrder: Number(e.target.value) })}
                className="border rounded-lg p-3"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={branchForm.isActive}
                    onChange={(e) => setBranchForm({ ...branchForm, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={updateBranch}
                className="bg-[#a11d17] text-white px-6 py-2 rounded-lg hover:bg-[#8a1813]"
              >
                Update Branch
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {branches.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No branches found.</p>
          ) : (
            branches.map((branch) => (
              <div key={branch.id} className="border border-[#e2e8f0] rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{branch.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${branch.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {branch.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} /> {branch.address}, {branch.country}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} /> {branch.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} /> {branch.email}
                      </div>
                      {branch.workingHours && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} /> {branch.workingHours}
                        </div>
                      )}
                    </div>
                    {branch.googleMapUrl && (
                      <a href={branch.googleMapUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                        View on Map →
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => startEditBranch(branch)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// --- MESSAGES MANAGEMENT SECTION ---
function MessagesManagementSection() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Contact/Messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/Contact/Messages/${id}`);
      alert("Message deleted");
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  };

  const getFilteredMessages = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return messages.filter(msg => {
      const msgDate = new Date(msg.createdDate);
      if (filter === "today") return msgDate >= today;
      if (filter === "week") return msgDate >= weekAgo;
      if (filter === "month") return msgDate >= monthAgo;
      return true;
    });
  };

  const filteredMessages = getFilteredMessages();

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Messages</p>
              <p className="text-2xl font-bold text-blue-900">{messages.length}</p>
            </div>
            <MessageSquare className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">This Month</p>
              <p className="text-2xl font-bold text-purple-900">
                {messages.filter(m => new Date(m.createdDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">This Week</p>
              <p className="text-2xl font-bold text-green-900">
                {messages.filter(m => new Date(m.createdDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
            <Clock className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Today</p>
              <p className="text-2xl font-bold text-orange-900">
                {messages.filter(m => {
                  const today = new Date();
                  const msgDate = new Date(m.createdDate);
                  return msgDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <Send className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[#e2e8f0]">
        {["all", "today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 capitalize transition-colors ${
              filter === f
                ? "border-b-2 border-[#a11d17] text-[#a11d17]"
                : "text-[#64748b] hover:text-[#0F172A]"
            }`}
          >
            {f === "all" ? "All Messages" : f === "today" ? "Today" : f === "week" ? "This Week" : "This Month"}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No messages found
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage?.id === message.id
                    ? "border-[#a11d17] bg-red-50"
                    : "border-[#e2e8f0] bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#0F172A]">{message.fullName}</h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(message.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.message}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{new Date(message.createdDate).toLocaleTimeString()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(message.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border border-[#e2e8f0] rounded-lg p-6 bg-[#F8FAFC] min-h-[400px]">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#0F172A]">Message Details</h3>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">From:</label>
                    <p className="text-gray-700">{selectedMessage.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Date:</label>
                    <p className="text-gray-700">{new Date(selectedMessage.createdDate).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-[#0F172A]">Email:</label>
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline block">
                    {selectedMessage.email}
                  </a>
                </div>
                
                {selectedMessage.phone && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Phone:</label>
                    <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline block">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                
                {selectedMessage.company && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Company:</label>
                    <p className="text-gray-700">{selectedMessage.company}</p>
                  </div>
                )}
                
                {selectedMessage.branchName && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Branch:</label>
                    <p className="text-gray-700">{selectedMessage.branchName}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-semibold text-[#0F172A]">Message:</label>
                  <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mt-1 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex gap-3">
                <button
                  onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: Your message from ${selectedMessage.fullName}`}
                  className="bg-[#a11d17] text-white px-4 py-2 rounded-lg hover:bg-[#8a1813]"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMessage.email);
                    alert("Email copied to clipboard!");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Copy Email
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- CAREERS MANAGEMENT SECTION ---
function CareersManagementSection() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/uploadcv");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching career applications:", error);
      alert("");
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this application? This action cannot be undone.")) return;
    try {
      await api.delete(`/uploadcv/${id}`);
      alert("Application deleted successfully");
      fetchApplications();
      if (selectedApplication?.id === id) setSelectedApplication(null);
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  const downloadCV = (cvUrl: string, fullName: string) => {
    const downloadUrl = `${API_BASE_URL}${cvUrl}`;
    window.open(downloadUrl, '_blank');
  };

  const getFilteredApplications = () => {
    let filtered = applications;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    filtered = filtered.filter(app => {
      const appDate = new Date(app.createdDate);
      if (filter === "today") return appDate >= today;
      if (filter === "week") return appDate >= weekAgo;
      if (filter === "month") return appDate >= monthAgo;
      return true;
    });

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.fullName.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term) ||
        app.currentPosition?.toLowerCase().includes(term) ||
        app.country?.toLowerCase().includes(term)
      );
    }

    return filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  };

  const filteredApplications = getFilteredApplications();

  const stats = {
    total: applications.length,
    thisMonth: applications.filter(app => new Date(app.createdDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    thisWeek: applications.filter(app => new Date(app.createdDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    today: applications.filter(app => {
      const today = new Date();
      const appDate = new Date(app.createdDate);
      return appDate.toDateString() === today.toDateString();
    }).length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6">
          <p className="text-[#64748b]">Loading career applications...</p>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-[#e2e8f0] rounded-xl p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Applications</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">This Month</p>
              <p className="text-2xl font-bold text-purple-900">{stats.thisMonth}</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">This Week</p>
              <p className="text-2xl font-bold text-green-900">{stats.thisWeek}</p>
            </div>
            <Clock className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Today</p>
              <p className="text-2xl font-bold text-orange-900">{stats.today}</p>
            </div>
            <Send className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 border-b border-[#e2e8f0]">
          {["all", "today", "week", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 capitalize transition-colors ${
                filter === f
                  ? "border-b-2 border-[#a11d17] text-[#a11d17]"
                  : "text-[#64748b] hover:text-[#0F172A]"
              }`}
            >
              {f === "all" ? "All Applications" : f === "today" ? "Today" : f === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#e2e8f0] rounded-lg px-4 py-2 pl-10 w-80 focus:outline-none focus:border-[#a11d17]"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No applications found
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                onClick={() => setSelectedApplication(application)}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedApplication?.id === application.id
                    ? "border-[#a11d17] bg-red-50"
                    : "border-[#e2e8f0] bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#0F172A]">{application.fullName}</h3>
                    <p className="text-sm text-gray-500">{application.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(application.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {application.currentPosition && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {application.currentPosition}
                    </span>
                  )}
                  {application.country && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {application.country}
                    </span>
                  )}
                  {application.yearsOfExperience && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {application.yearsOfExperience} years exp.
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{new Date(application.createdDate).toLocaleTimeString()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteApplication(application.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border border-[#e2e8f0] rounded-lg p-6 bg-[#F8FAFC] min-h-[400px] max-h-[600px] overflow-y-auto">
          {selectedApplication ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#0F172A]">Application Details</h3>
                <button
                  onClick={() => deleteApplication(selectedApplication.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Full Name:</label>
                    <p className="text-gray-700">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Date:</label>
                    <p className="text-gray-700">{new Date(selectedApplication.createdDate).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-[#0F172A]">Email:</label>
                  <a href={`mailto:${selectedApplication.email}`} className="text-blue-600 hover:underline block">
                    {selectedApplication.email}
                  </a>
                </div>
                
                {selectedApplication.phoneNumber && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Phone:</label>
                    <a href={`tel:${selectedApplication.phoneNumber}`} className="text-blue-600 hover:underline block">
                      {selectedApplication.phoneNumber}
                    </a>
                  </div>
                )}
                
                {selectedApplication.country && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Country:</label>
                    <p className="text-gray-700">{selectedApplication.country}</p>
                  </div>
                )}
                
                {selectedApplication.currentPosition && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Current Position:</label>
                    <p className="text-gray-700">{selectedApplication.currentPosition}</p>
                  </div>
                )}
                
                {selectedApplication.yearsOfExperience && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Years of Experience:</label>
                    <p className="text-gray-700">{selectedApplication.yearsOfExperience}</p>
                  </div>
                )}
                
                {selectedApplication.coverLetter && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">Cover Letter:</label>
                    <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {selectedApplication.coverLetter}
                    </div>
                  </div>
                )}
                
                {selectedApplication.cvFile && (
                  <div>
                    <label className="text-sm font-semibold text-[#0F172A]">CV/Resume:</label>
                    <button
                      onClick={() => downloadCV(selectedApplication.cvFile, selectedApplication.fullName)}
                      className="mt-1 bg-[#a11d17] text-white px-4 py-2 rounded-lg hover:bg-[#8a1813] flex items-center gap-2"
                    >
                      <FileText size={16} />
                      Download CV
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex gap-3">
                <button
                  onClick={() => window.location.href = `mailto:${selectedApplication.email}?subject=Regarding your job application&body=Dear ${selectedApplication.fullName},%0D%0A%0D%0AThank you for your application...`}
                  className="bg-[#a11d17] text-white px-4 py-2 rounded-lg hover:bg-[#8a1813]"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedApplication.email);
                    alert("Email copied to clipboard!");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Copy Email
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Users size={48} className="mx-auto mb-3 opacity-50" />
              <p>Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DataField({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#0F172A] mb-2 block">{label}</label>
      {multiline ? (
        <div className="bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg p-3 text-[#64748b] text-sm whitespace-pre-wrap">
          {value}
        </div>
      ) : (
        <div className="bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#64748b] text-sm">
          {value}
        </div>
      )}
    </div>
  );
}

export default CMSPage;
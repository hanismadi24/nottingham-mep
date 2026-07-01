import { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2, AlertCircle } from "lucide-react";
import api, { API_BASE_URL } from "../../api";

// تعريف مطابق لـ GalleryImageDto من الـ Backend
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
  builtUpArea: string;
  year: string;
  image: string;
  imageMobileUrl?: string;
  description: string;
  scope: string;
  serviceType: string[];
  gallery: GalleryImage[];
  displayOrder?: number;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: (project?: Project) => void;
}

interface FormData {
  slug: string;
  name: string;
  location: string;
  city: string;
  country: string;
  sector: string;
  client: string;
  projectType: string;
  builtUpArea: string;
  year: string;
  description: string;
  scope: string;
  serviceTypes: string[];
  displayOrder: number;
}

// واجهة لصورة المعرض الجديدة (قبل الرفع)
interface NewGalleryItem {
  desktop: File;
  mobile: File | null;
}

function ProjectFormModal({ isOpen, onClose, project, onSuccess }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    slug: "",
    name: "",
    location: "",
    city: "",
    country: "",
    sector: "",
    client: "",
    projectType: "",
    builtUpArea: "",
    year: "",
    description: "",
    scope: "",
    serviceTypes: [],
    displayOrder: 0,
  });

  // الصور الرئيسية
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImageMobile, setMainImageMobile] = useState<File | null>(null);
  const [previewMainImage, setPreviewMainImage] = useState<string>("");
  const [previewMainMobileImage, setPreviewMainMobileImage] = useState<string>("");

  // صور المعرض - كل صورة لها DesktopUrl و MobileUrl
  const [existingGallery, setExistingGallery] = useState<GalleryImage[]>([]);
  const [newGalleryItems, setNewGalleryItems] = useState<NewGalleryItem[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<{ desktop: string; mobile: string | null }[]>([]);

  // الخدمات
  const [newServiceType, setNewServiceType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // توليد Slug من الاسم
const generateSlug = (name: string): string => {
  return name
    .toLowerCase() // تحويل إلى أحرف صغيرة
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '') // حذف الأحرف الخاصة
    .replace(/\s+/g, '_') // ✅ استبدال المسافات بـ _ بدلاً من -
    .replace(/_+/g, '_') // ✅ دمج الشرطات السفلية المتكررة
    .replace(/^_|_$/g, ''); // ✅ حذف الشرطات السفلية من البداية والنهاية
};

  // تحديث الاسم و الـ Slug تلقائياً
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: project ? prev.slug : generateSlug(name)
    }));
  };

  // تحميل بيانات المشروع عند التعديل
  useEffect(() => {
    if (project) {
      setFormData({
        slug: project.slug || project.id || "",
        name: project.name || "",
        location: project.location || "",
           city: project.city ?? "",  
        country: project.country || "",
        sector: project.sector || "",
        client: project.client || "",
    projectType: project.projectType ?? "",
        builtUpArea: project.builtUpArea || "",
         year: project.year ?? "",  
        description: project.description || "",
        scope: project.scope || "",
        serviceTypes: project.serviceType || [],
        displayOrder: project.displayOrder || 0,
      });

      // عرض الصورة الرئيسية
      if (project.image) {
        setPreviewMainImage(`${API_BASE_URL}${project.image}`);
      }
      
      // عرض صورة الموبايل الرئيسية
      if (project.imageMobileUrl) {
        setPreviewMainMobileImage(`${API_BASE_URL}${project.imageMobileUrl}`);
      }

      // عرض صور المعرض الموجودة (DesktopUrl + MobileUrl)
      if (project.gallery && project.gallery.length > 0) {
        setExistingGallery(project.gallery);
      }
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      location: "",
      city: "",
      country: "",
      sector: "",
      client: "",
      projectType: "",
      builtUpArea: "",
      year: "",
      description: "",
      scope: "",
      serviceTypes: [],
      displayOrder: 0,
    });
    setMainImage(null);
    setMainImageMobile(null);
    setNewGalleryItems([]);
    setNewGalleryPreviews([]);
    setExistingGallery([]);
    setPreviewMainImage("");
    setPreviewMainMobileImage("");
    setNewServiceType("");
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'slug' && !project) {
      setFormData(prev => ({ ...prev, [name]: generateSlug(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // إدارة الخدمات
  const addServiceType = () => {
    if (newServiceType.trim() && !formData.serviceTypes.includes(newServiceType.trim())) {
      setFormData(prev => ({
        ...prev,
        serviceTypes: [...prev.serviceTypes, newServiceType.trim()]
      }));
      setNewServiceType("");
    }
  };

  const removeServiceType = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.filter(s => s !== service)
    }));
  };

  // معالجة الصورة الرئيسية للديسكتوب
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setPreviewMainImage(URL.createObjectURL(file));
    }
  };

  // معالجة الصورة الرئيسية للموبايل
  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageMobile(file);
      setPreviewMainMobileImage(URL.createObjectURL(file));
    }
  };

  // معالجة إضافة صور المعرض الجديدة (ديسكتوب فقط في البداية)
  const handleGalleryDesktopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map(file => ({
        desktop: file,
        mobile: null,
      }));
      setNewGalleryItems(prev => [...prev, ...newItems]);
      
      const newPreviews = files.map(file => ({
        desktop: URL.createObjectURL(file),
        mobile: null,
      }));
      setNewGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
    e.target.value = '';
  };

  // معالجة إضافة صورة موبايل لصورة معرض جديدة
  const handleGalleryMobileChange = (index: number, file: File | null) => {
    if (file) {
      setNewGalleryItems(prev => {
        const updated = [...prev];
        updated[index].mobile = file;
        return updated;
      });
      setNewGalleryPreviews(prev => {
        const updated = [...prev];
        updated[index].mobile = URL.createObjectURL(file);
        return updated;
      });
    }
  };

  // حذف صورة معرض جديدة
  const removeNewGalleryItem = (index: number) => {
    setNewGalleryItems(prev => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // حذف صورة معرض موجودة
  const removeExistingGalleryItem = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
  };

  // تحديث صورة موبايل لصورة معرض موجودة (عن طريق رفع ملف جديد)
  const updateExistingGalleryMobile = async (index: number, file: File) => {
    // تخزين الملف لرفعه مع باقي البيانات عند الحفظ
    // سنقوم بتحديث المعاينة المحلية
    const reader = new FileReader();
    reader.onload = (e) => {
      setExistingGallery(prev => {
        const updated = [...prev];
        updated[index].mobileUrl = e.target?.result as string;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // التحقق من صحة النموذج
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.client.trim()) newErrors.client = "Client is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (formData.serviceTypes.length === 0) newErrors.serviceTypes = "At least one service type is required";
    if (!project && !mainImage) newErrors.mainImage = "Main image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // البيانات الأساسية
      formDataToSend.append('Slug', formData.slug || generateSlug(formData.name));
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Location', formData.location || '');
      formDataToSend.append('City', formData.city || '');
      formDataToSend.append('Country', formData.country || '');
      formDataToSend.append('Sector', formData.sector || '');
      formDataToSend.append('Client', formData.client || '');
     formDataToSend.append('ProjectType', formData.projectType || '');
      formDataToSend.append('BuiltUpArea', formData.builtUpArea || '');
       formDataToSend.append('Year', formData.year || '');
      formDataToSend.append('Description', formData.description || '');
      formDataToSend.append('Scope', formData.scope || '');
      formDataToSend.append('DisplayOrder', formData.displayOrder.toString());

      // إضافة الخدمات
      for (const service of formData.serviceTypes) {
        formDataToSend.append('ServiceTypes', service);
      }

      // إضافة الصورة الرئيسية للديسكتوب
      if (mainImage) {
        formDataToSend.append('MainImage', mainImage);
      }

      // إضافة صورة الموبايل الرئيسية
      if (mainImageMobile) {
        formDataToSend.append('MainImageMobile', mainImageMobile);
      }

      // ===== إضافة صور المعرض =====
      // 1. الصور الموجودة (DesktopUrl + MobileUrl)
      // نرسل الـ DesktopUrl للمحافظة على الصورة
      for (const item of existingGallery) {
        formDataToSend.append('KeepGalleryImages', item.desktopUrl);
        // إذا كان هناك MobileUrl، نحتفظ به أيضاً
        if (item.mobileUrl) {
          formDataToSend.append('KeepGalleryMobileImages', item.mobileUrl);
        }
      }

      // 2. الصور الجديدة
      for (const item of newGalleryItems) {
        // صورة الديسكتوب (مطلوبة)
        formDataToSend.append('Gallery', item.desktop);
        // صورة الموبايل (اختيارية)
        if (item.mobile) {
          formDataToSend.append('GalleryMobile', item.mobile);
        }
      }

      let response;
      if (project) {
        response = await api.put(`/Projects/${project.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await api.post('/Projects', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      console.log('✅ Project saved successfully:', response.data);
      onSuccess(response.data);
      resetForm();
      onClose();

    } catch (error: any) {
      console.error('❌ Error saving project:', error);
      
      if (error.response?.status === 400) {
        let errorMessage = 'Validation Error:\n';
        if (error.response.data?.message) {
          errorMessage += error.response.data.message;
        } else if (error.response.data?.errors) {
          const errs = error.response.data.errors;
          for (const key in errs) {
            errorMessage += `\n- ${key}: ${errs[key].join(', ')}`;
          }
        } else {
          errorMessage += JSON.stringify(error.response.data, null, 2);
        }
        alert(errorMessage);
      } else {
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e2e8f0] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#0F172A]">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ===== المعلومات الأساسية ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] ${
                  errors.name ? 'border-red-500' : 'border-[#e2e8f0]'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {!project && (
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-1">Slug (Auto)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  readOnly
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg bg-gray-50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] ${
                  errors.location ? 'border-red-500' : 'border-[#e2e8f0]'
                }`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] ${
                  errors.country ? 'border-red-500' : 'border-[#e2e8f0]'
                }`}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Sector *</label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] ${
                  errors.sector ? 'border-red-500' : 'border-[#e2e8f0]'
                }`}
              />
              {errors.sector && <p className="text-red-500 text-xs mt-1">{errors.sector}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Client *</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17] ${
                  errors.client ? 'border-red-500' : 'border-[#e2e8f0]'
                }`}
              />
              {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Project Type</label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Built-Up Area (m²)</label>
              <input
                type="text"
                name="builtUpArea"
                value={formData.builtUpArea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
            />
          </div>

          {/* Scope */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Scope</label>
            <textarea
              name="scope"
              value={formData.scope}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
            />
          </div>

          {/* ===== الخدمات ===== */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">
              Service Types * <span className="text-xs text-gray-500">(Press Enter after each)</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newServiceType}
                onChange={(e) => setNewServiceType(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addServiceType();
                  }
                }}
                placeholder="Add service type"
                className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a11d17]"
              />
              <button
                type="button"
                onClick={addServiceType}
                className="px-4 py-2 bg-[#a11d17] text-white rounded-lg hover:bg-[#8a1813]"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.serviceTypes.map((service, index) => (
                <span key={index} className="px-3 py-1 bg-[#a11d17]/10 text-[#a11d17] text-sm rounded-full flex items-center gap-2">
                  {service}
                  <button type="button" onClick={() => removeServiceType(service)} className="hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
            {errors.serviceTypes && <p className="text-red-500 text-xs mt-1">{errors.serviceTypes}</p>}
          </div>

          {/* ===== الصور الرئيسية ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* صورة الديسكتوب الرئيسية */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">
                Main Image (Desktop) {!project && '*'}
                <span className="text-xs text-gray-500 block">Recommended: 1920 x 1080 px</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer px-4 py-2 bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg hover:bg-gray-50">
                  <Upload size={20} className="inline mr-2" />
                  Upload
                  <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                </label>
                {previewMainImage && (
                  <div className="relative">
                    <img src={previewMainImage} alt="Main" className="w-20 h-20 object-cover rounded-lg border-2 border-blue-400" />
                    <button
                      type="button"
                      onClick={() => { setMainImage(null); setPreviewMainImage(""); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              {errors.mainImage && <p className="text-red-500 text-xs mt-1">{errors.mainImage}</p>}
            </div>

            {/* صورة الموبايل الرئيسية */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">
                Main Image (Mobile)
                <span className="text-xs text-gray-500 block">Recommended: 720 x 1280 px</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer px-4 py-2 bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg hover:bg-gray-50">
                  <Upload size={20} className="inline mr-2" />
                  Upload
                  <input type="file" accept="image/*" onChange={handleMobileImageChange} className="hidden" />
                </label>
                {previewMainMobileImage && (
                  <div className="relative">
                    <img src={previewMainMobileImage} alt="Mobile" className="w-20 h-20 object-cover rounded-lg border-2 border-purple-400" />
                    <button
                      type="button"
                      onClick={() => { setMainImageMobile(null); setPreviewMainMobileImage(""); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== معرض الصور (DesktopUrl + MobileUrl) ===== */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-3">
              Gallery Images
              <span className="text-xs text-gray-500 block">Each image has Desktop and Mobile versions (GalleryImageDto)</span>
            </label>

            {/* الصور الموجودة */}
            {existingGallery.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Current Gallery:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {existingGallery.map((item, index) => (
                    <div key={index} className="border border-[#e2e8f0] rounded-lg p-3 bg-gray-50">
                      <div className="flex gap-2">
                        {/* Desktop */}
                        <div className="relative flex-1">
                          <img 
                            src={`${API_BASE_URL}${item.desktopUrl}`} 
                            alt={`Gallery ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg border-2 border-blue-300" 
                          />
                          <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-1 rounded">Desktop</span>
                        </div>
                        {/* Mobile */}
                        <div className="relative flex-1">
                          {item.mobileUrl ? (
                            <img 
                              src={`${API_BASE_URL}${item.mobileUrl}`} 
                              alt={`Gallery Mobile ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-lg border-2 border-purple-300" 
                            />
                          ) : (
                            <div className="w-full h-24 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500 text-center p-1">
                              No mobile<br/>version
                            </div>
                          )}
                          <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-[10px] px-1 rounded">Mobile</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setExistingGallery(prev => {
                                    const updated = [...prev];
                                    updated[index].mobileUrl = ev.target?.result as string;
                                    return updated;
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }}
                          className="text-xs text-purple-600 hover:underline"
                        >
                          {item.mobileUrl ? 'Update Mobile' : 'Add Mobile'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* إضافة صور جديدة */}
            <div>
              <label className="cursor-pointer px-4 py-2 bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg hover:bg-gray-50 inline-flex items-center">
                <Upload size={20} className="mr-2" />
                Add Gallery Images (Desktop)
                <input type="file" accept="image/*" multiple onChange={handleGalleryDesktopChange} className="hidden" />
              </label>
              <span className="text-xs text-gray-500 ml-2">Select desktop images, then optionally add mobile versions</span>
            </div>

            {/* معاينة الصور الجديدة */}
            {newGalleryPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {newGalleryPreviews.map((preview, index) => (
                  <div key={index} className="border border-[#e2e8f0] rounded-lg p-3 bg-green-50 relative">
                    <div className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-2 rounded">New</div>
                    <div className="flex gap-2 mt-4">
                      {/* Desktop */}
                      <div className="relative flex-1">
                        <img src={preview.desktop} alt={`New ${index + 1}`} className="w-full h-24 object-cover rounded-lg border-2 border-blue-400" />
                        <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-1 rounded">Desktop</span>
                      </div>
                      {/* Mobile */}
                      <div className="relative flex-1">
                        {preview.mobile ? (
                          <img src={preview.mobile} alt={`New Mobile ${index + 1}`} className="w-full h-24 object-cover rounded-lg border-2 border-purple-400" />
                        ) : (
                          <div className="w-full h-24 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500 text-center p-1">
                            No mobile<br/>version
                          </div>
                        )}
                        <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-[10px] px-1 rounded">Mobile</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              handleGalleryMobileChange(index, file);
                            }
                          };
                          input.click();
                        }}
                        className="text-xs text-purple-600 hover:underline"
                      >
                        {preview.mobile ? 'Update Mobile' : 'Add Mobile'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeNewGalleryItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div className="flex gap-3 justify-end pt-4 border-t border-[#e2e8f0]">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-[#e2e8f0] rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#a11d17] text-white rounded-lg hover:bg-[#8a1813] disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;
import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ArrowRight, Upload, User, Mail, Phone, Globe, Layers, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api";

export function CareersPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    currentPosition: "",
    yearsOfExperience: "",
    coverLetter: "",
  });

  const [cv, setCv] = useState<File | null>(null);

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cv) {
      alert("Please upload your CV");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("FullName", form.fullName);
      formData.append("Email", form.email);
      formData.append("PhoneNumber", form.phoneNumber);
      formData.append("Country", form.country);
      formData.append("CurrentPosition", form.currentPosition);
      formData.append("YearsOfExperience", form.yearsOfExperience);
      formData.append("CoverLetter", form.coverLetter);
      formData.append("Cv", cv);

      await api.post("/uploadcv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Your application has been submitted successfully.");

      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        country: "",
        currentPosition: "",
        yearsOfExperience: "",
        coverLetter: "",
      });
      setCv(null);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
    }
  };



  const inputBase =
    "w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-[#1E293B] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E293B] focus:ring-4 focus:ring-[#1E293B]/6 transition-all duration-200";

  const fieldGroups = [
    { icon: User, placeholder: "Full Name *", key: "fullName", type: "text", required: true },
    { icon: Mail, placeholder: "Email Address *", key: "email", type: "email", required: true },
    { icon: Phone, placeholder: "Phone Number *", key: "phoneNumber", type: "text", required: true },
    { icon: Globe, placeholder: "Country", key: "country", type: "text", required: false },
    { icon: Layers, placeholder: "Current Position", key: "currentPosition", type: "text", required: false },
    { icon: Calendar, placeholder: "Years of Experience", key: "yearsOfExperience", type: "number", required: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO - SAME AS ORIGINAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-6 md:pt-8"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-[#a11d17] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#64748b]">Careers</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-5">
            Join Our
            <span className="text-[#a11d17]"> Team</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We are always interested in connecting with talented professionals. Submit your CV, and our team will review your profile for future opportunities that match your skills.
          </p>
        </motion.div>
      </div>

    

      {/* FORM - NEW DESIGN WITH SPLIT LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - gradient info panel */}
            <div
              className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center"
              style={{ background: "linear-gradient(160deg, #1E293B 0%, #0F172A 100%)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Briefcase size={18} className="text-white/80" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
                Submit Your Application
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Fill in your details and attach your CV. Our HR team reviews every submission carefully.
              </p>

              <div className="mt-10 space-y-4">
                {["Competitive salary packages",  "Career growth programs", "International projects"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="text-xs text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - form fields */}
            <form onSubmit={submitApplication} className="md:col-span-3 p-8 md:p-12">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {fieldGroups.map(({ icon: Icon, placeholder, key, type, required }) => (
                  <div key={key} className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                      <Icon size={15} />
                    </div>
                    <input
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className={`${inputBase} pl-10`}
                    />
                  </div>
                ))}
              </div>

              <textarea
                rows={4}
                placeholder="Cover Letter — tell us about yourself..."
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                className={`${inputBase} resize-none mb-4`}
              />

              {/* File upload area */}
              <label className="block border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center cursor-pointer hover:border-[#1E293B]/40 hover:bg-slate-50/50 transition-all duration-200 group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  onChange={(e) => setCv(e.target.files?.[0] || null)}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#1E293B]/8 flex items-center justify-center transition-colors">
                    <Upload size={16} className="text-slate-400 group-hover:text-[#1E293B] transition-colors" />
                  </div>
                  {cv ? (
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">{cv.name}</p>
                      <p className="text-xs text-slate-400">Click to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-slate-600">Upload your CV</p>
                      <p className="text-xs text-slate-400 mt-0.5">PDF, DOC, or DOCX · Max 10MB</p>
                    </div>
                  )}
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                style={{ background: "#7d1712" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Application <ArrowRight size={15} />
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                We typically respond within 5–7 business days.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, User, Building2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

interface ContactBranch {
  id: string;
  name: string;
  country: string;
  address: string;
    address2?: string;
  phone: string;
  email: string;
  workingHours: string;
  googleMapUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface ContactSettings {
  heroTitle: string;
  heroDescription: string;
}

interface ContactPageData {
  settings: ContactSettings;
  branches: ContactBranch[];
}

interface FormData {
  branchId: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    branchId: "",
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

const selectedBranch = contactInfo?.branches?.find(
  (b) => b.id === formData.branchId
);
const dubaiBranch = contactInfo?.branches?.find(
  (b) => b.country?.toLowerCase() === "uae"
);

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (!contactInfo) return;
    const dubai = contactInfo.branches.find((b) =>
      b.name.toLowerCase().includes("dubai")
    );
    if (dubai) {
      setFormData((prev) => ({ ...prev, branchId: dubai.id }));
    } else if (contactInfo.branches.length > 0) {
      setFormData((prev) => ({ ...prev, branchId: contactInfo.branches[0].id }));
    }
  }, [contactInfo]);

  const loadPage = async () => {
    try {
      const response = await api.get("/contact");
      const data = response.data;
      setContactInfo({
        settings: data.settings ?? data.Settings,
        branches: data.branches ?? data.Branches ?? [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSending(true);
      await api.post("/contact", formData);
      alert("Message sent successfully");
      setFormData((prev) => ({
        branchId: prev.branchId,
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

const infoCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: (
      <>
        <div>{dubaiBranch?.address ?? "—"}</div>

        {dubaiBranch?.address2 && (
          <div>
            {dubaiBranch.address2}
          </div>
        )}
      </>
    ),
  },
  {
    icon: Phone,
    title: "Call Us",
    content: dubaiBranch?.phone ?? "—",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: dubaiBranch?.email ?? "—",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: dubaiBranch?.workingHours ?? "—",
  },
];
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Hero (no background) ── */}
  {/* HERO - SAME STYLE AS CAREERS */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center pt-6 md:pt-8"
  >
    {/* Breadcrumb */}
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
      <Link to="/" className="hover:text-[#a11d17] transition-colors">
        Home
      </Link>
      <span>/</span>
      <span className="text-[#64748b]">Contact</span>
    </div>

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-5">
      Get In <span className="text-[#a11d17]">Touch</span>
    </h1>

    {/* Description */}
    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
      {contactInfo?.settings?.heroDescription ??
        "Our team is committed to providing timely, professional support. Contact us for any inquiries, and we will handle your request with care and efficiency."}
    </p>
  </motion.div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* ── Info Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {infoCards.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-xl flex items-center justify-center mx-auto mb-3">
                <item.icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-[#0F172A] text-sm mb-1">{item.title}</h3>
              <div className="text-[#64748b] text-sm leading-snug">
  {item.content}
</div>
            </motion.div>
          ))}
        </div>

        {/* ── Contact Form ── */}
       {/* FORM - SPLIT LAYOUT LIKE CAREERS */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
  >
    <div className="grid md:grid-cols-5">

      {/* LEFT PANEL */}
      <div
        className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center"
        style={{ background: "linear-gradient(160deg, #1E293B 0%, #0F172A 100%)" }}
      >
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
          <MessageSquare size={18} className="text-white/80" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Contact Our Team
        </h2>

        <p className="text-sm text-slate-400 leading-relaxed">
          Send us a message and our team will respond within 24 hours.
          We’re here to help you with your inquiries and projects.
        </p>

        <div className="mt-10 space-y-4">
          {["Fast response within 24h", "Professional support team", "Global branches support"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="text-xs text-slate-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM */}
      <form onSubmit={handleSubmit} className="md:col-span-3 p-8 md:p-12">

        {/* Branch */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Branch *
          </label>
          <select
            required
            value={formData.branchId}
            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B] focus:ring-4 focus:ring-[#1E293B]/6"
          >
            <option value="">Select branch</option>
            {contactInfo?.branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          />

          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          />
        </div>

        {/* Phone + Company */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          />

          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm"
          />
        </div>

        {/* Message */}
        <textarea
          rows={5}
          placeholder="Your Message *"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm resize-none mb-4"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-50"
          style={{ background: "#7d1712" }}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>

        <p className="text-center text-xs text-slate-400 mt-4">
          We typically respond within 24 hours
        </p>
      </form>

    </div>
  </motion.div>
</div>

      </div>
    </div>
  );
}

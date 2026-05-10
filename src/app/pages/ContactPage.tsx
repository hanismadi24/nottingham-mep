import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how we can bring your project to life
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: MapPin,
              title: "Visit Us",
              content: "Business Bay, Dubai, UAE",
            },
            {
              icon: Phone,
              title: "Call Us",
              content: "+971 4 XXX XXXX",
            },
            {
              icon: Mail,
              title: "Email Us",
              content: "info@nottingham-mep.com",
            },
            {
              icon: Clock,
              title: "Working Hours",
              content: "Sun - Thu: 8:00 AM - 6:00 PM",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{item.title}</h3>
              <p className="text-[#64748b]">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="h-full min-h-[600px] bg-[#F8FAFC] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={64} className="text-[#a11d17] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Our Location</h3>
                <p className="text-[#64748b] mb-4">
                  Nottingham MEP Consultancy
                  <br />
                  Business Bay, Dubai
                  <br />
                  United Arab Emirates
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

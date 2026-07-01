import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Target, Eye, Award, Users, Globe, TrendingUp,
} from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
                initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-6 md:pt-8"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
            <Link to="/" className="hover:text-[#a11d17] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#64748b]">About Us</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3">
            About <span className="text-[#a11d17]">Nottingham</span>
          </h1>

          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Premier multidisciplinary engineering consultants delivering
            innovative and high-performance MEP solutions across the UAE and the region.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* ABOUT SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
          

            <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-4 leading-tight">
              Engineering Excellence Through Innovation & Sustainability
            </h2>

            <p className="text-[#64748b] text-sm leading-7 mb-4">
              Established in{" "}
              <span className="font-semibold text-[#0F172A]">Dubai in 2010</span>, Nottingham
              Mechanical & Electrical Consulting Engineers is a leading multidisciplinary
              firm delivering innovative and sustainable engineering solutions across the
              Middle East.
            </p>

            <p className="text-[#64748b] text-sm leading-7 mb-4">
              With strategic{" "}
              <span className="font-semibold text-[#0F172A]">
                branches in Jordan, Egypt, and Saudi Arabia
              </span>
              , we have successfully served clients and completed design projects{" "}
              <span className="font-semibold text-[#0F172A]">
                throughout the UAE and the wider Middle East.
              </span>
            </p>

            <p className="text-[#64748b] text-sm leading-7">
              Our expertise spans Mechanical, Electrical, and Plumbing (MEP) consultancy
              services across hospitality, residential, commercial, and master planning
              developments. We are committed to creating efficient, sustainable, and
              high-performing environments that enhance user experiences and support
              long-term growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
              alt="About Nottingham"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#a11d17]/20 to-[#7d1712]/20" />
          </motion.div>
        </div>

        {/* LEADERSHIP MESSAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-14"
        >
          <div className="grid lg:grid-cols-2 items-center">
           {/* IMAGE SIDE */}
<div className="relative px-5 sm:px-8 md:px-10 py-8 md:py-10 flex justify-center">
  
  {/* TOP-LEFT DECORATION */}
  <div className="hidden md:block absolute top-6 left-6 w-16 h-16 border-t-[8px] border-l-[8px] border-[#981d16]" />

  <div className="relative z-10 w-full max-w-[360px] h-[300px] sm:h-[380px] md:h-[460px] overflow-hidden shadow-xl">
    <img
      src="/manager.jpeg"
      alt="Fadi Mustafa"
      className="w-full h-full object-cover object-top"
    />
  </div>

  {/* BOTTOM-RIGHT DECORATION */}
  <div className="hidden md:block absolute bottom-6 right-6 w-16 h-16 border-b-[8px] border-r-[8px] border-[#111]" />

</div>
            {/* CONTENT SIDE */}
            <div className="px-6 sm:px-8 md:px-12 py-8 md:py-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 md:w-12 h-[4px] bg-[#981d16]" />
                <span className="text-xs font-extrabold text-[#981d16] uppercase tracking-[2px]">
                  Executive Insight
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#111] leading-tight mb-6">
                Leadership Message
              </h2>

              <div className="space-y-4 text-[#444] leading-7 text-sm md:text-[15px]">
                <p>
                  At <strong className="font-extrabold text-[#111]"> NOTTINGHAM</strong>{" "}
                  Mechanical & Electrical Consulting Engineers, we believe that engineering
                  excellence is achieved through
                  <span className="font-semibold text-[#0F172A]"> innovation, integrity, and a clear vision</span>{" "}
                  for the future.
                </p>
                <p>
                  With over 20 years of experience in the industry, I am proud to lead
                  a dedicated team committed to delivering reliable and high-quality
                  MEP consultancy services.
                </p>
                <p>
                  Together with our talented staff, we continuously strive to deliver
                  efficient, sustainable, and forward-thinking engineering solutions
                  while maintaining the highest professional standards.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div>
                  <p className="text-[#888] italic mb-1 text-sm">Regards,</p>
                  <h3 className="text-xl md:text-2xl font-black text-[#111]">Fadi Mustafa</h3>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#111] mt-1">
                    Founder & General Manager
                  </p>
                </div>

                <div className="opacity-20 rotate-[-5deg] self-start">
                  <div className="border-[3px] border-[#111] px-4 py-2 text-[9px] font-black uppercase tracking-[2px]">
                    Nottingham<br />Quality Assured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-xl flex items-center justify-center mb-4">
              <Target size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-3">Our Mission</h3>
            <p className="text-[#64748b] leading-relaxed text-sm">
              With excellence, integrity, and reliability, we craft innovative and
              sustainable MEP design solutions, empowering our clients and cultivating
              lasting professional relationships.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#7d1712] to-[#a11d17] rounded-xl flex items-center justify-center mb-4">
              <Eye size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-3">Our Vision</h3>
            <p className="text-[#64748b] leading-relaxed text-sm">
              To be a regional leader in engineering innovation and digital design,
              delivering sustainable growth by nurturing the firm's human capital and
              technical expertise.
            </p>
          </motion.div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-gradient-to-r from-[#a11d17] to-[#7d1712] rounded-2xl p-8 mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Why Choose Nottingham
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Proven Expertise", description: "Over 600 successfully delivered projects across the GCC region" },
              { icon: Users, title: "Expert Team", description: "Highly qualified engineers with international certifications" },
              { icon: Globe, title: "Regional Presence", description: "Active in UAE, Qatar, Oman, Jordan and Georgia" },
              { icon: TrendingUp, title: "Innovation Focus", description: "Cutting-edge solutions using latest technology and BIM" },
              { icon: Target, title: "Client-Centric", description: "Dedicated Client Partnership with Tailored Engineering Solutions" },
              { icon: Award, title: "Quality Assurance", description: "Commitment to Quality Through Structured Engineering Practices" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
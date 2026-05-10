import { motion } from "motion/react";
import { Target, Eye, Award, Users, Globe, TrendingUp } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Nottingham</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Engineering excellence across the Middle East for over 15 years
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Leading MEP Consultancy in the GCC
            </h2>
            <p className="text-[#64748b] leading-relaxed mb-4">
              Nottingham MEP Consultancy has been at the forefront of mechanical, electrical, and
              plumbing engineering design across the Gulf region since 2009. Our team of highly
              skilled engineers delivers innovative, sustainable, and cost-effective solutions for
              projects of all scales.
            </p>
            <p className="text-[#64748b] leading-relaxed mb-4">
              With a portfolio spanning hospitality, commercial, residential, healthcare, and
              infrastructure sectors, we have established ourselves as a trusted partner for
              developers, architects, and contractors throughout the UAE and GCC countries.
            </p>
            <p className="text-[#64748b] leading-relaxed">
              Our commitment to excellence, technical expertise, and client satisfaction has earned
              us recognition as one of the region's premier MEP engineering consultancies.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
              alt="About Nottingham"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#a11d17]/20 to-[#7d1712]/20" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-2xl flex items-center justify-center mb-6">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Our Mission</h3>
            <p className="text-[#64748b] leading-relaxed">
              To deliver world-class MEP engineering solutions that exceed client expectations,
              promote sustainability, and contribute to the development of landmark projects across
              the region through innovation, technical excellence, and unwavering commitment to
              quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#7d1712] to-[#a11d17] rounded-2xl flex items-center justify-center mb-6">
              <Eye size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Our Vision</h3>
            <p className="text-[#64748b] leading-relaxed">
              To be recognized as the leading MEP engineering consultancy in the Middle East,
              setting industry benchmarks for innovation, sustainability, and client satisfaction
              while fostering a culture of continuous improvement and professional excellence.
            </p>
          </motion.div>
        </div>

        <div className="bg-gradient-to-r from-[#a11d17] to-[#7d1712] rounded-3xl p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose Nottingham
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Proven Expertise",
                description: "Over 300 successfully delivered projects across the GCC region",
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Highly qualified engineers with international certifications",
              },
              {
                icon: Globe,
                title: "Regional Presence",
                description: "Active in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman",
              },
              {
                icon: TrendingUp,
                title: "Innovation Focus",
                description: "Cutting-edge solutions using latest technology and BIM",
              },
              {
                icon: Target,
                title: "Client-Centric",
                description: "95% client satisfaction rate with personalized service",
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "ISO certified processes ensuring consistent excellence",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {[
              {
                year: "2009",
                title: "Foundation",
                description: "Nottingham MEP Consultancy established in Dubai, UAE",
              },
              {
                year: "2012",
                title: "Regional Expansion",
                description: "Expanded operations to Saudi Arabia and Qatar",
              },
              {
                year: "2015",
                title: "100+ Projects",
                description: "Reached milestone of 100 completed projects",
              },
              {
                year: "2018",
                title: "BIM Excellence",
                description: "Became certified BIM Level 2 consultancy",
              },
              {
                year: "2021",
                title: "Sustainability Leader",
                description: "Achieved 50+ LEED certified projects",
              },
              {
                year: "2024",
                title: "Industry Recognition",
                description: "Awarded MEP Consultancy of the Year - GCC",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{milestone.title}</h3>
                  <p className="text-[#64748b]">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router";
import { Wind, Zap, Droplets, Snowflake, Box, Leaf, ArrowRight } from "lucide-react";

export function ServicesPage() {
  const services = [
    {
      title: "Mechanical Engineering",
      icon: Wind,
      description:
        "Advanced HVAC design, ventilation systems, and climate control solutions for optimal comfort and energy efficiency.",
      features: [
        "HVAC system design and optimization",
        "Ventilation and air quality management",
        "Chilled water and hot water systems",
        "Energy-efficient climate control",
        "Indoor air quality analysis",
      ],
      color: "from-[#a11d17] to-[#7d1712]",
    },
    {
      title: "Electrical Engineering",
      icon: Zap,
      description:
        "Comprehensive electrical design including power distribution, lighting, and intelligent building automation systems.",
      features: [
        "Power distribution and load calculations",
        "Lighting design and control systems",
        "Emergency and backup power systems",
        "Low voltage and communication systems",
        "Smart building automation",
      ],
      color: "from-[#7d1712] to-[#a11d17]",
    },
    {
      title: "Plumbing Design",
      icon: Droplets,
      description:
        "Efficient water supply, drainage, and sanitary systems designed for sustainability and optimal performance.",
      features: [
        "Potable water distribution systems",
        "Drainage and sewage systems",
        "Rainwater harvesting",
        "Greywater recycling",
        "Fire protection systems",
      ],
      color: "from-[#a11d17] to-[#7d1712]",
    },
    {
      title: "District Cooling",
      icon: Snowflake,
      description:
        "Centralized cooling solutions for large-scale developments, providing energy-efficient temperature control.",
      features: [
        "Central cooling plant design",
        "Distribution network optimization",
        "Energy transfer station design",
        "System performance monitoring",
        "Cost-benefit analysis",
      ],
      color: "from-[#7d1712] to-[#a11d17]",
    },
    {
      title: "BIM Coordination",
      icon: Box,
      description:
        "Advanced 3D modeling and coordination services to detect clashes and optimize design before construction.",
      features: [
        "3D MEP modeling and coordination",
        "Clash detection and resolution",
        "Construction documentation",
        "As-built drawing preparation",
        "4D and 5D BIM implementation",
      ],
      color: "from-[#a11d17] to-[#7d1712]",
    },
    {
      title: "Sustainability Consulting",
      icon: Leaf,
      description:
        "Green building strategies and LEED consulting to achieve environmental certifications and reduce carbon footprint.",
      features: [
        "LEED and green building certification",
        "Energy modeling and simulation",
        "Renewable energy integration",
        "Carbon footprint reduction",
        "Sustainable material selection",
      ],
      color: "from-[#7d1712] to-[#a11d17]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive MEP engineering solutions tailored to your project needs, delivered
              with precision and innovation
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#a11d17] to-[#7d1712] rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to bring your vision to life with innovative MEP solutions
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#a11d17] rounded-lg hover:shadow-2xl transition-all group"
          >
            Get in Touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid lg:grid-cols-12 gap-12 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* قسم المحتوى النصي - يأخذ 7 أعمدة */}
      <div className={`${isEven ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6"}`}>
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100"
        >
          <div
            className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl mb-6 shadow-lg`}
          >
            <Icon size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">{service.title}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed mb-6">{service.description}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 bg-[#a11d17] rounded-full flex-shrink-0" />
                <span className="text-[#64748b] text-xs font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* قسم الصورة - يأخذ 5 أعمدة لجعلها أصغر وأكثر تناسقاً */}
      <div className={`${isEven ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-1 lg:row-start-1"}`}>
        <div className="relative group">
          {/* خلفية جمالية تعطي شكل هندسي خلف الصورة */}
          <div className={`absolute -inset-2 bg-gradient-to-br ${service.color} opacity-10 rounded-[2rem] blur-xl group-hover:opacity-20 transition-opacity`} />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-[300px] md:h-[350px] rounded-[2rem] overflow-hidden shadow-lg border-4 border-white"
          >
            <img
              src={`https://images.unsplash.com/photo-${
                index === 0
                  ? "1581092918056-0c4c3acd4789"
                  : index === 1
                  ? "1473341304170-971dccb5ac1e"
                  : index === 2
                  ? "1625246333195-78d9c38ad449"
                  : index === 3
                  ? "1581092160607-ee22f86aeee6"
                  : index === 4
                  ? "1503387762-592deb58ef4e"
                  : "1497366216902-e10e4aeda137"
              }?w=800&q=80`}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay خفيف لربط الصورة بهوية البراند */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent opacity-60`} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

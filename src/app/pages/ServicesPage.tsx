import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Wind, Zap, Droplets, Snowflake, Box, Leaf, Shield, ArrowRight,
} from "lucide-react";
import api, { API_BASE_URL } from "../../api";

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get("/Services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case "Wind": return Wind;
      case "Zap": return Zap;
      case "Droplets": return Droplets;
      case "Snowflake": return Snowflake;
      case "Box": return Box;
      case "Leaf": return Leaf;
      case "Shield": return Shield;
      default: return Wind;
    }
  };

  const getServiceColor = (index: number) =>
    index % 2 === 0
      ? "from-[#a11d17] to-[#7d1712]"
      : "from-[#7d1712] to-[#a11d17]";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-[#a11d17] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#64748b]">Services</span>
          </div>
      
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-5">
            Our
            <span className="text-[#a11d17]"> Services</span>
          </h1>
      
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Comprehensive MEP engineering solutions tailored to deliver
            efficiency, reliability, and innovation for every project.
          </p>
        </motion.div>
      </div>

      {/* SERVICES */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              Icon={getServiceIcon(service.icon)}
              color={getServiceColor(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-gradient-to-r from-[#a11d17] to-[#7d1712] rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-base text-white/90 mb-6 max-w-xl mx-auto">
            Our team is ready to deliver innovative MEP solutions
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#a11d17] rounded-lg hover:shadow-2xl transition-all group text-sm font-medium"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  Icon,
  color,
}: {
  service: any;
  index: number;
  Icon: any;
  color: string;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid lg:grid-cols-2 gap-6 items-stretch ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* TEXT */}
      <div className={isEven ? "" : "lg:col-start-2"}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
        >
          <div
            className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${color} rounded-xl mb-4`}
          >
            <Icon size={24} className="text-white" />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] mb-3">
            {service.title}
          </h2>

          <p className="text-[#64748b] text-sm leading-relaxed mb-4">
            {service.description}
          </p>

          <ul className="space-y-2">
            {service.features?.map((feature: string, idx: number) => (
              <li key={idx} className="flex gap-2 items-start">
                <div className="w-5 h-5 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="text-[#64748b] text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* IMAGE */}
      <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative h-[260px] lg:h-full min-h-[260px] rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={`${API_BASE_URL}${service.image}`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0`} />
        </motion.div>
      </div>
    </motion.div>
  );
}
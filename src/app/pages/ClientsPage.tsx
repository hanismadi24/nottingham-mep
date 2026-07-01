import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function ClientsPage() {
  const clients = Array.from({ length: 37 }, (_, i) => ({
    id: i + 1,
    logo: `/clients/image (${i + 1}).png`,
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Hero ── */}
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
            <span className="text-[#64748b]">Clients</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-5">
            Trusted by
            <span className="text-[#a11d17]"> Industry Leaders</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We are proud to have partnered with some of the most respected
            organizations across the region.
          </p>
        </motion.div>
      </div>

      {/* ── Clients Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              className="bg-white rounded-2xl p-5 h-28 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={client.logo}
                alt={`Client ${client.id}`}
                className="max-h-14 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

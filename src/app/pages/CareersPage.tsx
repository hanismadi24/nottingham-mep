import { motion } from "motion/react";
import { Briefcase, MapPin, Clock } from "lucide-react";

export function CareersPage() {
  const openings = [
    {
      title: "Senior Mechanical Engineer",
      department: "Mechanical",
      location: "Dubai, UAE",
      type: "Full-time",
      description:
        "Lead MEP design for major hospitality and commercial projects across the GCC region.",
    },
    {
      title: "Electrical Design Engineer",
      department: "Electrical",
      location: "Dubai, UAE",
      type: "Full-time",
      description:
        "Design electrical systems for high-rise and mixed-use developments with focus on energy efficiency.",
    },
    {
      title: "BIM Coordinator",
      department: "BIM",
      location: "Dubai, UAE",
      type: "Full-time",
      description:
        "Coordinate 3D MEP modeling and clash detection for large-scale infrastructure projects.",
    },
    {
      title: "Sustainability Consultant",
      department: "Sustainability",
      location: "Dubai, UAE",
      type: "Full-time",
      description:
        "Provide LEED and green building consulting services for sustainable development projects.",
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build your career with the region's leading MEP consultancy
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6 text-center">
            Why Work With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Career Growth",
                description: "Professional development and training opportunities",
              },
              {
                title: "Exciting Projects",
                description: "Work on landmark developments across the GCC",
              },
              {
                title: "Competitive Benefits",
                description: "Industry-leading compensation and benefits package",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">
                  {index === 0 ? "📈" : index === 1 ? "🏗️" : "💼"}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{benefit.title}</h3>
                <p className="text-[#64748b]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Current Openings</h2>
        <div className="space-y-6">
          {openings.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{job.title}</h3>
                  <p className="text-[#64748b] mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#64748b]">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {job.type}
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

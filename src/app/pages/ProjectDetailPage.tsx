import { useParams, Link } from "react-router";
import { ArrowLeft, MapPin, Building2, User, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../data/projects";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Project Not Found</h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#a11d17] hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.sector === project.sector && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative h-[60vh] min-h-[500px] bg-[#0F172A] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-4 py-1.5 bg-[#a11d17] text-white rounded-full text-sm">
                  {project.sector}
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  {project.country}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-white/80 text-lg">
                <MapPin size={20} />
                {project.location}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Project Overview</h2>
              <p className="text-[#64748b] leading-relaxed">{project.description}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Scope of Work</h2>
              <p className="text-[#64748b] leading-relaxed">{project.scope}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Technical Challenges</h2>
              <ul className="space-y-3">
                {project.technicalChallenges.map((challenge, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-[#64748b]">{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Services Provided</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.serviceType.map((service) => (
                  <div
                    key={service}
                    className="px-4 py-3 bg-gradient-to-r from-[#a11d17]/10 to-[#7d1712]/10 rounded-lg border border-[#a11d17]/20 text-[#0F172A]"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Project Details</h3>
              <div className="space-y-4">
                <DetailItem icon={User} label="Client" value={project.client} />
                <DetailItem icon={MapPin} label="Location" value={project.location} />
                <DetailItem icon={Building2} label="Built-up Area" value={project.builtUpArea} />
                <DetailItem icon={Calendar} label="Year" value={project.year} />
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
                <Link
                  to="/contact"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Request Consultation
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/projects/${relatedProject.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#a11d17] transition-colors">
                        {relatedProject.name}
                      </h3>
                      <p className="text-sm text-[#64748b]">{relatedProject.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-sm text-[#64748b]">{label}</div>
        <div className="font-semibold text-[#0F172A]">{value}</div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, ArrowRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../data/projects";

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const countries = ["All", ...Array.from(new Set(projects.map((p) => p.country)))];
  const serviceTypes = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.serviceType))),
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = selectedCountry === "All" || project.country === selectedCountry;
      const matchesServiceType =
        selectedServiceType === "All" || project.serviceType.includes(selectedServiceType);

      return matchesSearch && matchesCountry && matchesServiceType;
    });
  }, [searchQuery, selectedCountry, selectedServiceType]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Projects</h1>
            <p className="text-xl text-gray-300">
              Explore our portfolio of landmark MEP engineering projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={20} />
              <input
                type="text"
                placeholder="Search by project name, location, or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:ring-2 focus:ring-[#a11d17] outline-none text-[#0F172A]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
            >
              <option value="All">All Services</option>
              {serviceTypes.slice(1).map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] focus:border-transparent outline-none"
            >
              <option value="All">All Locations</option>
              {countries.slice(1).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedServiceType("All");
                setSelectedCountry("All");
              }}
              className="px-6 py-3 bg-white border border-[#e2e8f0] text-[#a11d17] rounded-lg hover:bg-[#F8FAFC] transition-all whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#64748b]">
              Showing <span className="font-semibold text-[#0F172A]">{filteredProjects.length}</span> projects
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6"></div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">No projects found</h3>
              <p className="text-[#64748b] mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("All");
                  setSelectedServiceType("All");
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projects/${project.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/50 to-transparent" />
            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#a11d17] text-white text-xs rounded-full">
                {project.sector}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                {project.year}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <MapPin size={16} />
                {project.location}
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#a11d17] transition-colors">
              {project.name}
            </h3>
            <p className="text-[#64748b] text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.serviceType.slice(0, 3).map((service: string) => (
                <span
                  key={service}
                  className="px-2 py-1 bg-[#F8FAFC] text-[#64748b] text-xs rounded"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
              View Case Study
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

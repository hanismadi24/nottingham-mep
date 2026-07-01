import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import { Search, ArrowRight, MapPin } from "lucide-react";
import { motion } from "motion/react";

import api, {
  API_BASE_URL,
} from "../../api";

export function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get("/Projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.country))),
  ];

  const serviceTypes = [
    "All",
    ...Array.from(
      new Set(projects.flatMap((p) => p.serviceType || []))
    ),
  ];

  const sectors = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.sector))),
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === "All" || project.country === selectedCountry;

      const matchesServiceType =
        selectedServiceType === "All" ||
        project.serviceType?.includes(selectedServiceType);

      const matchesSector =
        selectedSector === "All" || project.sector === selectedSector;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesServiceType &&
        matchesSector
      );
    });
  }, [
    projects,
    searchQuery,
    selectedCountry,
    selectedServiceType,
    selectedSector,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-[#a11d17]/20 border-t-[#a11d17] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER SECTION */}
      <div className="pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5">
              <Link to="/" className="hover:text-[#a11d17] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#64748b]">Projects</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
              Our <span className="text-[#a11d17]"> Projects</span>
            </h1>
            <p className="text-sm md:text-base text-[#64748b]">
              Explore our portfolio of landmark MEP engineering projects
            </p>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FILTERS CONTAINER */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* SEARCH BY NAME */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-9 pr-4 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] text-sm outline-none text-[#0F172A] shadow-sm"
              />
            </div>

            {/* SECTOR FILTER */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] text-sm outline-none text-[#0F172A] cursor-pointer shadow-sm"
            >
              <option value="All">All Sectors</option>
              {sectors.slice(1).map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            {/* SERVICE FILTER */}
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] text-sm outline-none text-[#0F172A] cursor-pointer shadow-sm"
            >
              <option value="All">All Services</option>
              {serviceTypes.slice(1).map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            {/* COUNTRY FILTER */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#a11d17] text-sm outline-none text-[#0F172A] cursor-pointer shadow-sm"
            >
              <option value="All">All Locations</option>
              {countries.slice(1).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* CLEAR FILTERS BUTTON */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedServiceType("All");
                setSelectedCountry("All");
                setSelectedSector("All");
              }}
              className="w-full h-12 px-6 bg-white border border-[#e2e8f0] text-[#a11d17] font-medium text-sm rounded-lg hover:bg-[#FFF5F5] hover:border-[#a11d17] transition-all duration-200 shadow-sm"
            >
              Clear Filters
            </button>
          </div>

          {/* RESULTS COUNTER */}
          <div className="text-[#64748b] text-sm pl-1">
            Showing{" "}
            <span className="font-semibold text-[#0F172A]">
              {filteredProjects.length}
            </span>{" "}
            projects
          </div>
        </div>

        {/* PROJECTS GRID / NO RESULTS */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E8F0] shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">
              No projects found
            </h3>
            <p className="text-sm text-[#64748b]">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
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
          
          {/* IMAGE WRAPPER */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
  src={`${API_BASE_URL}${project.image}`}
  alt={project.name}
  loading="lazy"
  className="w-full h-full object-cover brightness-105 contrast-105"
  animate={{ scale: isHovered ? 1.1 : 1 }}
  transition={{ duration: 0.6 }}
/>
        <div className="absolute inset-0 bg-transparent" />

            {/* SECTOR, COUNTRY, AND LOCATION AT THE BOTTOM */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
              {/* Badges container */}
              <div className="flex flex-wrap gap-2 text-white text-xs font-medium">
                <span className="px-3 py-1 bg-[#a11d17] rounded-full drop-shadow-md">
                  {project.sector}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full drop-shadow-md">
                  {project.location}
                </span>
              </div>

              
            </div>
          </div>

          {/* CARD TEXT DETAILS */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#a11d17] transition-colors">
              {project.name}
            </h3>

            <p className="text-[#64748b] text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.serviceType?.slice(0, 3).map((service: string) => (
                <span
                  key={service}
                  className="px-2 py-1 bg-[#F8FAFC] text-[#64748b] text-xs rounded"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
              View Details
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
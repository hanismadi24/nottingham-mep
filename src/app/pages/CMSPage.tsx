import { motion } from "motion/react";
import { useState } from "react";
import { cmsData } from "../data/cms";
import { projects } from "../data/projects";
import { Settings, FileText, Briefcase, Info, Phone, Users } from "lucide-react";

export function CMSPage() {
  const [activeTab, setActiveTab] = useState<"site" | "hero" | "services" | "projects" | "about" | "contact">("site");

  const tabs = [
    { id: "site", label: "Site Info", icon: Settings },
    { id: "hero", label: "Hero Banner", icon: FileText },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Content Management</h1>
            <p className="text-gray-300">
              View and manage all website content
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[#e2e8f0]">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-[#a11d17] text-[#a11d17]"
                        : "border-transparent text-[#64748b] hover:text-[#0F172A]"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            {activeTab === "site" && <SiteInfoSection />}
            {activeTab === "hero" && <HeroSection />}
            {activeTab === "services" && <ServicesSection />}
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "about" && <AboutSection />}
            {activeTab === "contact" && <ContactSection />}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📝 How to Edit Content</h3>
          <p className="text-blue-800 mb-4">
            To edit this content, modify the data files in your code editor:
          </p>
          <ul className="space-y-2 text-blue-800">
            <li><code className="bg-blue-100 px-2 py-1 rounded">/src/app/data/cms.ts</code> - Site info, hero, services, about, contact</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">/src/app/data/projects.ts</code> - All project listings</li>
          </ul>
          <p className="text-blue-800 mt-4">
            See <code className="bg-blue-100 px-2 py-1 rounded">CMS_INSTRUCTIONS.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  );
}

function SiteInfoSection() {
  const { site } = cmsData;
  return (
    <div className="space-y-6">
      <DataField label="Site Name" value={site.name} />
      <DataField label="Tagline" value={site.tagline} />
      <DataField label="Phone" value={site.phone} />
      <DataField label="Email" value={site.email} />
      <DataField label="Address" value={site.address} />
      <DataField label="Working Hours" value={site.workingHours} />

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Social Media</h3>
        <div className="space-y-3 ml-4">
          <DataField label="LinkedIn" value={site.socialMedia.linkedin} />
          <DataField label="Twitter" value={site.socialMedia.twitter} />
          <DataField label="Facebook" value={site.socialMedia.facebook} />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const { hero } = cmsData;
  return (
    <div className="space-y-6">
      <DataField label="Title" value={hero.title} />
      <DataField label="Subtitle" value={hero.subtitle} />

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Hero Images ({hero.images.length})</h3>
        <div className="grid grid-cols-2 gap-4">
          {hero.images.map((img, idx) => (
            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-[#e2e8f0]">
              <img src={img} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Image {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Buttons</h3>
        <div className="space-y-3 ml-4">
          <DataField label="Primary Button Text" value={hero.primaryButton.text} />
          <DataField label="Primary Button Link" value={hero.primaryButton.link} />
          <DataField label="Secondary Button Text" value={hero.secondaryButton.text} />
          <DataField label="Secondary Button Link" value={hero.secondaryButton.link} />
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const { services } = cmsData;
  return (
    <div className="space-y-8">
      {services.map((service, idx) => (
        <div key={service.id} className="border border-[#e2e8f0] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Service {idx + 1}: {service.title}</h3>
          <div className="space-y-4">
            <DataField label="ID" value={service.id} />
            <DataField label="Icon" value={service.icon} />
            <DataField label="Description" value={service.description} />
            <div>
              <h4 className="text-sm font-semibold text-[#0F172A] mb-2">Features</h4>
              <ul className="list-disc list-inside text-[#64748b] space-y-1 ml-4">
                {service.features.map((feature, fidx) => (
                  <li key={fidx}>{feature}</li>
                ))}
              </ul>
            </div>
            <DataField label="Image URL" value={service.image} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6">
        <p className="text-[#64748b]">
          Total Projects: <span className="font-bold text-[#0F172A]">{projects.length}</span>
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project, idx) => (
          <div key={project.id} className="border border-[#e2e8f0] rounded-xl p-6">
            <div className="flex gap-4 mb-4">
              <img src={project.image} alt={project.name} className="w-32 h-32 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{project.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-[#64748b]">Location: <span className="text-[#0F172A]">{project.location}</span></span>
                  <span className="text-[#64748b]">Sector: <span className="text-[#0F172A]">{project.sector}</span></span>
                  <span className="text-[#64748b]">Client: <span className="text-[#0F172A]">{project.client}</span></span>
                  <span className="text-[#64748b]">Year: <span className="text-[#0F172A]">{project.year}</span></span>
                </div>
              </div>
            </div>
            <p className="text-[#64748b] text-sm mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.serviceType.map((service) => (
                <span key={service} className="px-3 py-1 bg-[#a11d17]/10 text-[#a11d17] text-xs rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  const { about } = cmsData;
  return (
    <div className="space-y-6">
      <DataField label="Mission" value={about.mission} multiline />
      <DataField label="Vision" value={about.vision} multiline />

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Description Paragraphs</h3>
        {about.description.map((para, idx) => (
          <div key={idx} className="mb-3 ml-4">
            <DataField label={`Paragraph ${idx + 1}`} value={para} multiline />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Timeline</h3>
        <div className="space-y-4 ml-4">
          {about.timeline.map((item, idx) => (
            <div key={idx} className="border-l-2 border-[#a11d17] pl-4">
              <div className="font-bold text-[#a11d17]">{item.year}</div>
              <div className="font-semibold text-[#0F172A]">{item.title}</div>
              <div className="text-[#64748b] text-sm">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Why Choose Us</h3>
        <div className="grid md:grid-cols-2 gap-4 ml-4">
          {about.whyChooseUs.map((item, idx) => (
            <div key={idx} className="border border-[#e2e8f0] rounded-lg p-4">
              <div className="font-semibold text-[#0F172A] mb-1">{item.title}</div>
              <div className="text-[#64748b] text-sm">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const { contact, careers } = cmsData;
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Contact Locations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {contact.locations.map((loc, idx) => (
            <div key={idx} className="border border-[#e2e8f0] rounded-lg p-4">
              <div className="font-semibold text-[#0F172A] mb-1">{loc.title}</div>
              <div className="text-[#64748b] text-sm">{loc.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Form Fields</h3>
        <div className="space-y-2 ml-4">
          {contact.formFields.map((field, idx) => (
            <div key={idx} className="flex items-center gap-4 text-sm">
              <span className="text-[#64748b]">{field.label}</span>
              <span className="px-2 py-1 bg-[#F8FAFC] text-[#0F172A] rounded text-xs">{field.type}</span>
              {field.required && <span className="text-[#a11d17] text-xs">Required</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Job Openings ({careers.openings.length})</h3>
        <div className="space-y-4">
          {careers.openings.map((job, idx) => (
            <div key={job.id} className="border border-[#e2e8f0] rounded-lg p-4">
              <div className="font-bold text-[#0F172A] mb-2">{job.title}</div>
              <div className="text-sm text-[#64748b] space-x-4">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
              <p className="text-sm text-[#64748b] mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataField({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#0F172A] mb-2 block">{label}</label>
      {multiline ? (
        <div className="bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg p-3 text-[#64748b] text-sm whitespace-pre-wrap">
          {value}
        </div>
      ) : (
        <div className="bg-[#F8FAFC] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#64748b] text-sm">
          {value}
        </div>
      )}
    </div>
  );
}

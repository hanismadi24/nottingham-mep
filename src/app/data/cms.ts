export interface CMSConfig {
  site: SiteConfig;
  hero: HeroConfig;
  metrics: MetricConfig[];
  services: ServiceConfig[];
  clients: string[];
  about: AboutConfig;
  contact: ContactConfig;
  careers: CareerConfig;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
}

export interface HeroConfig {
  images: string[];
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
}

export interface MetricConfig {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface ServiceConfig {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

export interface AboutConfig {
  mission: string;
  vision: string;
  description: string[];
  timeline: TimelineItem[];
  whyChooseUs: WhyChooseItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactConfig {
  locations: LocationInfo[];
  formFields: FormField[];
}

export interface LocationInfo {
  icon: string;
  title: string;
  content: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
}

export interface CareerConfig {
  benefits: BenefitItem[];
  openings: JobOpening[];
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const cmsData: CMSConfig = {
  site: {
    name: "Nottingham",
    tagline: "MEP Consultancy",
    logo: "N",
    phone: "+971 4 XXX XXXX",
    email: "info@nottingham-mep.com",
    address: "Business Bay, Dubai, UAE",
    workingHours: "Sun - Thu: 8:00 AM - 6:00 PM",
    socialMedia: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
    },
  },

  hero: {
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80",
    ],
    title: "Engineering Landmark Projects",
    subtitle: "Innovative MEP Design | Sustainable Solutions",
    primaryButton: {
      text: "Explore Projects",
      link: "/projects",
    },
    secondaryButton: {
      text: "Contact Us",
      link: "/contact",
    },
  },

  metrics: [
    { value: 300, suffix: "+", label: "Projects Completed", icon: "Building2" },
    { value: 15, suffix: "+", label: "Years Experience", icon: "Award" },
    { value: 7, suffix: "+", label: "GCC Countries", icon: "Globe" },
    { value: 95, suffix: "%", label: "Client Satisfaction", icon: "TrendingUp" },
  ],

  services: [
    {
      id: "mechanical",
      title: "Mechanical Engineering",
      icon: "Wind",
      description:
        "Advanced HVAC design, ventilation systems, and climate control solutions for optimal comfort and energy efficiency.",
      features: [
        "HVAC system design and optimization",
        "Ventilation and air quality management",
        "Chilled water and hot water systems",
        "Energy-efficient climate control",
        "Indoor air quality analysis",
      ],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd4789?w=800&q=80",
    },
    {
      id: "electrical",
      title: "Electrical Engineering",
      icon: "Zap",
      description:
        "Comprehensive electrical design including power distribution, lighting, and intelligent building automation systems.",
      features: [
        "Power distribution and load calculations",
        "Lighting design and control systems",
        "Emergency and backup power systems",
        "Low voltage and communication systems",
        "Smart building automation",
      ],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    },
    {
      id: "plumbing",
      title: "Plumbing Design",
      icon: "Droplets",
      description:
        "Efficient water supply, drainage, and sanitary systems designed for sustainability and optimal performance.",
      features: [
        "Potable water distribution systems",
        "Drainage and sewage systems",
        "Rainwater harvesting",
        "Greywater recycling",
        "Fire protection systems",
      ],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    },
    {
      id: "district-cooling",
      title: "District Cooling",
      icon: "Snowflake",
      description:
        "Centralized cooling solutions for large-scale developments, providing energy-efficient temperature control.",
      features: [
        "Central cooling plant design",
        "Distribution network optimization",
        "Energy transfer station design",
        "System performance monitoring",
        "Cost-benefit analysis",
      ],
      image: "https://images.unsplash.com/photo-1581092160607-ee22f86aeee6?w=800&q=80",
    },
    {
      id: "bim",
      title: "BIM Coordination",
      icon: "Box",
      description:
        "Advanced 3D modeling and coordination services to detect clashes and optimize design before construction.",
      features: [
        "3D MEP modeling and coordination",
        "Clash detection and resolution",
        "Construction documentation",
        "As-built drawing preparation",
        "4D and 5D BIM implementation",
      ],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    },
    {
      id: "sustainability",
      title: "Sustainability Consulting",
      icon: "Leaf",
      description:
        "Green building strategies and LEED consulting to achieve environmental certifications and reduce carbon footprint.",
      features: [
        "LEED and green building certification",
        "Energy modeling and simulation",
        "Renewable energy integration",
        "Carbon footprint reduction",
        "Sustainable material selection",
      ],
      image: "https://images.unsplash.com/photo-1497366216902-e10e4aeda137?w=800&q=80",
    },
  ],

  clients: [
    "Emaar Properties",
    "ADIB",
    "Jumeirah Group",
    "Qatar Diar",
    "Majid Al Futtaim",
    "Royal Commission",
  ],

  about: {
    mission:
      "To deliver world-class MEP engineering solutions that exceed client expectations, promote sustainability, and contribute to the development of landmark projects across the region through innovation, technical excellence, and unwavering commitment to quality.",
    vision:
      "To be recognized as the leading MEP engineering consultancy in the Middle East, setting industry benchmarks for innovation, sustainability, and client satisfaction while fostering a culture of continuous improvement and professional excellence.",
    description: [
      "Nottingham MEP Consultancy has been at the forefront of mechanical, electrical, and plumbing engineering design across the Gulf region since 2009. Our team of highly skilled engineers delivers innovative, sustainable, and cost-effective solutions for projects of all scales.",
      "With a portfolio spanning hospitality, commercial, residential, healthcare, and infrastructure sectors, we have established ourselves as a trusted partner for developers, architects, and contractors throughout the UAE and GCC countries.",
      "Our commitment to excellence, technical expertise, and client satisfaction has earned us recognition as one of the region's premier MEP engineering consultancies.",
    ],
    timeline: [
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
    ],
    whyChooseUs: [
      {
        icon: "Award",
        title: "Proven Expertise",
        description: "Over 300 successfully delivered projects across the GCC region",
      },
      {
        icon: "Users",
        title: "Expert Team",
        description: "Highly qualified engineers with international certifications",
      },
      {
        icon: "Globe",
        title: "Regional Presence",
        description: "Active in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman",
      },
      {
        icon: "TrendingUp",
        title: "Innovation Focus",
        description: "Cutting-edge solutions using latest technology and BIM",
      },
      {
        icon: "Target",
        title: "Client-Centric",
        description: "95% client satisfaction rate with personalized service",
      },
      {
        icon: "Award",
        title: "Quality Assurance",
        description: "ISO certified processes ensuring consistent excellence",
      },
    ],
  },

  contact: {
    locations: [
      {
        icon: "MapPin",
        title: "Visit Us",
        content: "Business Bay, Dubai, UAE",
      },
      {
        icon: "Phone",
        title: "Call Us",
        content: "+971 4 XXX XXXX",
      },
      {
        icon: "Mail",
        title: "Email Us",
        content: "info@nottingham-mep.com",
      },
      {
        icon: "Clock",
        title: "Working Hours",
        content: "Sun - Thu: 8:00 AM - 6:00 PM",
      },
    ],
    formFields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "John Doe",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "john@example.com",
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "+971 XX XXX XXXX",
      },
      {
        name: "company",
        label: "Company Name",
        type: "text",
        required: false,
        placeholder: "Your Company",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your project...",
      },
    ],
  },

  careers: {
    benefits: [
      {
        icon: "📈",
        title: "Career Growth",
        description: "Professional development and training opportunities",
      },
      {
        icon: "🏗️",
        title: "Exciting Projects",
        description: "Work on landmark developments across the GCC",
      },
      {
        icon: "💼",
        title: "Competitive Benefits",
        description: "Industry-leading compensation and benefits package",
      },
    ],
    openings: [
      {
        id: "senior-mechanical",
        title: "Senior Mechanical Engineer",
        department: "Mechanical",
        location: "Dubai, UAE",
        type: "Full-time",
        description:
          "Lead MEP design for major hospitality and commercial projects across the GCC region.",
      },
      {
        id: "electrical-design",
        title: "Electrical Design Engineer",
        department: "Electrical",
        location: "Dubai, UAE",
        type: "Full-time",
        description:
          "Design electrical systems for high-rise and mixed-use developments with focus on energy efficiency.",
      },
      {
        id: "bim-coordinator",
        title: "BIM Coordinator",
        department: "BIM",
        location: "Dubai, UAE",
        type: "Full-time",
        description:
          "Coordinate 3D MEP modeling and clash detection for large-scale infrastructure projects.",
      },
      {
        id: "sustainability-consultant",
        title: "Sustainability Consultant",
        department: "Sustainability",
        location: "Dubai, UAE",
        type: "Full-time",
        description:
          "Provide LEED and green building consulting services for sustainable development projects.",
      },
    ],
  },
};

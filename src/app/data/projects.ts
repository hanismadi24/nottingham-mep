export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  sector: string;
  client: string;
  projectType: string;
  serviceType: string[];
  builtUpArea: string;
  year: string;
  image: string;
  description: string;
  scope: string;
  technicalChallenges: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "52-42-twin-towers",
    name: "52 | 42 Twin Towers",
    location: "Dubai Marina, Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    sector: "Residential",
    client: "Emaar Properties",
    projectType: "Residential / Apartments (High-Rise)",
    serviceType: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "BIM Coordination",
    ],
    builtUpArea: "280,000 m²",
    year: "2020",
    image: "https://i.imgur.com/8XqlWNi.png",
    description:
      "Luxury twin-tower residential complex in Dubai Marina with panoramic views and premium amenities.",
    scope:
      "MEP Design Services and BIM coordination for high-rise residential development.",
    technicalChallenges: [
      "High-rise MEP system integration",
      "Complex power distribution for residential towers",
      "Water conservation and efficient HVAC design",
    ],
    gallery: ["https://i.imgur.com/8XqlWNi.png"],
  },
  {
    id: "nura",
    name: "NURA",
    location: "RAK, UAE",
    city: "Ras Al Khaimah",
    country: "UAE",
    sector: "Residential",
    client: "RAK Properties",
    projectType: "Residential / Apartments (High-Rise)",
    serviceType: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "BIM Coordination",
    ],
    builtUpArea: "50,000 m²",
    year: "2025",
    image: "https://i.imgur.com/QyM0Suh.png",
    description:
      "High-rise residential development in Ras Al Khaimah featuring modern apartments with premium amenities and stunning waterfront views.",
    scope:
      "MEP Design Services for high-rise residential tower including mechanical, electrical, plumbing, and BIM coordination.",
    technicalChallenges: [
      "High-rise MEP coordination",
      "Efficient HVAC design for coastal climate",
      "Water conservation systems",
      "Power distribution for residential units",
    ],
    gallery: ["https://i.imgur.com/QyM0Suh.png"],
  },
  {
  id: "la-mazzoni",
  name: "La Mazzoni",
  location: "Al Marjan Island, RAK, UAE",
  city: "Ras Al Khaimah",
  country: "UAE",
  sector: "Residential",
  client: "The Luxe Developers",
  projectType: "Residential / Apartments (Branded)",
  serviceType: ["Mechanical", "Electrical", "Plumbing", "BIM Coordination"],
  builtUpArea: "137,198 m²",
  year: "2028",
  image: "https://i.imgur.com/16zLjSW.jpeg",
  description: "Wellness-integrated luxury branded residence on Al Marjan Island featuring biophilic architecture, wave-inspired design, and five-star hospitality amenities[citation:1][citation:3].",
  scope: "MEP Design Services for luxury branded residential development including mechanical, electrical, plumbing, and BIM coordination.",
  technicalChallenges: [
    "Complex MEP integration for wellness facilities and spa areas",
    "Smart home system integration across 562 branded residences[citation:3][citation:5]",
    "Energy-efficient HVAC design for coastal high-rise development",
    "Water conservation and sustainable system implementation"
  ],
  gallery: ["https://i.imgur.com/16zLjSW.jpeg"]
},
  {
  id: "mama-shelter-hotel",
  name: "Mama Shelter Hotel",
  location: "Business Bay, Dubai, UAE",
  city: "Dubai",
  country: "UAE",
  sector: "Hospitality",
  client: "Khamas Group of Investment",
  projectType: "Hospitality / Hotel (Branded Aparthotel)",
  serviceType: ["Mechanical", "Electrical", "Plumbing", "BIM Coordination"],
  builtUpArea: "50,442 m²",
  year: "2025",
  image: "https://i.imgur.com/4An3nJu.jpeg",
  description: "First Mama Shelter property in the Middle East, featuring a bold black facade with dynamic LED-lit fins, 197 hotel rooms and 203 branded apartments in Dubai's Business Bay district.",
  scope: "MEP Design Services for 25-storey branded aparthotel including mechanical, electrical, plumbing, and BIM coordination.",
  technicalChallenges: [
    "Complex MEP integration for hybrid hotel and residential tower",
    "Energy-efficient HVAC for 25-storey building with swimming pools and outdoor amenities on 3rd floor podium",
    "LED facade lighting system design with light pollution control",
    "Dual-lobby MEP separation for hotel guests and apartment residents",
    "Sustainable water management for desert climate operations"
  ],
  gallery: ["https://i.imgur.com/4An3nJu.jpeg?w=1200&q=80"]
},
{
  id: "majid-al-futtaim-mosque",
  name: "Majid Al Futtaim Mosque",
  location: "Tilal Al Ghaf, Dubai, UAE",
  city: "Dubai",
  country: "UAE",
  sector: "Religious",
  client: "Majid Al Futtaim",
  projectType: "Religious / Mosque (Net-Positive)",
  serviceType: [
    "Mechanical",
    "Electrical",
    "Plumbing",
    "Sustainability",
    "BIM Coordination",
  ],
  builtUpArea: "20,000 m²",
  year: "2024",
  image: "https://i.imgur.com/BlKSVLx.jpeg",
  description: "Middle East's first net-positive mosque featuring 203 solar PV panels generating 115% of energy needs, BREEAM-certified, with sustainable MEP systems and advanced water recycling technology.",
  scope: "Complete MEP design for net-positive religious building including advanced mechanical, electrical, plumbing systems, renewable energy integration, and sustainability consulting.",
  technicalChallenges: [
    "Net-positive energy integration with 203 solar PV panels (116.73 kWp capacity)",
    "BREEAM Excellent certification requirements",
    "Greywater recycling (Hydraloop system) for ablution water management",
    "Efficient HVAC design for Dubai's climate with BMS optimization",
    "Natural daylighting integration (80% of occupied spaces)",
    "EV charging station infrastructure planning",
  ],
  gallery: ["https://i.imgur.com/BlKSVLx.jpeg"],
},
  {
  id: "masaar-by-arada",
  name: "Masaar By Arada",
  location: "Suyoh District, Sharjah, UAE",
  city: "Sharjah",
  country: "UAE",
  sector: "Residential",
  client: "Arada Developments",
  projectType: "Residential / Villas & Townhouses (Forest Community)",
  serviceType: [
    "Mechanical",
    "Electrical",
    "Plumbing",
    "BIM Coordination",
  ],
  builtUpArea: "394,493 m²",
  year: "2026",
  image: "https://i.imgur.com/2TS8mpo.png",
  description: "A forested megaproject in Sharjah featuring over 3,000 smart eco-friendly villas and townhouses across seven gated districts connected by a 'green spine' adorned with 50,000+ trees.",
  scope: "MEP Design Services for master-planned residential community including mechanical, electrical, plumbing, and BIM coordination for villas and townhouses.",
  technicalChallenges: [
    "Smart home technology integration across 3,000+ residential units",
    "District-wide MEP coordination for 7 interconnected gated districts",
    "Sustainable water management for 50,000+ tree green spine irrigation",
    "Efficient HVAC design for forested community in Sharjah climate",
    "Infrastructure utilities coordination across 19 million sq. ft. masterplan",
  ],
  gallery: ["https://i.imgur.com/2TS8mpo.png"],
},
  {
    id: "bahrain-mall",
    name: "Bahrain City Center",
    location: "Manama, Bahrain",
    city: "Manama",
    country: "Bahrain",
    sector: "Commercial",
    client: "Majid Al Futtaim",
    projectType: "Mixed-Use",
    serviceType: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "BIM Coordination",
    ],
    builtUpArea: "180,000 m²",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1555529669-2269763671c0?w=1200&q=80",
    description:
      "Integrated mixed-use development with retail, office, and entertainment",
    scope: "Full MEP design coordination for mixed-use complex",
    technicalChallenges: [
      "Mixed-use MEP coordination",
      "Central plant optimization",
      "Diverse load management",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555529669-2269763671c0?w=1200&q=80",
    ],
  },
  {
    id: "muscat-resort",
    name: "Muscat Beach Resort",
    location: "Muscat, Oman",
    city: "Muscat",
    country: "Oman",
    sector: "Hospitality",
    client: "Omran Tourism",
    projectType: "Resort",
    serviceType: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Sustainability",
    ],
    builtUpArea: "75,000 m²",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
    description:
      "Luxury beachfront resort with sustainable MEP solutions",
    scope:
      "MEP design with focus on sustainability and energy efficiency",
    technicalChallenges: [
      "Solar energy integration",
      "Seawater cooling systems",
      "Humidity control",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
    ],
  },
  {
    id: "dubai-villa",
    name: "Emirates Hills Villas",
    location: "Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    sector: "Residential",
    client: "Private Developer",
    projectType: "Luxury Villas",
    serviceType: ["Mechanical", "Electrical", "Plumbing"],
    builtUpArea: "25,000 m²",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    description:
      "Ultra-luxury villa development with smart home integration",
    scope:
      "MEP design for 12 luxury villas with premium finishes",
    technicalChallenges: [
      "Smart home automation",
      "Landscape irrigation systems",
      "Pool and spa engineering",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
  },
  {
    id: "sharjah-university",
    name: "Sharjah University Campus",
    location: "Sharjah, UAE",
    city: "Sharjah",
    country: "UAE",
    sector: "Education",
    client: "University of Sharjah",
    projectType: "Educational",
    serviceType: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "BIM Coordination",
      "Supervision",
    ],
    builtUpArea: "140,000 m²",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    description:
      "Modern university campus with advanced learning facilities",
    scope:
      "Complete MEP design and supervision for academic buildings and laboratories",
    technicalChallenges: [
      "Laboratory ventilation systems",
      "Campus-wide energy management",
      "Lecture hall acoustics",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    ],
  },
];
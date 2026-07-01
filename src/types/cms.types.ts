// src/types/cms.types.ts
export interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  currentPosition?: string;
  yearsOfExperience?: number;
  coverLetter?: string;
  cvFile?: string;
  createdDate: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  country: string;
  sector: string;
  client: string;
  projectType: string;
  builtUpArea?: string;  // ✅ Make it optional with ?
  year: string;
  image: string;
  description: string;
  scope: string;
  serviceType: string[];
  gallery: string[];
}

export interface ContactBranch {
  id: string;
  name: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  googleMapUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactSettings {
  id: string;
  heroTitle: string;
  heroDescription: string;
}

export interface ContactMessage {
  id: string;
  branchId: string;
  branchName?: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdDate: string;
}

export interface HeroSlider {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  displayOrder: number;
  desktopImage: string;
  mobileImage: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  displayOrder: number;
  features: string[];
  isActive: boolean;
  image?: string;
}
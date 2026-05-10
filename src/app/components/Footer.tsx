import { Link } from "react-router";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">N</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">Nottingham</div>
                <div className="text-gray-400 text-sm">MEP Consultancy</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Engineering landmark projects across the GCC region with innovative MEP solutions and sustainable design.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#a11d17] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#a11d17] rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#a11d17] rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/cms" className="text-gray-400 hover:text-[#a11d17] transition-colors">
                  CMS Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mechanical Engineering</li>
              <li>Electrical Engineering</li>
              <li>Plumbing Design</li>
              <li>District Cooling</li>
              <li>BIM Coordination</li>
              <li>Sustainability Consulting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex gap-2">
                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                <span>+971 4 XXX XXXX</span>
              </li>
              <li className="flex gap-2">
                <Mail size={18} className="flex-shrink-0 mt-0.5" />
                <span>info@nottingham-mep.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nottingham MEP Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

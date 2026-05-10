import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled && !isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#a11d17] to-[#7d1712] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">N</span>
            </div>
            <div>
              <div
                className={`font-bold text-lg leading-none transition-colors ${
                  isTransparent ? "text-white" : "text-[#0F172A]"
                }`}
              >
                Nottingham
              </div>
              <div
                className={`text-sm transition-colors ${
                  isTransparent ? "text-white/80" : "text-[#64748b]"
                }`}
              >
                MEP Consultancy
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/services"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/insights"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              Insights
            </Link>
            <Link
              to="/careers"
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#0F172A] hover:text-[#a11d17]"
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg hover:shadow-lg transition-all"
            >
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isTransparent ? "text-white" : "text-[#0F172A]"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                Projects
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                About Us
              </Link>
              <Link
                to="/insights"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                Insights
              </Link>
              <Link
                to="/careers"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-gradient-to-r from-[#a11d17] to-[#7d1712] text-white rounded-lg text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

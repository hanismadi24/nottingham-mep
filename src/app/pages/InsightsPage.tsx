import { motion } from "motion/react";
import { Calendar, User, ArrowRight } from "lucide-react";

export function InsightsPage() {
  const articles = [
    {
      title: "The Future of Sustainable MEP Design in the GCC",
      excerpt:
        "Exploring emerging trends in green building technologies and their impact on MEP engineering practices across the Gulf region.",
      author: "Ahmed Hassan",
      date: "April 15, 2026",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1497366216902-e10e4aeda137?w=800&q=80",
    },
    {
      title: "BIM Integration: Transforming MEP Coordination",
      excerpt:
        "How Building Information Modeling is revolutionizing the way we approach complex MEP projects and reducing construction conflicts.",
      author: "Sarah Ahmed",
      date: "April 10, 2026",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    },
    {
      title: "District Cooling: Efficient Solutions for Urban Development",
      excerpt:
        "Understanding the benefits and implementation strategies of district cooling systems in large-scale mixed-use developments.",
      author: "Mohammed Ali",
      date: "April 5, 2026",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1581092160607-ee22f86aeee6?w=800&q=80",
    },
    {
      title: "Energy Efficiency in High-Rise Buildings",
      excerpt:
        "Best practices for designing energy-efficient MEP systems in tall buildings while maintaining occupant comfort and reducing operational costs.",
      author: "Fatima Khan",
      date: "March 28, 2026",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    {
      title: "Smart Building Technologies and MEP Integration",
      excerpt:
        "The role of IoT and smart building systems in modern MEP design and how they enhance building performance and user experience.",
      author: "Omar Rashid",
      date: "March 22, 2026",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    },
    {
      title: "Water Conservation Strategies in MEP Design",
      excerpt:
        "Innovative approaches to water management and conservation in building MEP systems for arid climates.",
      author: "Layla Mohammed",
      date: "March 15, 2026",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insights & Articles</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry insights, technical articles, and thought leadership from our experts
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#a11d17] text-white text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#a11d17] transition-colors">
                  {article.title}
                </h2>
                <p className="text-[#64748b] mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {article.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#a11d17] text-sm font-medium">
                  Read More
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

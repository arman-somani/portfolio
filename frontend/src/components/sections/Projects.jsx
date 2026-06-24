import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects, using fallback data', error);
        setProjects([
          { _id: '1', title: 'Block Builder', description: 'A 3D voxel world construction tool built with Three.js.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', technologies: ['React', 'Three.js', 'Node.js'] },
          { _id: '2', title: 'Pixel Trader', description: 'A real-time crypto trading dashboard with retro aesthetics.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', technologies: ['Next.js', 'WebSocket', 'MongoDB'] },
          { _id: '3', title: 'Craft CMS', description: 'A headless content management system for indie game developers.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', technologies: ['TypeScript', 'PostgreSQL', 'GraphQL'] },
          { _id: '4', title: 'Nether Portal', description: 'An AI-powered search engine for documentation.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', technologies: ['Python', 'FastAPI', 'React'] },
          { _id: '5', title: 'Ender Analytics', description: 'Predictive data modeling with a sleek dark mode dashboard.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop', technologies: ['Vue', 'D3.js', 'Express'] },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen py-32 bg-[#050505] relative overflow-hidden flex flex-col justify-center">
      
      {/* Background radial gradient to give that subtle dark blue glow like the screenshot */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at right top, rgba(10, 25, 50, 0.4) 0%, transparent 50%), radial-gradient(circle at left bottom, rgba(10, 20, 40, 0.4) 0%, transparent 50%)'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Featured
          </h2>
          <h2 className="text-5xl md:text-7xl italic text-gray-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Works
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-sm tracking-wide leading-relaxed">
            Drag to explore the archive. Built with physical momentum.
          </p>
        </motion.div>
      </div>

      <div className="pl-6 md:pl-12 lg:pl-24 pb-12 relative z-10">
        <motion.div 
          ref={carouselRef} 
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          whileTap={{ cursor: "grabbing" }}
        >
          {loading ? (
            <div className="flex gap-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[450px] lg:min-w-[600px] h-[400px] md:h-[500px] bg-[#111] rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              drag="x" 
              dragConstraints={carouselRef} 
              className="flex gap-6 w-max pr-24"
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project._id || i}
                  className="relative overflow-hidden rounded-3xl group flex-shrink-0"
                  style={{
                    width: 'min(85vw, 600px)',
                    height: 'min(65vh, 500px)'
                  }}
                  whileHover={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <img
                    src={project.image?.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable="false"
                  />
                  
                  {/* Subtle vignette/gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-medium text-white mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 max-w-md line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech, j) => (
                        <span key={j} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs text-white/90 uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

    </section>
  );
};

export default Projects;

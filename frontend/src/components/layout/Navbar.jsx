import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto px-4 md:px-6 max-w-6xl">
        <div className="bg-[#2C2C2C]/95 mc-block px-4 md:px-6 py-3 flex items-center justify-between relative">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group z-20">
            {/* Logo image */}
            <img src="/crafting-table.png" alt="Crafting Table Logo" className="w-8 h-8 md:w-10 md:h-10 relative" style={{ imageRendering: 'pixelated' }} />
            <span className="font-pixel text-[8px] md:text-[10px] text-[var(--mc-gold)] group-hover:text-[var(--mc-diamond)] transition-colors">
              PORTFOLIO
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mc-btn !text-[8px] !py-2 !px-4 !bg-[#555] hover:!bg-[#7B68EE]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 z-20">
            {/* Contact CTA */}
            <a href="#contact" className="mc-btn !text-[8px] !py-2 !px-3 md:!px-4 !bg-[var(--mc-emerald)] hover:!bg-[#20FF70]" style={{ color: '#000', textShadow: 'none' }}>
              HIRE ME
            </a>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden mc-btn !text-[12px] !py-2 !px-3 !bg-[#555]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'X' : '☰'}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#2C2C2C]/95 mc-block p-4 flex flex-col gap-2 md:hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="mc-btn !text-[10px] !py-3 w-full text-center !bg-[#444] hover:!bg-[#7B68EE]"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

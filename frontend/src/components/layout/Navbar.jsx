import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

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
      <div className="mx-auto px-6 max-w-6xl">
        <div className="bg-[#2C2C2C]/95 mc-block px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            {/* Pixel pickaxe icon */}
            <div className="w-8 h-8 relative">
              <div className="absolute top-0 right-0 w-[12px] h-[12px] bg-[#4AEDD9]"></div>
              <div className="absolute top-[12px] left-[8px] w-[4px] h-[4px] bg-[#4AEDD9]"></div>
              <div className="absolute top-[8px] left-[4px] w-[8px] h-[8px] bg-[#6B4226]"></div>
              <div className="absolute bottom-0 left-0 w-[4px] h-[4px] bg-[#6B4226]"></div>
            </div>
            <span className="font-pixel text-[10px] text-[var(--mc-gold)] group-hover:text-[var(--mc-diamond)] transition-colors">
              PORTFOLIO
            </span>
          </a>

          {/* Nav Links */}
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

          {/* Contact CTA */}
          <a href="#contact" className="mc-btn !text-[8px] !py-2 !px-4 !bg-[var(--mc-emerald)] hover:!bg-[#20FF70]" style={{ color: '#000', textShadow: 'none' }}>
            HIRE ME
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

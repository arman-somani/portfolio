import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import MinecraftFooter from '../components/sections/MinecraftFooter';
import ScrollMinecart from '../components/ui/ScrollMinecart';
import BlockBreakParticles from '../components/ui/BlockBreakParticles';
import AchievementToast from '../components/ui/AchievementToast';
import Creeper from '../components/ui/Creeper';
import DayNightToggle from '../components/ui/DayNightToggle';
import ChatConsole from '../components/ui/ChatConsole';

const Home = () => {
  const [isDark, setIsDark] = useState(false);

  const triggerBlast = () => {
    // 1. Flash the screen white
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white z-[9999] pointer-events-none';
    flash.style.transition = 'opacity 0.2s';
    document.body.appendChild(flash);

    // 2. Select all major elements on the page to blast away
    const elements = document.querySelectorAll('.mc-block, .mc-slot, h1, h2, p, .mc-btn, img, span, svg');
    
    // Apply blast transform to all elements
    elements.forEach(el => {
      // Ignore some crucial or wrapper elements
      if (el.tagName === 'svg' && el.parentElement.className.includes('z-[1]')) return;
      
      const rx = (Math.random() - 0.5) * 300; // random X translation (vw)
      const ry = (Math.random() - 0.5) * 300; // random Y translation (vh)
      const rr = (Math.random() - 0.5) * 1080; // random rotation
      
      el.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.5s';
      el.style.transform = `translate(${rx}vw, ${ry}vh) rotate(${rr}deg)`;
      el.style.opacity = '0';
    });

    // Fade out flash
    setTimeout(() => {
      flash.style.opacity = '0';
    }, 200);

    // 3. Bring everything back after 3 seconds
    setTimeout(() => {
      elements.forEach(el => {
        el.style.transition = 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 3s';
        el.style.transform = '';
        el.style.opacity = '';
      });
    }, 500); // the blast out takes 0.5s, so start return immediately after

    // Cleanup
    setTimeout(() => {
      flash.remove();
      elements.forEach(el => {
        el.style.transition = ''; // reset transition so hover effects work again
      });
    }, 3500); // 0.5s + 3s = 3.5s
  };

  return (
    <div className={`min-h-screen relative pb-[24px] transition-colors duration-1000 ${
      isDark ? 'bg-[#0a0a1a]' : 'bg-[var(--mc-obsidian)]'
    }`}>
      {/* Global interactive layers */}
      <BlockBreakParticles />
      <AchievementToast />
      <Creeper onBlast={triggerBlast} />
      <DayNightToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <ChatConsole />
      <ScrollMinecart />

      {/* Page sections */}
      <Navbar />
      <Hero isDark={isDark} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <MinecraftFooter />
    </div>
  );
};

export default Home;

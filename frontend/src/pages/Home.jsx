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
import DayNightToggle from '../components/ui/DayNightToggle';
import ChatConsole from '../components/ui/ChatConsole';

const Home = () => {
  const [isDark, setIsDark] = useState(false);



  return (
    <div className={`min-h-screen relative pb-[24px] transition-colors duration-1000 ${
      isDark ? 'bg-[#0a0a1a]' : 'bg-[var(--mc-obsidian)]'
    }`}>
      {/* Global atmospheric night overlay */}
      <div 
        className={`fixed inset-0 z-[40] pointer-events-none transition-opacity duration-1000 bg-[#0A0A2A] mix-blend-multiply ${
          isDark ? 'opacity-70' : 'opacity-0'
        }`}
      ></div>

      {/* Global interactive layers */}
      <BlockBreakParticles />
      <AchievementToast />
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

import { useEffect } from 'react';
import anime from 'animejs';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-reveal').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }, []);

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <span className="contact-reveal block font-sans text-white/40 uppercase tracking-widest text-xs mb-8">
          05 — Let's Talk
        </span>
        
        <h2 className="contact-reveal text-5xl md:text-8xl lg:text-[9rem] font-serif text-white mb-12 leading-[0.9] hover:italic transition-all duration-500 cursor-pointer">
          <a href="mailto:hello@portfolio.com">Say Hello.</a>
        </h2>
        
        <div className="contact-reveal flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
          <p className="text-white/50 font-sans max-w-md mx-auto md:mx-0 md:text-left text-sm leading-relaxed">
            I am currently open to new opportunities. Whether you have a project in mind or just want to connect, feel free to reach out.
          </p>
          
          <a 
            href="mailto:hello@portfolio.com" 
            className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-sans font-semibold hover:bg-white/90 transition-colors shrink-0"
          >
            hello@portfolio.com
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight size={16} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

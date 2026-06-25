import { useEffect, useState, useRef } from 'react';

const ChatConsole = () => {
  const [messages, setMessages] = useState([
    { text: '[Server] Welcome to Arman\'s portfolio!', color: 'var(--mc-gold)' },
    { text: '[Server] Type a message and press Enter...', color: 'var(--mc-emerald)' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    'Nice to meet you! Feel free to explore my work.',
    'I love building interactive UIs like this one!',
    'Did you find the Creeper? 👀',
    'Try clicking the Day/Night toggle!',
    'This entire site is built with React + Framer Motion.',
    'Thanks for visiting! Don\'t forget to check out my projects.',
    'The minecart at the bottom tracks your scroll progress!',
    'Fun fact: I used Press Start 2P font for the pixel text.',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { text: `<You> ${trimmed}`, color: '#fff' }]);
    setInput('');

    // Check for commands
    if (trimmed.startsWith('/')) {
      const command = trimmed.toLowerCase();
      
      if (command === '/help') {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: '[Server] Available commands: /help, /about, /skills, /projects, /experience, /contact, /clear, /gamemode c', color: 'var(--mc-gold)' }]);
        }, 300);
      } else if (command === '/clear') {
        setTimeout(() => {
          setMessages([{ text: '[Server] Chat cleared.', color: 'var(--mc-gold)' }]);
        }, 100);
      } else if (['/about', '/skills', '/projects', '/experience', '/contact'].includes(command)) {
        const sectionId = command.replace('/', '');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setMessages(prev => [...prev, { text: `[Server] Teleporting to ${sectionId}...`, color: 'var(--mc-gold)' }]);
          } else {
            setMessages(prev => [...prev, { text: `[Server] Error: Section ${sectionId} not found.`, color: '#ff5555' }]);
          }
        }, 300);
      } else if (command === '/gamemode c' || command === '/gamemode creative') {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: '[Server] Your game mode has been updated to Creative Mode.', color: 'var(--mc-gold)' }]);
        }, 300);
      } else if (command === '/time set day') {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: '[Server] Set the time to 1000', color: 'var(--mc-gold)' }]);
        }, 300);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: `[Server] Unknown command: ${trimmed}. Type /help for a list of commands.`, color: '#ff5555' }]);
        }, 300);
      }
      return;
    }
    
    // Bot reply after delay
    const reply = botResponses[Math.floor(Math.random() * botResponses.length)];
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `[Arman] ${reply}`, color: 'var(--mc-diamond)' }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 left-6 z-[100]">
      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mc-btn !text-[8px] !py-2 !px-3 mb-2"
      >
        {isOpen ? '✕ CLOSE' : '💬 CHAT'}
      </button>

      {isOpen && (
        <div className="w-80 bg-[#2C2C2C]/95 mc-block overflow-hidden">
          {/* Messages */}
          <div className="h-48 overflow-y-auto p-3 space-y-1 no-scrollbar">
            {messages.map((msg, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: msg.color, textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                {msg.text}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSend} className="border-t-2 border-[#555] p-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say something..."
              className="flex-1 bg-[#1a1a1a] text-white text-sm px-3 py-2 mc-block-inset outline-none placeholder:text-white/30 font-[VT323]"
              style={{ cursor: 'text' }}
            />
            <button type="submit" className="mc-btn !text-[7px] !py-1 !px-3">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatConsole;

import { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, LogOut, FolderGit2, Code2, Briefcase, MessageSquare } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold neon-text-blue">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-2">{user?.email}</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <FolderGit2 size={20} /> Projects
          </Link>
          <Link to="/admin/skills" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <Code2 size={20} /> Skills
          </Link>
          <Link to="/admin/experience" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <Briefcase size={20} /> Experience
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <MessageSquare size={20} /> Messages
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-slate-950 border-b border-slate-800 h-16 flex items-center px-8">
          <h1 className="text-xl font-medium text-white">Dashboard Overview</h1>
        </header>
        
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/projects" element={<div className="text-white">Projects Management (To be implemented)</div>} />
            <Route path="/skills" element={<div className="text-white">Skills Management (To be implemented)</div>} />
            <Route path="/experience" element={<div className="text-white">Experience Management (To be implemented)</div>} />
            <Route path="/messages" element={<div className="text-white">Messages View (To be implemented)</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const Overview = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pRes, sRes, eRes, mRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/contact')
        ]);
        setStats({
          projects: pRes.data.length,
          skills: sRes.data.length,
          experiences: eRes.data.length,
          messages: mRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-card p-6">
        <h3 className="text-slate-400 font-medium mb-2">Total Projects</h3>
        <p className="text-3xl font-bold text-white">{stats.projects}</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-slate-400 font-medium mb-2">Skills Configured</h3>
        <p className="text-3xl font-bold text-white">{stats.skills}</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-slate-400 font-medium mb-2">Experiences</h3>
        <p className="text-3xl font-bold text-white">{stats.experiences}</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-slate-400 font-medium mb-2">Messages Received</h3>
        <p className="text-3xl font-bold text-white">{stats.messages}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

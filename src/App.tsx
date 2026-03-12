import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { LibraryProvider } from './context/LibraryContext';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import Library from './pages/Library';
import AITutor from './components/AITutor';
import { GraduationCap, LayoutDashboard, BookOpen, Settings, Sun, Moon, Library as LibraryIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">ENVI<span className="text-emerald-600">STUDY</span></span>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Đại học Đồng Tháp</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link to="/modules" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Chuyên đề</span>
            </Link>
            <Link to="/library" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors flex items-center gap-2">
              <LibraryIcon className="w-4 h-4" />
              <span className="hidden md:inline">Thư viện</span>
            </Link>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <ProgressProvider>
      <LibraryProvider>
        <Router>
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/modules/:id" element={<ModuleDetail />} />
                <Route path="/modules" element={<Dashboard />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </main>

            <AITutor />

          <button 
            onClick={() => setIsDark(!isDark)}
            className="fixed bottom-6 left-6 p-4 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50"
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
                <span className="text-xl font-black text-zinc-900 dark:text-white">ENVI STUDY</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8">
                Nền tảng hỗ trợ ôn tập kiến thức chuyên ngành Khoa học Môi trường. 
                Sản phẩm dành riêng cho sinh viên Trường Đại học Đồng Tháp.
              </p>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                © 2024 DONG THAP UNIVERSITY - ENVIRONMENTAL SCIENCE
              </div>
            </div>
          </footer>
        </div>
      </Router>
      </LibraryProvider>
    </ProgressProvider>
  );
}

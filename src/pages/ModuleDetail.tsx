import { useParams, Link } from 'react-router-dom';
import { modules, quizzes } from '../data/mockData';
import { BookOpen, ChevronLeft, PlayCircle, FileText, HelpCircle, Calculator } from 'lucide-react';
import InteractiveDiagram from '../components/InteractiveDiagram';
import QuizSystem from '../components/QuizSystem';
import EnvironmentalCalculators from '../components/EnvironmentalCalculators';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function ModuleDetail() {
  const { id } = useParams();
  const module = modules.find(m => m.id === id);
  const quiz = quizzes.find(q => q.moduleId === id);
  const [activeTab, setActiveTab] = useState('theory');

  if (!module) return <div className="p-20 text-center">Không tìm thấy chuyên đề.</div>;

  const tabs = [
    { id: 'theory', label: 'Lý thuyết', icon: BookOpen },
    { id: 'diagram', label: 'Sơ đồ quy trình', icon: PlayCircle },
    { id: 'calculator', label: 'Tính toán', icon: Calculator },
    { id: 'quiz', label: 'Trắc nghiệm', icon: HelpCircle }
  ];

  return (
    <div className="pb-20">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-600 font-medium mb-8 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Quay lại Dashboard
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 space-y-2">
          <div className="p-6 bg-emerald-900 rounded-3xl text-white mb-6">
            <h1 className="text-2xl font-black mb-2">{module.title}</h1>
            <p className="text-emerald-200/70 text-sm leading-relaxed">{module.description}</p>
          </div>
          
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Tài liệu đính kèm
            </h4>
            <div className="space-y-3">
              <button className="w-full text-left text-xs font-medium text-emerald-600 hover:underline">
                📄 Giao_trinh_XLNT.pdf (2.4MB)
              </button>
              <button className="w-full text-left text-xs font-medium text-emerald-600 hover:underline">
                📊 So_do_Aerotank.png (1.1MB)
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[600px]"
          >
            {activeTab === 'theory' && (
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8">Nội dung lý thuyết</h2>
                  <div className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-loose text-lg">
                    {module.theory}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'diagram' && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">Sơ đồ tương tác</h2>
                  <p className="text-zinc-500 mb-12">Khám phá quy trình xử lý thông qua sơ đồ tương tác dưới đây.</p>
                  <InteractiveDiagram steps={module.steps} />
                </div>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="max-w-2xl mx-auto">
                <EnvironmentalCalculators />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="py-8">
                {quiz ? (
                  <QuizSystem quiz={quiz} />
                ) : (
                  <div className="text-center p-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                    Chưa có bài trắc nghiệm cho chuyên đề này.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

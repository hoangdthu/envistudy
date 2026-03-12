import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, Search, ArrowRight, TrendingUp, GraduationCap } from 'lucide-react';
import { modules } from '../data/mockData';
import { useProgress } from '../context/ProgressContext';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { progress } = useProgress();

  const quizScoresArray = Object.values(progress.quizScores) as number[];
  const averageScore = quizScoresArray.length 
    ? (quizScoresArray.reduce((a, b) => a + b, 0) / quizScoresArray.length).toFixed(0) 
    : 0;

  const stats = [
    { label: 'Chuyên đề đã học', value: progress.completedModules.length, total: modules.length, icon: BookOpen, color: 'emerald' },
    { label: 'Điểm trung bình', value: averageScore, total: 100, icon: Award, color: 'blue' },
    { label: 'Thời gian học', value: '12h', total: '50h', icon: Clock, color: 'orange' }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 text-white p-8 sm:p-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800/50 rounded-full text-emerald-300 text-sm font-medium mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            Đại học Đồng Tháp - Khoa Khoa học Môi trường
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black mb-6 leading-tight"
          >
            Làm chủ kiến thức <br />
            <span className="text-emerald-400 italic">Kỹ thuật Môi trường</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/80 text-lg mb-8 max-w-lg"
          >
            Nền tảng ôn tập số hóa giúp sinh viên nắm vững quy trình xử lý nước thải, khí thải và chất thải rắn.
          </motion.p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Tìm kiếm chuyên đề, công thức..."
              className="w-full bg-emerald-800/50 border-none rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-emerald-400 focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-6 shadow-sm"
          >
            <div className={`p-4 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              <div className="text-3xl font-black text-zinc-900 dark:text-white">
                {stat.value} <span className="text-lg font-normal text-zinc-400">/ {stat.total}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Modules Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Chuyên đề học tập</h2>
            <p className="text-zinc-500">Bắt đầu ôn tập các module kiến thức chuyên ngành</p>
          </div>
          <Link to="/modules" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Xem tất cả <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Link 
                to={`/modules/${module.id}`}
                className="group block bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${module.color}-100 dark:bg-${module.color}-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <BookOpen className={`w-8 h-8 text-${module.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{module.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  {module.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Bắt đầu học</span>
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity / Tips */}
      <section className="bg-zinc-100 dark:bg-zinc-800/50 rounded-[2.5rem] p-8 sm:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-4">
              <TrendingUp className="w-5 h-5" />
              Mẹo học tập hiệu quả
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6">Tối ưu hóa quá trình tự học</h2>
            <ul className="space-y-4">
              {[
                'Sử dụng Interactive Diagram để ghi nhớ quy trình trực quan.',
                'Làm bài trắc nghiệm sau mỗi chuyên đề để củng cố kiến thức.',
                'Sử dụng AI Tutor để giải đáp các thắc mắc về công thức tính toán.',
                'Lưu tiến độ học tập để theo dõi sự tiến bộ hàng ngày.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-600">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <Award className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Sẵn sàng thi thử?</h3>
            <p className="text-zinc-500 text-sm mb-6">Làm bài thi tổng hợp để đánh giá năng lực hiện tại của bạn.</p>
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
              Bắt đầu thi thử
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

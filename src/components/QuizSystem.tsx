import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Timer, RotateCcw, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export default function QuizSystem({ quiz }) {
  const { saveQuizScore } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.questions.length * 60); // 1 min per question

  useEffect(() => {
    if (isFinished || timeLeft <= 0) {
      if (timeLeft <= 0) setIsFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const handleOptionSelect = (index) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === quiz.questions[currentQuestion].answer;
    if (isCorrect) setScore(prev => prev + 1);
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setIsFinished(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100;
        saveQuizScore(quiz.id, finalScore);
      }
    }, 2000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFinished) {
    const finalScore = (score / quiz.questions.length) * 100;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-2xl"
      >
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Hoàn thành bài tập!</h2>
        <p className="text-zinc-500 mb-8">Bạn đã hoàn thành bài ôn tập chuyên đề {quiz.title}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl">
            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-1">Điểm số</div>
            <div className="text-4xl font-black text-emerald-600">{finalScore.toFixed(0)}%</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl">
            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-1">Đúng</div>
            <div className="text-4xl font-black text-blue-600">{score}/{quiz.questions.length}</div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          Làm lại bài tập <RotateCcw className="w-5 h-5" />
        </button>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="h-2 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-zinc-500">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 font-mono text-sm">
          <Timer className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <motion.div 
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl"
      >
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let statusClass = "border-zinc-200 dark:border-zinc-800 hover:border-emerald-500";
            if (showResult) {
              if (index === question.answer) statusClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
              else if (index === selectedOption) statusClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
            } else if (selectedOption === index) {
              statusClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${statusClass}`}
              >
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{option}</span>
                {showResult && index === question.answer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {showResult && index === selectedOption && index !== question.answer && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700"
            >
              <div className="text-xs font-bold text-emerald-600 uppercase mb-1">Giải thích:</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null || showResult}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

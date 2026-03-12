import { useState } from 'react';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export default function InteractiveDiagram({ steps }) {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="relative py-12 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap justify-center gap-8 items-center relative z-10">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveStep(step)}
              className={`relative w-32 h-32 rounded-2xl flex flex-col items-center justify-center p-4 text-center transition-all ${
                activeStep?.id === step.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <span className="text-xs font-bold opacity-50 mb-1">BƯỚC {index + 1}</span>
              <span className="text-sm font-semibold leading-tight">{step.name}</span>
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                <Info className="w-3 h-3" />
              </div>
            </motion.button>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:flex items-center">
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-8 h-0.5 bg-emerald-300 dark:bg-emerald-800 rounded-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        {activeStep ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xl"
          >
            <h3 className="text-lg font-bold text-emerald-600 mb-2">{activeStep.name}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {activeStep.description}
            </p>
          </motion.div>
        ) : (
          <div className="text-center text-zinc-400 italic">
            Click vào từng công đoạn để xem chi tiết quy trình xử lý
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

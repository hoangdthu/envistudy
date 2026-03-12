import { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function EnvironmentalCalculators() {
  const [activeTab, setActiveTab] = useState('efficiency');

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Công cụ tính toán</h2>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'efficiency', label: 'Hiệu suất (%)' },
          { id: 'hrt', label: 'Thời gian lưu (HRT)' },
          { id: 'load', label: 'Tải lượng' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'efficiency' && <EfficiencyCalculator />}
        {activeTab === 'hrt' && <HRTCalculator />}
        {activeTab === 'load' && <LoadCalculator />}
      </div>
    </div>
  );
}

function EfficiencyCalculator() {
  const [cin, setCin] = useState('');
  const [cout, setCout] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const n = ((parseFloat(cin) - parseFloat(cout)) / parseFloat(cin)) * 100;
    setResult(n.toFixed(2));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Nồng độ đầu vào (Cin)</label>
          <input 
            type="number" 
            value={cin} 
            onChange={e => setCin(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="mg/L"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Nồng độ đầu ra (Cout)</label>
          <input 
            type="number" 
            value={cout} 
            onChange={e => setCout(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="mg/L"
          />
        </div>
      </div>
      <button 
        onClick={calculate}
        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Tính toán <RefreshCw className="w-4 h-4" />
      </button>
      {result && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
          <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Hiệu suất xử lý:</span>
          <div className="text-3xl font-bold text-emerald-600">{result}%</div>
        </div>
      )}
    </div>
  );
}

function HRTCalculator() {
  const [v, setV] = useState('');
  const [q, setQ] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const hrt = parseFloat(v) / parseFloat(q);
    setResult(hrt.toFixed(2));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Thể tích bể (V)</label>
          <input 
            type="number" 
            value={v} 
            onChange={e => setV(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="m3"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Lưu lượng (Q)</label>
          <input 
            type="number" 
            value={q} 
            onChange={e => setQ(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="m3/h"
          />
        </div>
      </div>
      <button 
        onClick={calculate}
        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        Tính toán <RefreshCw className="w-4 h-4" />
      </button>
      {result && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
          <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Thời gian lưu nước:</span>
          <div className="text-3xl font-bold text-emerald-600">{result} giờ</div>
        </div>
      )}
    </div>
  );
}

function LoadCalculator() {
  return <div className="text-center text-zinc-500 py-8">Đang cập nhật công cụ tính tải lượng...</div>;
}

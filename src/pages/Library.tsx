import React, { useState, useRef } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { modules } from '../data/mockData';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Search, 
  Upload, 
  X,
  FileUp,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Library() {
  const { textbooks, addTextbook, deleteTextbook, isDriveConnected, connectDrive, logoutDrive } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTextbooks = textbooks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2">Thư viện Giáo trình</h1>
          <p className="text-zinc-500">Quản lý và truy cập các tài liệu học tập chuyên ngành.</p>
        </div>
        <div className="flex gap-3">
          {!isDriveConnected ? (
            <button
              onClick={connectDrive}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold hover:bg-zinc-50 transition-all shadow-sm"
            >
              <Upload className="w-5 h-5 text-blue-500" /> Kết nối Google Drive
            </button>
          ) : (
            <button
              onClick={logoutDrive}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
            >
              <X className="w-5 h-5" /> Ngắt kết nối Drive
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" /> Thêm giáo trình
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm giáo trình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-3 text-zinc-700 dark:text-zinc-300 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">Tất cả chuyên đề</option>
          {modules.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTextbooks.map((textbook) => (
            <motion.div
              key={textbook.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 relative">
                  <FileText className="w-8 h-8" />
                  {textbook.isDrive && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white dark:border-zinc-900">
                      <Upload className="w-2 h-2" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteTextbook(textbook.id)}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1">{textbook.title}</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
                {modules.find(m => m.id === textbook.category)?.title || 'Chung'}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {textbook.fileSize}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {textbook.uploadDate}
                </div>
              </div>

              <a
                href={textbook.url}
                className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Tải xuống <Download className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTextbooks.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Không tìm thấy giáo trình</h3>
          <p className="text-zinc-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
        </div>
      )}

      <AddTextbookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTextbook}
      />
    </div>
  );
}

function AddTextbookModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(modules[0].id);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    onAdd({
      title,
      category,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      url: URL.createObjectURL(file),
      file: file // Pass the actual file for Drive upload
    });

    setTitle('');
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
      >
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Thêm giáo trình</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tên giáo trình</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Nhập tên giáo trình..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Chuyên đề</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {modules.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tệp tin (PDF, DOCX...)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                file ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file ? (
                <>
                  <FileUp className="w-10 h-10 text-emerald-600" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-zinc-300" />
                  <p className="text-sm font-medium text-zinc-500">Kéo thả hoặc nhấp để chọn tệp</p>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!title || !file}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            Lưu giáo trình
          </button>
        </form>
      </motion.div>
    </div>
  );
}

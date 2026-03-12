import React, { createContext, useContext, useState, useEffect } from 'react';

interface Textbook {
  id: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  url: string;
}

interface LibraryContextType {
  textbooks: Textbook[];
  addTextbook: (textbook: Omit<Textbook, 'id' | 'uploadDate'>) => void;
  deleteTextbook: (id: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [textbooks, setTextbooks] = useState<Textbook[]>(() => {
    const saved = localStorage.getItem('envi-study-library');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: '1',
        title: 'Giáo trình Xử lý Nước thải',
        category: 'wastewater',
        fileName: 'Giao_trinh_XLNT.pdf',
        fileSize: '2.4 MB',
        uploadDate: '2024-03-01',
        url: '#'
      },
      {
        id: '2',
        title: 'Kỹ thuật Kiểm soát Ô nhiễm Không khí',
        category: 'air-pollution',
        fileName: 'Air_Pollution_Control.pdf',
        fileSize: '3.1 MB',
        uploadDate: '2024-03-02',
        url: '#'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('envi-study-library', JSON.stringify(textbooks));
  }, [textbooks]);

  const addTextbook = (data: Omit<Textbook, 'id' | 'uploadDate'>) => {
    const newTextbook: Textbook = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setTextbooks(prev => [newTextbook, ...prev]);
  };

  const deleteTextbook = (id: string) => {
    setTextbooks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <LibraryContext.Provider value={{ textbooks, addTextbook, deleteTextbook }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  return context;
};

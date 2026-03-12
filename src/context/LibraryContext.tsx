import React, { createContext, useContext, useState, useEffect } from 'react';

interface Textbook {
  id: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  url: string;
  isDrive?: boolean;
}

interface LibraryContextType {
  textbooks: Textbook[];
  isDriveConnected: boolean;
  addTextbook: (textbook: Omit<Textbook, 'id' | 'uploadDate'>) => Promise<void>;
  deleteTextbook: (id: string) => void;
  connectDrive: () => Promise<void>;
  logoutDrive: () => Promise<void>;
  refreshDriveFiles: () => Promise<void>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [textbooks, setTextbooks] = useState<Textbook[]>(() => {
    const saved = localStorage.getItem('envi-study-library');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    localStorage.setItem('envi-study-library', JSON.stringify(textbooks));
  }, [textbooks]);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      setIsDriveConnected(data.isAuthenticated);
      if (data.isAuthenticated) {
        refreshDriveFiles();
      }
    } catch (e) {
      console.error('Auth check failed', e);
    }
  };

  const refreshDriveFiles = async () => {
    try {
      const res = await fetch('/api/drive/files');
      if (!res.ok) return;
      const files = await res.json();
      
      const driveTextbooks: Textbook[] = files.map((f: any) => ({
        id: f.id,
        title: f.name,
        category: 'general', // Default or extracted from metadata
        fileName: f.name,
        fileSize: f.size ? (parseInt(f.size) / (1024 * 1024)).toFixed(1) + ' MB' : 'N/A',
        uploadDate: f.createdTime.split('T')[0],
        url: f.webViewLink,
        isDrive: true
      }));

      setTextbooks(prev => {
        const localOnly = prev.filter(t => !t.isDrive);
        return [...localOnly, ...driveTextbooks];
      });
    } catch (e) {
      console.error('Refresh drive failed', e);
    }
  };

  const connectDrive = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      const { url } = await res.json();
      const authWindow = window.open(url, 'google_auth', 'width=600,height=700');
      
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          setIsDriveConnected(true);
          refreshDriveFiles();
          window.removeEventListener('message', handleMessage);
        }
      };
      window.addEventListener('message', handleMessage);
    } catch (e) {
      console.error('Connect drive failed', e);
    }
  };

  const logoutDrive = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsDriveConnected(false);
    setTextbooks(prev => prev.filter(t => !t.isDrive));
  };

  const addTextbook = async (data: any) => {
    if (isDriveConnected && data.file) {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);
      
      const res = await fetch('/api/drive/upload', {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        refreshDriveFiles();
        return;
      }
    }

    // Fallback to local
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
    <LibraryContext.Provider value={{ 
      textbooks, 
      isDriveConnected, 
      addTextbook, 
      deleteTextbook, 
      connectDrive, 
      logoutDrive,
      refreshDriveFiles
    }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  return context;
};

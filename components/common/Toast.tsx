'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Bell } from 'lucide-react';

export interface ToastEvent {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

class ToastService {
  listeners: ((toast: ToastEvent) => void)[] = [];
  
  subscribe(listener: (toast: ToastEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(type: 'success' | 'error' | 'info', message: string) {
    const event: ToastEvent = { id: Date.now().toString(), type, message };
    this.listeners.forEach(l => l(event));
  }
}

export const toastService = new ToastService();

export const ToastProvider: React.FC = () => {
  const [toasts, setToasts] = useState<ToastEvent[]>([]);

  useEffect(() => {
    const unsubscribe = toastService.subscribe((toast) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 5000);
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(toast => (
        <div key={toast.id} className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl p-3 max-w-sm animate-in slide-in-from-right-4 fade-in duration-300">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
          {toast.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
          <div className="flex-1 text-sm text-slate-800 dark:text-slate-200">{toast.message}</div>
          <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

import React, { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

type SqlEditorProps = {
  initialValue: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  isRunning: boolean;
};

export function SqlEditor({ initialValue, onChange, onRun, isRunning }: SqlEditorProps) {
  const editorRef = useRef<any>(null);
  const [copied, setCopied] = React.useState(false);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Define custom theme if needed
    monaco.editor.defineTheme('sql-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e293b',
      },
    });
  };

  const handleCopy = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.getValue());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(initialValue);
      onChange(initialValue);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700 shadow-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
            <span className="material-symbols-outlined text-[14px] mr-1">code</span>
            script.sql
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="Copiar código"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
          <button 
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="Resetar código"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="sql"
          defaultValue={initialValue}
          theme="vs-dark" // Using standard dark theme for simplicity
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
        
        {/* Run Button (Floating) */}
        <div className="absolute bottom-6 right-6 z-10">
          <button 
            onClick={onRun}
            disabled={isRunning}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform active:scale-95",
              isRunning 
                ? "bg-slate-600 text-slate-300 cursor-wait" 
                : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/30"
            )}
          >
            {isRunning ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            ) : (
              <Play size={20} fill="currentColor" />
            )}
            <span>{isRunning ? 'EXECUTANDO...' : 'EXECUTAR QUERY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

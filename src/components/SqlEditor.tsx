import React, { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check, FileCode2, Loader2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';

type SqlEditorProps = {
  initialValue: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  isRunning: boolean;
};

export function SqlEditor({ initialValue, onChange, onRun, isRunning }: SqlEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [copied, setCopied] = React.useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme('sql-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e293b',
      },
    });

    monaco.editor.defineTheme('sql-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
      },
    });

    monaco.editor.setTheme(isDark ? 'sql-dark' : 'sql-light');
  };

  React.useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(isDark ? 'sql-dark' : 'sql-light');
    }
  }, [isDark]);

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
    <div className="flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700">
            <FileCode2 size={13} className="mr-1.5 text-violet-500 dark:text-violet-400" />
            script.sql
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Copiar código"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
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
          theme={isDark ? 'vs-dark' : 'vs'}
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
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all transform active:scale-95",
              isRunning
                ? "bg-slate-600 text-slate-300 cursor-wait"
                : "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white hover:shadow-violet-500/30 shadow-violet-500/20"
            )}
          >
            {isRunning ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Play size={18} fill="currentColor" />
            )}
            <span>{isRunning ? 'EXECUTANDO...' : 'EXECUTAR'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

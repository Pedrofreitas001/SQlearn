import React from 'react';
import clsx from 'clsx';
import { Table as TableIcon, AlertCircle, Database } from 'lucide-react';

type ResultTableProps = {
  data: any[] | null;
  error: string | null;
  loading: boolean;
};

export function ResultTable({ data, error, loading }: ResultTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-200 border-t-violet-600"></div>
          <span className="text-xs text-slate-400">Executando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800 mb-3">
          <AlertCircle size={32} className="text-red-400 mx-auto" />
        </div>
        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Erro na Execução</h3>
        <p className="text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800 font-mono text-red-600 dark:text-red-300 max-w-md">
          {error}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
        <Database size={36} className="mb-3 opacity-40" />
        <p className="text-sm">Execute uma query para ver os resultados aqui.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <TableIcon size={15} className="text-violet-500" />
          <span>Resultado</span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
          {data.length} {data.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2.5 font-semibold text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700 w-10 text-center bg-slate-50 dark:bg-slate-800 text-xs">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 font-bold text-violet-600 dark:text-violet-400 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-violet-50/30 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-2.5 text-slate-400 font-mono text-xs text-center border-r border-slate-100 dark:border-slate-800">
                  {i + 1}
                </td>
                {columns.map((col) => (
                  <td key={`${i}-${col}`} className="px-4 py-2.5 text-slate-700 dark:text-slate-300 font-mono text-xs">
                    {row[col] === null ? <span className="text-slate-300 dark:text-slate-600 italic">NULL</span> : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

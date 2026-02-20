import React from 'react';
import clsx from 'clsx';
import { Table as TableIcon, AlertCircle } from 'lucide-react';

type ResultTableProps = {
  data: any[] | null;
  error: string | null;
  loading: boolean;
};

export function ResultTable({ data, error, loading }: ResultTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center">
        <AlertCircle size={48} className="mb-4" />
        <h3 className="text-lg font-bold mb-2">Erro na Execução</h3>
        <p className="text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 font-mono">
          {error}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
        <TableIcon size={48} className="mb-4 opacity-50" />
        <p>Execute uma query para ver os resultados aqui.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <TableIcon size={16} />
          <span>Resultado da Query</span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {data.length} registros retornados
        </span>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 w-12 text-center bg-slate-50 dark:bg-slate-800">
                #
              </th>
              {columns.map((col) => (
                <th 
                  key={col} 
                  className="px-6 py-3 font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-3 text-slate-400 font-mono text-xs text-center border-r border-slate-100 dark:border-slate-800">
                  {i + 1}
                </td>
                {columns.map((col) => (
                  <td key={`${i}-${col}`} className="px-6 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">
                    {row[col] === null ? <span className="text-slate-400 italic">NULL</span> : String(row[col])}
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

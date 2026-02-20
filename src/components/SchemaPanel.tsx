import React, { useState } from 'react';
import { getTableSchema } from '@/lib/db';
import { Database, ChevronDown, ChevronRight, Table2 } from 'lucide-react';
import clsx from 'clsx';

const TABLE_RELATIONS: Record<string, string> = {
  clientes: '',
  produtos: '',
  pedidos: 'cliente_id → clientes.id',
  itens_pedido: 'pedido_id → pedidos.id, produto_id → produtos.id',
  funcionarios: '',
};

const COLUMN_TYPES: Record<string, Record<string, string>> = {
  clientes:     { id: 'INT PK', nome: 'TEXT', email: 'TEXT', cidade: 'TEXT', estado: 'TEXT', data_cadastro: 'DATE' },
  produtos:     { id: 'INT PK', nome: 'TEXT', categoria: 'TEXT', preco: 'DECIMAL', estoque: 'INT' },
  pedidos:      { id: 'INT PK', cliente_id: 'INT FK', data_pedido: 'DATE', valor_total: 'DECIMAL', status: 'TEXT' },
  itens_pedido: { id: 'INT PK', pedido_id: 'INT FK', produto_id: 'INT FK', quantidade: 'INT', preco_unitario: 'DECIMAL' },
  funcionarios: { id: 'INT PK', nome: 'TEXT', departamento: 'TEXT', cargo: 'TEXT', salario: 'DECIMAL', data_contratacao: 'DATE' },
};

export function SchemaPanel() {
  const tables = getTableSchema();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <Database size={16} className="text-blue-500" />
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Banco de Dados</h3>
        <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold">TechRetail</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {tables.map(table => {
          const isOpen = expanded[table.name];
          const relation = TABLE_RELATIONS[table.name];
          const types = COLUMN_TYPES[table.name] || {};

          return (
            <div key={table.name}>
              <button
                onClick={() => toggle(table.name)}
                className={clsx(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-sm",
                  isOpen
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                )}
              >
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <Table2 size={14} className="text-slate-400 dark:text-slate-500" />
                <span className="font-mono font-semibold text-xs">{table.name}</span>
                <span className="ml-auto text-[10px] text-slate-400">{table.columns.length} cols</span>
              </button>

              {isOpen && (
                <div className="ml-5 pl-4 border-l-2 border-slate-100 dark:border-slate-700 mt-1 mb-2 space-y-0.5">
                  {table.columns.map(col => (
                    <div key={col} className="flex items-center gap-2 px-2 py-1 text-xs">
                      <span className="font-mono text-slate-700 dark:text-slate-300">{col}</span>
                      <span className={clsx(
                        "text-[10px] px-1 py-0.5 rounded font-medium",
                        types[col]?.includes('PK')
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : types[col]?.includes('FK')
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      )}>
                        {types[col] || 'TEXT'}
                      </span>
                    </div>
                  ))}
                  {relation && (
                    <div className="px-2 py-1 text-[10px] text-purple-500 dark:text-purple-400 font-medium mt-1">
                      {relation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Clique em uma tabela para ver suas colunas. <strong>PK</strong> = chave primária, <strong>FK</strong> = chave estrangeira.
        </p>
      </div>
    </div>
  );
}

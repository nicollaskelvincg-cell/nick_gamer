/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Smartphone, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Gamepad2, 
  Zap,
  Dna,
  Share2,
  Calendar,
  LayoutDashboard,
  FileText,
  LineChart as LineChartIcon,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { DASHBOARD_METRICS, type DashboardData, type Year } from './constants';
import { cn } from './lib/utils';

interface MetricCardProps {
  data: DashboardData;
  index: number;
  selectedYear: Year;
  key?: string | number;
}

const MetricCard = ({ data, index, selectedYear }: MetricCardProps) => {
  const isPositive = data.variation.startsWith('+');
  const Icon = data.category === 'Revenue' ? Globe : 
               data.category === 'Technology' ? Cpu : 
               data.category === 'Demographics' ? Users : 
               Gamepad2;

  const displayValue = selectedYear === '2025' ? data.data2025 : 
                      selectedYear === '2026' ? data.projection2026 :
                      data.projection2026; 

  const baseValue = data.data2025;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-dashboard-card border border-dashboard-border p-6 rounded-2xl hover:border-dashboard-accent/50 transition-all group overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-dashboard-accent/10 transition-colors">
          <Icon className="text-zinc-400 group-hover:text-dashboard-accent transition-colors" size={20} />
        </div>
        {selectedYear !== '2025' && (
          <div className={cn(
            "px-2 py-1 rounded-md text-[10px] font-mono tracking-wider flex items-center gap-1 uppercase",
            isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {data.variation}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-zinc-500 text-sm font-medium">{data.metric}</h3>
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            <motion.span 
              key={selectedYear}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-2xl font-display font-bold text-zinc-100"
            >
              {displayValue}
              {typeof displayValue === 'number' && data.metric.includes('Receita') ? 'B' : ''}
              {(data.metric.includes('%') || data.metric.includes('Plataforma')) && typeof displayValue === 'number' ? '%' : ''}
            </motion.span>
          </AnimatePresence>
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            {selectedYear === 'Comparativo' ? '/ ALVO 2026' : `/ ${selectedYear}`}
          </span>
        </div>
      </div>

      {selectedYear === 'Comparativo' && (
        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
           <div className="flex justify-between items-center">
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono italic">2025</span>
            <span className="text-[10px] font-semibold text-zinc-500">{baseValue}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="bg-dashboard-accent h-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [selectedYear, setSelectedYear] = useState<Year>('Comparativo');

  const chartData = DASHBOARD_METRICS
    .filter(m => (m.category === 'Revenue' || m.metric === 'Base de Jogadores') && typeof m.data2025 === 'number')
    .map(m => ({
      name: m.metric.replace('Receita ', '').replace('Base de ', ''),
      '2025': m.data2025,
      '2026': m.projection2026,
    }));

  return (
    <div className="min-h-screen pb-20 selection:bg-dashboard-accent selection:text-black">
      {/* Header */}
      <header className="border-b border-dashboard-border bg-dashboard-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dashboard-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-none tracking-tight">GAMEMARKET</h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">Insights Estratégicos</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-dashboard-accent flex items-center gap-2">
              <LayoutDashboard size={14} /> Panorama Geral
            </a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2">
              <FileText size={14} /> Relatórios
            </a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2">
              <LineChartIcon size={14} /> Projeções
            </a>
          </nav>

          <button className="bg-zinc-100 text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-dashboard-accent transition-colors flex items-center gap-2">
            <Share2 size={14} /> EXPORTAR
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        {/* Intro & Year Selection */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dashboard-accent-muted text-dashboard-accent border border-dashboard-accent/20 text-[10px] font-mono tracking-widest uppercase mb-2">
              <Calendar size={12} /> Dashboard Dinâmico
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-[0.9] tracking-tighter">
              Acompanhamento de <span className="text-dashboard-accent italic">Performance Setorial</span>.
            </h2>
          </div>

          <div className="w-full lg:w-auto flex flex-col items-end gap-3">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest pr-2">Selecione o Ciclo de Dados</p>
            <div className="p-1.5 bg-dashboard-card border border-dashboard-border rounded-2xl flex gap-1 w-full lg:w-auto">
              {(['2025', '2026', 'Comparativo'] as Year[]).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "px-6 py-2 rounded-xl text-xs font-bold transition-all flex-1 lg:flex-none uppercase tracking-widest",
                    selectedYear === year 
                      ? "bg-dashboard-accent text-black shadow-lg" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Global Key Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DASHBOARD_METRICS.slice(0, 4).map((metric, idx) => (
            <MetricCard key={metric.metric} data={metric} index={idx} selectedYear={selectedYear} />
          ))}
        </section>

        {/* Chart Visualization */}
        <section className="bg-dashboard-card border border-dashboard-border rounded-2xl p-8 space-y-8 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-display font-bold">Gráfico de Crescimento do Mercado</h3>
              <p className="text-xs text-zinc-500 font-serif italic uppercase tracking-wider">Comparativo Volumétrico (USD Billions & Milhões de Jogadores)</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-zinc-700" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Base 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-dashboard-accent" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Projeção 2026</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              {selectedYear === 'Comparativo' ? (
                <BarChart data={chartData} barGap={12}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      borderColor: '#27272a', 
                      borderRadius: '16px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="2025" fill="#3f3f46" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2026" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                     contentStyle={{ 
                      backgroundColor: '#18181b', 
                      borderColor: '#27272a', 
                      borderRadius: '16px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={selectedYear} 
                    stroke="#10b981" 
                    fill="url(#colorFill)" 
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>

        {/* Dynamic Detail List */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Trends Table */}
          <div className="bg-dashboard-card border border-dashboard-border rounded-2xl overflow-hidden p-6 space-y-6">
            <h3 className="text-lg font-display font-bold px-2">Detalhamento por Métrica</h3>
            <div className="space-y-2">
              {DASHBOARD_METRICS.slice(4).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-dashboard-border group">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-dashboard-accent group-hover:bg-dashboard-accent/10 transition-colors">
                        <Zap size={14} />
                     </div>
                     <span className="text-sm font-medium text-zinc-300">{item.metric}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Valor</div>
                       <div className="text-sm font-bold text-zinc-100">{selectedYear === '2025' ? item.data2025 : item.projection2026}</div>
                    </div>
                    {selectedYear !== '2025' && (
                       <div className={cn(
                        "font-mono text-[10px] px-2 py-0.5 rounded border-l-2",
                        item.variation.startsWith('+') ? "text-emerald-400 border-emerald-500 bg-emerald-500/5" : "text-rose-400 border-rose-500 bg-rose-500/5"
                      )}>
                        {item.variation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insight */}
          <div className="space-y-6">
             <div className="bg-dashboard-accent text-black rounded-2xl p-8 space-y-4 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                <Dna size={32} />
                <h3 className="text-2xl font-display font-bold leading-none tracking-tighter">Insights de {selectedYear}</h3>
                <p className="font-medium text-black/80 text-lg">
                  {selectedYear === '2025' 
                    ? "Ano de consolidação estrutural. Foco em retenção de usuários e monetização agressiva em plataformas móveis."
                    : selectedYear === '2026'
                    ? "Expansão massiva via IA. Novos paradigmas de interação reduzem o atrito de entrada para jogadores casuais no Brasil."
                    : "A curva comparativa indica um crescimento sólido de +15% em média nas áreas de tecnologia e assinaturas."}
                </p>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 mt-4">
                  Ver Relatório Completo <ChevronRight size={14} />
                </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-dashboard-card border border-dashboard-border p-6 rounded-2xl">
                   <ShieldCheck className="text-emerald-500 mb-3" size={20} />
                   <div className="text-2xl font-display font-bold">Resiliência</div>
                   <p className="text-[10px] text-zinc-500 mt-2">ALTA CAPACIDADE DE ADAPTAÇÃO ECONÔMICA</p>
                </div>
                <div className="bg-dashboard-card border border-dashboard-border p-6 rounded-2xl">
                   <Users className="text-emerald-500 mb-3" size={20} />
                   <div className="text-2xl font-display font-bold">+10M</div>
                   <p className="text-[10px] text-zinc-500 mt-2">NOVOS USUÁRIOS ÚNICOS NO CICLO FINAL</p>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-dashboard-border flex flex-col md:flex-row justify-between gap-8 items-start">
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-dashboard-accent" size={20} />
            <span className="text-sm font-display font-bold tracking-tighter uppercase">GameMarket Analytics</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-mono">
            Plataforma de inteligência proprietária focada em dados macroeconômicos do setor de entretenimento digital.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-zinc-500">
          <div className="space-y-2">
             <div className="text-[10px] font-mono uppercase tracking-widest">Ano Atual</div>
             <div className="text-xs font-bold">2026 PROJETADO</div>
          </div>
          <div className="space-y-2">
             <div className="text-[10px] font-mono uppercase tracking-widest">Localidade</div>
             <div className="text-xs font-bold">GLOBAL / BRASIL</div>
          </div>
          <div className="space-y-2 text-right">
             <div className="text-[10px] font-mono uppercase tracking-widest italic text-emerald-500">Sincronizado</div>
             <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Online</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

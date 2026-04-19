export type Year = '2025' | '2026' | 'Comparativo';

export interface DashboardData {
  metric: string;
  data2025: string | number;
  projection2026: string | number;
  variation: string;
  category: 'Revenue' | 'Growth' | 'Technology' | 'Demographics';
}

export const DASHBOARD_METRICS: DashboardData[] = [
  {
    metric: "Receita Global",
    data2025: 195.6,
    projection2026: 205,
    variation: "+5%",
    category: 'Revenue'
  },
  {
    metric: "Receita Brasil",
    data2025: 2.6,
    projection2026: 2.8,
    variation: "+8%",
    category: 'Revenue'
  },
  {
    metric: "Penetração Gamer Brasil",
    data2025: 82.8,
    projection2026: 75.3,
    variation: "-9%",
    category: 'Demographics'
  },
  {
    metric: "Base de Jogadores",
    data2025: 100,
    projection2026: 104,
    variation: "+4%",
    category: 'Demographics'
  },
  {
    metric: "Plataforma Mobile",
    data2025: 48,
    projection2026: 50,
    variation: "+2%",
    category: 'Technology'
  },
  {
    metric: "Gen Z participação",
    data2025: 36.5,
    projection2026: 40,
    variation: "+9%",
    category: 'Demographics'
  },
  {
    metric: "Assinaturas",
    data2025: "Alta",
    projection2026: "Crescimento forte",
    variation: "+15%",
    category: 'Growth'
  },
  {
    metric: "IA nos jogos",
    data2025: "Baixa",
    projection2026: "Adoção massiva",
    variation: "+30%",
    category: 'Technology'
  },
  {
    metric: "VR/AR",
    data2025: "Nicho",
    projection2026: "Crescimento",
    variation: "+20%",
    category: 'Technology'
  },
  {
    metric: "eSports",
    data2025: "Alta",
    projection2026: "Expansão",
    variation: "+12%",
    category: 'Growth'
  },
  {
    metric: "Publicidade in-game",
    data2025: "Alta",
    projection2026: "Muito alta",
    variation: "+15%",
    category: 'Revenue'
  }
];

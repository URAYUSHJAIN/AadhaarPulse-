// Analytics data types
export interface AnalyticsSummary {
  totalDistricts: number;
  totalAuthentications: number;
  anomalyCount: number;
  avgQDI: number;
  criticalSurge: number;
  elevatedSurge: number;
  normalSurge: number;
  needsAudit: number;
  highLoad: number;
  moderateLoad: number;
  optimalLoad: number;
  criticalPriority: number;
  highPriority: number;
  mediumPriority: number;
}

export interface QDIStats {
  critical: number;
  concern: number;
  watch: number;
  good: number;
}

export interface TopAnomaly {
  state: string;
  district: string;
  severity: number;
  totalAuth: number;
}

export interface TopSurge {
  state: string;
  district: string;
  surgeScore: number;
  avgDemand: number;
  peakDemand: number;
  growthRate: number;
}

export interface StateData {
  state: string;
  totalAuth: number;
  districts: number;
  anomalies: number;
  avgQDI: number;
  criticalSurge: number;
}

export interface MonthlyTrend {
  month: string;
  demand: number;
  predicted: number;
}

export interface AnomalyByState {
  state: string;
  count: number;
}

export interface AttentionDistrict {
  state: string;
  district: string;
  priorityScore: number;
  priorityLevel: string;
  surgeLevel: string;
  qdiStatus: string;
  loadStatus: string;
  recommendation: string;
}

export interface PolicyBrief {
  id: number;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  icon: string;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  qdiStats: QDIStats;
  topAnomalies: TopAnomaly[];
  topSurge: TopSurge[];
  stateData: StateData[];
  monthlyTrend: MonthlyTrend[];
  anomalyByState: AnomalyByState[];
  attentionDistricts: AttentionDistrict[];
  policyBriefs: PolicyBrief[];
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format percentage
export function formatPercent(num: number): string {
  return num.toFixed(1) + '%';
}

// Get severity color
export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500';
    case 'high':
    case 'warning':
      return 'text-orange-500';
    case 'medium':
    case 'elevated':
      return 'text-yellow-500';
    case 'info':
    case 'normal':
      return 'text-blue-500';
    default:
      return 'text-green-500';
  }
}

// Get severity background
export function getSeverityBg(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/10 border-red-500/20';
    case 'high':
    case 'warning':
      return 'bg-orange-500/10 border-orange-500/20';
    case 'medium':
    case 'elevated':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'info':
    case 'normal':
      return 'bg-blue-500/10 border-blue-500/20';
    default:
      return 'bg-green-500/10 border-green-500/20';
  }
}

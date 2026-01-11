import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface GovernanceRecord {
  state: string;
  district: string;
  total_auth_sum: number;
  is_anomaly: number;
  anomaly_severity: number;
  QDI: number;
  qdi_status: string;
  needs_audit: number;
  bio_ratio: number;
  demo_ratio: number;
  DLI: number;
  load_status: string;
  recommendation: string;
  load_ratio: number;
  surge_score: number;
  surge_level: string;
  priority_score: number;
  priority_level: string;
}

interface SurgeRecord {
  state: string;
  district: string;
  avg_demand: number;
  demand_std: number;
  peak_demand: number;
  avg_growth_rate: number;
  demand_z_score: number;
  surge_score: number;
  surge_level: string;
}

interface AnomalyRecord {
  state: string;
  district: string;
  total_auth_sum: number;
  is_anomaly: number;
  anomaly_severity: number;
  anomaly_score: number;
}

function parseCSV<T>(content: string): T[] {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const record: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      // Try to parse as number
      const numValue = parseFloat(value);
      record[header.trim()] = isNaN(numValue) ? value : numValue;
    });
    
    return record as T;
  });
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    // Read all CSV files
    const [governanceCSV, surgeCSV, anomalyCSV, qdiCSV, dliCSV] = await Promise.all([
      fs.readFile(path.join(dataDir, 'governance_dashboard.csv'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'demand_surge_analysis.csv'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'district_anomaly_analysis.csv'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'quality_drift_index.csv'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'district_load_index.csv'), 'utf-8'),
    ]);

    // Parse CSV data
    const governance = parseCSV<GovernanceRecord>(governanceCSV);
    const surge = parseCSV<SurgeRecord>(surgeCSV);
    const anomaly = parseCSV<AnomalyRecord>(anomalyCSV);
    const qdi = parseCSV<Record<string, string | number>>(qdiCSV);
    const dli = parseCSV<Record<string, string | number>>(dliCSV);

    // Calculate summary metrics
    const totalDistricts = governance.length;
    const totalAuthentications = governance.reduce((sum, r) => sum + (r.total_auth_sum || 0), 0);
    const anomalyCount = anomaly.filter(r => r.is_anomaly === 1 || r.is_anomaly === -1).length;
    const avgQDI = governance.reduce((sum, r) => sum + (r.QDI || 0), 0) / totalDistricts;
    
    // Surge level counts
    const criticalSurge = surge.filter(r => r.surge_level === 'Critical').length;
    const elevatedSurge = surge.filter(r => r.surge_level === 'Elevated').length;
    const normalSurge = surge.filter(r => r.surge_level === 'Normal' || r.surge_level === 'Low').length;
    
    // QDI status counts
    const qdiCritical = qdi.filter(r => r.qdi_status === 'Critical').length;
    const qdiConcern = qdi.filter(r => r.qdi_status === 'Concern').length;
    const qdiWatch = qdi.filter(r => r.qdi_status === 'Watch').length;
    const qdiGood = qdi.filter(r => r.qdi_status === 'Good').length;
    const needsAudit = qdi.filter(r => r.needs_audit === 1).length;
    
    // Load status counts
    const highLoad = dli.filter(r => r.load_status === 'High').length;
    const moderateLoad = dli.filter(r => r.load_status === 'Moderate').length;
    const optimalLoad = dli.filter(r => r.load_status === 'Optimal').length;
    
    // Priority level counts
    const criticalPriority = governance.filter(r => r.priority_level === 'Critical').length;
    const highPriority = governance.filter(r => r.priority_level === 'High').length;
    const mediumPriority = governance.filter(r => r.priority_level === 'Medium').length;
    
    // Top anomalous districts
    const topAnomalies = anomaly
      .filter(r => r.is_anomaly === 1 || r.is_anomaly === -1)
      .sort((a, b) => b.anomaly_severity - a.anomaly_severity)
      .slice(0, 10)
      .map(r => ({
        state: r.state,
        district: r.district,
        severity: r.anomaly_severity,
        totalAuth: r.total_auth_sum,
      }));
    
    // Top surge districts
    const topSurge = surge
      .filter(r => r.surge_level === 'Critical')
      .sort((a, b) => b.surge_score - a.surge_score)
      .slice(0, 10)
      .map(r => ({
        state: r.state,
        district: r.district,
        surgeScore: r.surge_score,
        avgDemand: r.avg_demand,
        peakDemand: r.peak_demand,
        growthRate: r.avg_growth_rate,
      }));
    
    // State-wise aggregation
    const stateStats = governance.reduce((acc, r) => {
      const state = r.state;
      if (!acc[state]) {
        acc[state] = {
          state,
          totalAuth: 0,
          districts: 0,
          anomalies: 0,
          avgQDI: 0,
          criticalSurge: 0,
        };
      }
      acc[state].totalAuth += r.total_auth_sum || 0;
      acc[state].districts += 1;
      acc[state].anomalies += r.is_anomaly ? 1 : 0;
      acc[state].avgQDI += r.QDI || 0;
      return acc;
    }, {} as Record<string, { state: string; totalAuth: number; districts: number; anomalies: number; avgQDI: number; criticalSurge: number }>);
    
    // Calculate averages and sort by total auth
    const stateData = Object.values(stateStats)
      .map(s => ({
        ...s,
        avgQDI: s.avgQDI / s.districts,
      }))
      .sort((a, b) => b.totalAuth - a.totalAuth)
      .slice(0, 15);
    
    // Monthly trend data (simulated based on the data pattern)
    const monthlyTrend = [
      { month: 'Mar', demand: 280000, predicted: 275000 },
      { month: 'Apr', demand: 320000, predicted: 315000 },
      { month: 'May', demand: 380000, predicted: 370000 },
      { month: 'Jun', demand: 420000, predicted: 410000 },
      { month: 'Jul', demand: 480000, predicted: 465000 },
      { month: 'Aug', demand: 520000, predicted: 510000 },
      { month: 'Sep', demand: 580000, predicted: 570000 },
      { month: 'Oct', demand: 640000, predicted: 625000 },
      { month: 'Nov', demand: 700000, predicted: 690000 },
      { month: 'Dec', demand: 750000, predicted: 745000 },
    ];

    // Anomaly trend by state
    const anomalyByState = Object.entries(
      anomaly.reduce((acc, r) => {
        if (r.is_anomaly === 1 || r.is_anomaly === -1) {
          acc[r.state] = (acc[r.state] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([state, count]) => ({ state: state.length > 12 ? state.slice(0, 12) + '...' : state, count }));

    // Districts needing attention
    const attentionDistricts = governance
      .filter(r => r.priority_level === 'Critical' || r.priority_level === 'High')
      .sort((a, b) => b.priority_score - a.priority_score)
      .slice(0, 15)
      .map(r => ({
        state: r.state,
        district: r.district,
        priorityScore: r.priority_score,
        priorityLevel: r.priority_level,
        surgeLevel: r.surge_level,
        qdiStatus: r.qdi_status,
        loadStatus: r.load_status,
        recommendation: r.recommendation,
      }));

    // Policy briefs
    const policyBriefs = [
      {
        id: 1,
        title: 'Critical Surge Alert',
        description: `${criticalSurge} districts experiencing critical demand surge requiring immediate capacity expansion`,
        severity: 'critical',
        icon: 'alert',
      },
      {
        id: 2,
        title: 'Quality Drift Warning',
        description: `${needsAudit} districts need technical audit due to unusual biometric/demographic ratios`,
        severity: 'warning',
        icon: 'quality',
      },
      {
        id: 3,
        title: 'Anomaly Detection',
        description: `${anomalyCount} districts flagged by ML model with behavioral anomalies`,
        severity: 'info',
        icon: 'anomaly',
      },
      {
        id: 4,
        title: 'High Load Districts',
        description: `${highLoad} districts under high load, ${moderateLoad} moderate - resource reallocation recommended`,
        severity: 'warning',
        icon: 'load',
      },
      {
        id: 5,
        title: 'Priority Action Required',
        description: `${criticalPriority} critical and ${highPriority} high priority districts need immediate intervention`,
        severity: 'critical',
        icon: 'priority',
      },
    ];

    return NextResponse.json({
      summary: {
        totalDistricts,
        totalAuthentications,
        anomalyCount,
        avgQDI: parseFloat(avgQDI.toFixed(2)),
        criticalSurge,
        elevatedSurge,
        normalSurge,
        needsAudit,
        highLoad,
        moderateLoad,
        optimalLoad,
        criticalPriority,
        highPriority,
        mediumPriority,
      },
      qdiStats: {
        critical: qdiCritical,
        concern: qdiConcern,
        watch: qdiWatch,
        good: qdiGood,
      },
      topAnomalies,
      topSurge,
      stateData,
      monthlyTrend,
      anomalyByState,
      attentionDistricts,
      policyBriefs,
    });
  } catch (error) {
    console.error('Error loading analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to load analytics data' },
      { status: 500 }
    );
  }
}

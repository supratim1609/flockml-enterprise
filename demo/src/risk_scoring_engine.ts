import { AssetRecord, VulnerabilityRecord, FindingRecord } from './dataset_loader.js';

export interface ScoredAsset {
  rank: number;
  asset: AssetRecord;
  compositeScore: number;
  scoreBreakdown: {
    cvssContribution: number;
    criticalityContribution: number;
    internetExposureContribution: number;
    exploitAvailabilityContribution: number;
    slaOverdueContribution: number;
  };
  associatedFindings: Array<{
    finding: FindingRecord;
    vulnerability: VulnerabilityRecord;
  }>;
  riskTier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: string;
}

export class RiskScoringEngine {
  private assets: Map<string, AssetRecord> = new Map();
  private vulnerabilities: Map<string, VulnerabilityRecord> = new Map();
  private findings: FindingRecord[] = [];
  private referenceDate: Date = new Date('2026-09-08');

  constructor(data: { assets: AssetRecord[]; vulnerabilities: VulnerabilityRecord[]; findings: FindingRecord[] }) {
    for (const a of data.assets) this.assets.set(a.asset_id, a);
    for (const v of data.vulnerabilities) this.vulnerabilities.set(v.cve_id, v);
    this.findings = data.findings;
  }

  public computeRiskScores(): ScoredAsset[] {
    const scoredList: ScoredAsset[] = [];

    for (const [assetId, asset] of this.assets.entries()) {
      const assetFindings = this.findings.filter(f => f.asset_id === assetId && f.status === 'OPEN');
      if (assetFindings.length === 0) continue;

      const findingDetails = assetFindings.map(f => ({
        finding: f,
        vulnerability: this.vulnerabilities.get(f.cve_id) || {
          cve_id: f.cve_id,
          severity: 'LOW',
          cvss_score: 0.0,
          description: 'Unknown',
          affected_product: 'Unknown',
          exploit_available: false,
          published_date: 'Unknown'
        }
      }));

      // 1. Severity contribution: Max CVSS * 4.0 (0 to 40.0 pts)
      const maxCvss = Math.max(...findingDetails.map(d => d.vulnerability.cvss_score), 0);
      const cvssContribution = parseFloat((maxCvss * 4.0).toFixed(1));

      // 2. Asset criticality contribution (0 to 25.0 pts)
      let criticalityContribution = 2.0;
      if (asset.criticality === 'CRITICAL') criticalityContribution = 25.0;
      else if (asset.criticality === 'HIGH') criticalityContribution = 16.0;
      else if (asset.criticality === 'MEDIUM') criticalityContribution = 8.0;

      // 3. Internet exposure contribution (0 or 15.0 pts)
      const internetExposureContribution = asset.internet_exposed ? 15.0 : 0.0;

      // 4. Exploit availability contribution (0 or 10.0 pts)
      const hasExploit = findingDetails.some(d => d.vulnerability.exploit_available);
      const exploitAvailabilityContribution = hasExploit ? 10.0 : 0.0;

      // 5. Remediation age / SLA overdue contribution (0 to 10.0 pts)
      let slaOverdueContribution = 0.0;
      for (const d of findingDetails) {
        const deadline = new Date(d.finding.remediation_deadline);
        const diffDays = Math.floor((this.referenceDate.getTime() - deadline.getTime()) / (1000 * 3600 * 24));
        if (diffDays > 30) {
          slaOverdueContribution = 10.0;
          break;
        } else if (diffDays > 0) {
          slaOverdueContribution = Math.max(slaOverdueContribution, 5.0);
        }
      }

      const compositeScore = parseFloat((
        cvssContribution +
        criticalityContribution +
        internetExposureContribution +
        exploitAvailabilityContribution +
        slaOverdueContribution
      ).toFixed(1));

      let riskTier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
      if (compositeScore >= 80.0) riskTier = 'CRITICAL';
      else if (compositeScore >= 60.0) riskTier = 'HIGH';
      else if (compositeScore >= 40.0) riskTier = 'MEDIUM';

      let recommendedAction = 'Schedule patching in standard maintenance cycle.';
      if (riskTier === 'CRITICAL') {
        recommendedAction = asset.internet_exposed
          ? 'Emergency Patching SLA (<48 hrs): Isolate external interface and patch public-facing vulnerability immediately.'
          : 'Priority Maintenance Window (<5 days): Apply vendor patch and audit lateral network access rules.';
      } else if (riskTier === 'HIGH') {
        recommendedAction = 'Targeted Remediation (<14 days): Schedule maintenance window and verify service segmentation.';
      }

      scoredList.push({
        rank: 0, // will assign after sort
        asset,
        compositeScore,
        scoreBreakdown: {
          cvssContribution,
          criticalityContribution,
          internetExposureContribution,
          exploitAvailabilityContribution,
          slaOverdueContribution
        },
        associatedFindings: findingDetails,
        riskTier,
        recommendedAction
      });
    }

    // Sort descending by composite score, then by max CVSS
    scoredList.sort((a, b) => {
      if (b.compositeScore !== a.compositeScore) {
        return b.compositeScore - a.compositeScore;
      }
      return b.scoreBreakdown.cvssContribution - a.scoreBreakdown.cvssContribution;
    });

    // Assign 1-indexed ranks
    scoredList.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return scoredList;
  }

  public getTopAssets(limit: number = 10): ScoredAsset[] {
    return this.computeRiskScores().slice(0, limit);
  }

  public explainAsset(assetId: string): ScoredAsset | null {
    const all = this.computeRiskScores();
    return all.find(a => a.asset.asset_id === assetId) || null;
  }

  public getInternetExposedWithCritical(): ScoredAsset[] {
    return this.computeRiskScores().filter(
      a => a.asset.internet_exposed && a.associatedFindings.some(f => f.vulnerability.severity === 'CRITICAL')
    );
  }

  public getOverdueAssets(): ScoredAsset[] {
    return this.computeRiskScores().filter(a => a.scoreBreakdown.slaOverdueContribution > 0);
  }
}

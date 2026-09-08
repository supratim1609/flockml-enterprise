import * as fs from 'fs';
import * as path from 'path';

export interface AssetRecord {
  asset_id: string;
  asset_name: string;
  asset_type: string;
  business_unit: string;
  network_zone: string;
  criticality: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  internet_exposed: boolean;
  operating_system: string;
  owner: string;
  location: string;
  last_patch_date: string;
}

export interface VulnerabilityRecord {
  cve_id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cvss_score: number;
  description: string;
  affected_product: string;
  exploit_available: boolean;
  published_date: string;
}

export interface FindingRecord {
  finding_id: string;
  asset_id: string;
  cve_id: string;
  first_seen: string;
  last_seen: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'REMEDIATED' | 'ACCEPTED_RISK';
  remediation_deadline: string;
  scanner_source: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function loadCSV(filePath: string): Array<Record<string, string>> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim().length > 0 && !l.trim().startsWith('#'));
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const records: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] !== undefined ? values[j] : '';
    }
    records.push(row);
  }
  return records;
}

export function loadSyntheticDataset(baseDir?: string) {
  const root = baseDir || path.resolve(__dirname, '../../examples/security-intelligence');

  const rawAssets = loadCSV(path.join(root, 'synthetic-assets.csv'));
  const rawVulns = loadCSV(path.join(root, 'synthetic-vulnerabilities.csv'));
  const rawFindings = loadCSV(path.join(root, 'synthetic-findings.csv'));

  const assets: AssetRecord[] = rawAssets.map(r => ({
    asset_id: r.asset_id,
    asset_name: r.asset_name,
    asset_type: r.asset_type,
    business_unit: r.business_unit,
    network_zone: r.network_zone,
    criticality: (r.criticality.toUpperCase() as any) || 'LOW',
    internet_exposed: r.internet_exposed.toUpperCase() === 'TRUE',
    operating_system: r.operating_system,
    owner: r.owner,
    location: r.location,
    last_patch_date: r.last_patch_date
  }));

  const vulnerabilities: VulnerabilityRecord[] = rawVulns.map(r => ({
    cve_id: r.cve_id,
    severity: (r.severity.toUpperCase() as any) || 'LOW',
    cvss_score: parseFloat(r.cvss_score) || 0.0,
    description: r.description,
    affected_product: r.affected_product,
    exploit_available: r.exploit_available.toUpperCase() === 'TRUE',
    published_date: r.published_date
  }));

  const findings: FindingRecord[] = rawFindings.map(r => ({
    finding_id: r.finding_id,
    asset_id: r.asset_id,
    cve_id: r.cve_id,
    first_seen: r.first_seen,
    last_seen: r.last_seen,
    status: (r.status.toUpperCase() as any) || 'OPEN',
    remediation_deadline: r.remediation_deadline,
    scanner_source: r.scanner_source
  }));

  return { assets, vulnerabilities, findings };
}

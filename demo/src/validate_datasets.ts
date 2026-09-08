import { loadSyntheticDataset } from './dataset_loader.js';

export function validateDatasets() {
  console.log('[VALIDATION] Auditing synthetic security intelligence datasets...');
  const data = loadSyntheticDataset();

  const assetIds = new Set(data.assets.map(a => a.asset_id));
  const cveIds = new Set(data.vulnerabilities.map(v => v.cve_id));

  // 1. Asset verification
  if (data.assets.length === 0) throw new Error('Asset inventory is empty!');
  for (const a of data.assets) {
    if (!a.asset_id || !a.asset_name || !a.criticality) {
      throw new Error(`Corrupt asset record: ${JSON.stringify(a)}`);
    }
  }

  // 2. Vulnerability verification
  if (data.vulnerabilities.length === 0) throw new Error('Vulnerability catalog is empty!');
  for (const v of data.vulnerabilities) {
    if (!v.cve_id || isNaN(v.cvss_score) || v.cvss_score < 0 || v.cvss_score > 10) {
      throw new Error(`Invalid CVE record: ${JSON.stringify(v)}`);
    }
  }

  // 3. Referential integrity for findings
  if (data.findings.length === 0) throw new Error('Findings catalog is empty!');
  for (const f of data.findings) {
    if (!assetIds.has(f.asset_id)) {
      throw new Error(`Referential integrity failure: Finding ${f.finding_id} references non-existent asset ${f.asset_id}`);
    }
    if (!cveIds.has(f.cve_id)) {
      throw new Error(`Referential integrity failure: Finding ${f.finding_id} references non-existent CVE ${f.cve_id}`);
    }
  }

  console.log(`✓ All 3 datasets passed validation:`);
  console.log(`  - ${data.assets.length} Assets verified`);
  console.log(`  - ${data.vulnerabilities.length} CVE definitions verified`);
  console.log(`  - ${data.findings.length} Finding associations verified`);
  console.log('✓ Referential integrity 100% valid.\n');
}

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('validate_datasets')) {
  validateDatasets();
}

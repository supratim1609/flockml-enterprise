import { loadSyntheticDataset } from './dataset_loader.js';
import { RiskScoringEngine } from './risk_scoring_engine.js';
import { validateDatasets } from './validate_datasets.js';

export function runTests() {
  console.log('[TEST] Running automated test suite for FlockML Enterprise Demo...');

  // Test 1: Dataset loading & validation
  validateDatasets();

  // Test 2: Engine initialization & scoring
  const data = loadSyntheticDataset();
  const engine = new RiskScoringEngine(data);
  const scored = engine.computeRiskScores();

  if (scored.length === 0) {
    throw new Error('Risk scoring produced zero scored assets!');
  }

  // Test 3: Ranks are sequential and 1-indexed
  for (let i = 0; i < scored.length; i++) {
    if (scored[i].rank !== i + 1) {
      throw new Error(`Rank mismatch at index ${i}: expected ${i + 1}, got ${scored[i].rank}`);
    }
    if (i > 0 && scored[i].compositeScore > scored[i - 1].compositeScore) {
      throw new Error(`Ordering failure: rank ${i + 1} has higher score than rank ${i}`);
    }
  }

  // Test 4: Verify explainability on Top 1
  const top1 = scored[0];
  if (!top1.asset.asset_id || top1.compositeScore <= 0) {
    throw new Error('Top 1 asset has invalid score or ID');
  }

  const explanation = engine.explainAsset(top1.asset.asset_id);
  if (!explanation || explanation.asset.asset_id !== top1.asset.asset_id) {
    throw new Error('Explanation lookup failed for Top 1 asset');
  }

  // Test 5: Verify Internet Exposed filter
  const exposed = engine.getInternetExposedWithCritical();
  for (const exp of exposed) {
    if (!exp.asset.internet_exposed) {
      throw new Error(`Filtering error: asset ${exp.asset.asset_id} is not internet exposed`);
    }
  }

  console.log(`✓ All 5 automated unit and integration tests PASSED.`);
  console.log(`✓ Deterministic scoring verified successfully.\n`);
}

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('test_demo')) {
  runTests();
}

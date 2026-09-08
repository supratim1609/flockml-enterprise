# Enterprise Evaluation Metrics

> **Document Classification:** Enterprise Evaluation Standard  
> **Status:** Configurable Metric Framework (To be calibrated during POC)

---

## 1. Core Metric Matrix

The following table defines the quantitative metrics used to evaluate the FlockML Enterprise platform during POC and production stages. Baseline figures represent traditional manual spreadsheet operations; target values represent the operational objectives for the POC.

| Metric | Baseline (Manual / Current) | Target (FlockML POC) | Measurement Method | Operational Significance |
|---|---|---|---|---|
| **Mean Time to Prioritize (MTTP)** | 4.0 – 6.0 hours per 1,000 findings | < 15 minutes | Timestamp difference between batch ingestion and final ranked export. | Directly reduces the window of exposure for critical vulnerabilities. |
| **Analyst Review Time** | 15 – 25 minutes per critical asset | < 3 minutes per asset | Timed observation of analyst validating evidence and generating ticket. | Eliminates manual cross-referencing between CMDB, CVE, and scan tools. |
| **Top-10 Prioritization Agreement** | N/A (Subjective analyst variance) | ≥ 80% Rank Correlation (Spearman $\rho \ge 0.8$) | Double-blind ranking comparison against senior SecOps engineer consensus. | Validates that mathematical risk scoring matches senior domain expertise. |
| **False Escalation Rate** | 20% – 35% of high-severity alerts | < 5% of prioritized assets | Post-audit percentage of prioritized assets that were air-gapped or non-critical. | Prevents patch fatigue and avoids wasting IT engineering hours. |
| **Evidence Traceability** | 30% – 50% (Spreadsheet fragmentation) | 100% Citation Compliance | Automated schema audit verifying that every ranked item cites exact Finding and CVE IDs. | Guarantees compliance for CEA / CERT-In regulatory audits. |
| **Answer Grounding Score** | N/A (Prone to human omission) | 100% Grounded (Zero Hallucination) | Human review checking whether all generated statements exist in source CSV records. | Ensures the system never invents phantom assets or non-existent CVEs. |
| **Deterministic Response Latency** | Minutes to hours (adhoc SQL/VLOOKUP) | < 200 ms (1,000 findings) | In-process execution timer profiling the scoring and ranking engine. | Enables interactive, real-time filtering for security teams. |
| **Natural Language Query Latency** | N/A | < 5.0 seconds (Local CPU/GPU) | End-to-end response time for ad-hoc natural language questions. | Delivers conversational agility without sacrificing data security. |

---

## 2. Calculation Formulas

### 2.1 Mean Time to Prioritize (MTTP)
$$\text{MTTP} = T_{\text{export}} - T_{\text{ingest}}$$
Where:
* $T_{\text{ingest}}$ is the timestamp when the vulnerability scanner export is ingested into the system.
* $T_{\text{export}}$ is the timestamp when the prioritized Top-K action list is approved for remediation ticketing.

### 2.2 Top-10 Prioritization Agreement (Spearman's $\rho$)
$$\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}$$
Where:
* $d_i$ is the difference between the human expert's rank and FlockML's calculated rank for asset $i$.
* $n = 10$ (the top 10 prioritized assets).

### 2.3 Evidence Traceability Rate ($R_{\text{trace}}$)
$$R_{\text{trace}} = \frac{N_{\text{fully\_cited}}}{N_{\text{total\_prioritized}}} \times 100\%$$
Where a finding is defined as *fully cited* if and only if it explicitly references a valid `Finding_ID`, `CVE_ID`, `Asset_ID`, and `Scanner_Source`.

---

## 3. Configuration & Customization

Enterprise security teams can adjust baseline parameters and target thresholds inside the evaluation configuration file (`evaluation/config.json` or enterprise policy register) to reflect specific infrastructure scale and audit mandates.

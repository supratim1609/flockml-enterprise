# Synthetic Security Intelligence Datasets

This directory provides a complete, structured, and realistic set of synthetic datasets designed to demonstrate the **FlockML Enterprise Security Intelligence Reference Architecture**.

> **IMPORTANT NOTICE:** All entities, hostnames, IP classes, CVE associations, and dates within these files are **100% synthetic and created purely for technical evaluation**. They contain no proprietary or confidential data from CESC Limited or any other enterprise.

---

## Directory Contents

| File | Purpose | Record Count |
| :--- | :--- | :--- |
| [`synthetic-assets.csv`](synthetic-assets.csv) | Master asset inventory including business criticality, operating system, and network zone | 15 Assets |
| [`synthetic-vulnerabilities.csv`](synthetic-vulnerabilities.csv) | Catalog of CVE entries, CVSS scores, exploit availability indicators, and descriptions | 15 CVEs |
| [`synthetic-findings.csv`](synthetic-findings.csv) | Scanner output linking vulnerabilities to assets with first/last seen dates and SLA status | 20 Findings |
| [`data-dictionary.md`](data-dictionary.md) | Comprehensive schema definition, allowed types, and field descriptions | Reference Doc |
| [`example-queries.md`](example-queries.md) | Business questions tested by CISO and SecOps teams | Reference Doc |
| [`expected-analysis.md`](expected-analysis.md) | Sample explainable decision-support output format | Reference Doc |

---

## How to Test and Run Against These Datasets

You can run the deterministic security intelligence evaluator directly from the repository root:

```bash
# Validate dataset integrity
npm run validate:data

# Run the deterministic decision-support demo
npm run demo
```

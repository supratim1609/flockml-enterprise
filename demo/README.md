# FlockML Enterprise Security Intelligence Demo

> **Classification:** Public Reference Implementation  
> **Status:** IMPLEMENTED & VALIDATED AUTOMATICALLY  
> **Dependencies:** Node.js (v18+) / Zero External API Dependencies

---

## 1. Overview

This directory contains the **deterministic reference implementation** of the FlockML Enterprise Security Intelligence decision-support pipeline.

It demonstrates how enterprise vulnerability scanner findings, asset criticality inventories, and threat intelligence metadata can be ingested and prioritized into actionable decision support **without sending any data to external cloud APIs or requiring third-party LLM keys**.

### Key Architectural Characteristics
* **100% Deterministic:** Running the demo produces identical scores and rankings every single run.
* **100% Offline & Sovereign:** Generates zero outbound network traffic; requires no OpenAI, Anthropic, or external API tokens.
* **Traceable Citations:** Every prioritized asset cites specific source records (`Asset_ID`, `CVE_ID`, `Finding_ID`).
* **Decision Support Only:** Never takes autonomous remediation or active network actions.

---

## 2. Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) v18.0.0 or higher.
* `npm` package manager.

### Running the Demo
From the repository root:

```bash
# 1. Install local development dependencies
npm install

# 2. Run the deterministic SecOps demo
npm run demo
# or
npm run security-demo
```

### Running Automated Test Suites & Validation
```bash
# Run unit tests validating scoring math and edge cases
npm test

# Run referential integrity audit on synthetic datasets
npm run validate:data
```

---

## 3. Demo Architecture & Source Code

* [`demo/src/index.ts`](file:///Users/supratim/Desktop/flockml-enterprise/demo/src/index.ts): Main CLI runner executing seven core business queries and generating structured decision support.
* [`demo/src/risk_scoring_engine.ts`](file:///Users/supratim/Desktop/flockml-enterprise/demo/src/risk_scoring_engine.ts): Deterministic multi-factor scoring engine applying CVSS, zone multipliers, criticality, active exploit indicators, and SLA aging.
* [`demo/src/dataset_loader.ts`](file:///Users/supratim/Desktop/flockml-enterprise/demo/src/dataset_loader.ts): Zero-dependency CSV parser with referential integrity validation.
* [`demo/src/test_demo.ts`](file:///Users/supratim/Desktop/flockml-enterprise/demo/src/test_demo.ts): Automated test suite asserting deterministic ranking invariants.
* [`demo/src/validate_datasets.ts`](file:///Users/supratim/Desktop/flockml-enterprise/demo/src/validate_datasets.ts): Validates schema and entity links across all synthetic CSVs.

---

## 4. Documentation Links
* [10-Minute Executive Demo Script](demo-script.md)
* [Comprehensive Demo Scenarios & Query Reference](demo-scenarios.md)
* [Synthetic Dataset Data Dictionary](../examples/security-intelligence/data-dictionary.md)

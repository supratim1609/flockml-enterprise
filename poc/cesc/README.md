# Proposed CESC Security Intelligence Proof-of-Concept (POC)

## Executive Summary

This directory outlines the **Reference POC Architecture** proposed for technical evaluation within a power distribution and enterprise utility context such as **CESC Limited (RP-Sanjiv Goenka Group)**.

> **GOVERNING PRINCIPLE NOTICE:**  
> This documentation represents a **proposed technical proof-of-concept specification**. It does not constitute a formal commercial contract, production deployment, or finalized institutional approval. All evaluation work is structured to operate in an isolated staging environment on customer-provided private virtual machines.

---

## 1. POC Objective

To evaluate how an air-gapped, on-premises artificial intelligence model can ingest raw enterprise vulnerability scanner findings (e.g., Tenable, Qualys, Nessus) alongside asset criticality records, to:
1. **Prioritize the Top 10 Most Vulnerable Assets** based on composite risk (CVSS severity, asset criticality, internet exposure, active exploit status, and remediation SLA aging).
2. **Predict Potential Attack Pathways** and exposure points across corporate IT and OT demilitarized zones (DMZs).
3. **Generate Actionable Remediation Guidance** for SecOps engineers without sending sensitive asset hostnames or IP addresses to foreign cloud AI APIs.

---

## 2. POC Specifications Directory Map

| Document | Purpose |
| :--- | :--- |
| [`problem-statement.md`](problem-statement.md) | Business problem: 10,000+ raw scanner findings, alert fatigue, and cloud compliance barriers |
| [`proposed-architecture.md`](proposed-architecture.md) | Architecture on private virtual machines within the enterprise network |
| [`data-requirements.md`](data-requirements.md) | Minimum schema requirements for asset inventory and vulnerability logs |
| [`security-intelligence.md`](security-intelligence.md) | Functional capabilities of the vulnerability prioritization model |
| [`deployment-plan.md`](deployment-plan.md) | 7-stage staged adoption roadmap (Stage 0 to Stage 6) |
| [`evaluation-plan.md`](evaluation-plan.md) | Blind comparison methodology comparing model rankings vs senior SecOps rankings |
| [`success-criteria.md`](success-criteria.md) | Concrete acceptance gates required for POC success |
| [`questions-for-enterprise.md`](questions-for-enterprise.md) | Technical and operational discovery questionnaire for the Chief Information Officer (CIO) |
| [`limitations.md`](limitations.md) | Explicit architectural boundaries and non-goals (e.g., zero autonomous patching) |

---

## 3. Recommended Initial Staging Environment
- **Compute:** 1 or 2 Private Linux Virtual Machines (16–32 vCPUs, 32GB–64GB RAM, 200GB SSD).
- **Network Boundary:** Isolated private staging VLAN within the corporate data center.
- **Outbound Connectivity:** Completely disabled (zero internet/cloud egress).
- **Duration:** 14 calendar days.

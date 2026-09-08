# Enterprise Demonstration Scenarios & Query Reference

> **Document Classification:** Operational Demonstration Guide  
> **Status:** Fully Functional in Reference Implementation (`npm run demo`)

---

## 1. Overview

This document details the seven canonical operational scenarios executed by the FlockML Enterprise Security Intelligence reference demo. Each scenario corresponds to a recurring operational question asked by CISOs, Security Operations Leads, and IT Infrastructure Directors in utility and critical infrastructure organizations.

---

## 2. Scenario Catalog

### Scenario 1: Tactical Patch Prioritization
* **Operational Query:** `"Show me the 10 highest-priority assets that should be patched first."`
* **Target Stakeholder:** Security Operations Center (SOC) Lead & Patch Management Team.
* **Underlying Logic:** Evaluates all assets across composite risk:
  $$\text{Score} = (\text{CVSS} \times W_{\text{zone}}) + \text{Crit} + \text{Exp} + \text{InTheWild} + \text{Overdue}$$
* **Expected Analysis:** Returns ranked table of top 10 assets with composite score, finding count, worst CVE, and owner.
* **Business Outcome:** Replaces arbitrary CVSS sorting with risk-based scheduling; reduces engineering triage time by up to 80%.

---

### Scenario 2: Deep-Dive Risk Explainability
* **Operational Query:** `"Why is ASSET-001 ranked first?"`
* **Target Stakeholder:** System Owner & Infrastructure Director.
* **Underlying Logic:** Isolates the top-ranked asset node in the graph, extracts all active findings, and decomposes the composite score into human-readable contributing factors.
* **Expected Analysis:**
  * **Asset Profile:** SCADA Central Management Server (Criticality: CRITICAL).
  * **Network Zone:** DMZ (Internet Exposed = YES).
  * **Risk Factors:** Critical CVSS findings, confirmed active in-the-wild exploit (`CVE-2024-21413`), and overdue remediation deadline.
  * **Recommended Action:** Immediate containment, temporary isolation of external web ports, and patch validation.
* **Business Outcome:** Eliminates friction between SecOps and system owners by providing undeniable, transparent evidence.

---

### Scenario 3: Perimeter Exposure Triage
* **Operational Query:** `"Which critical assets are currently exposed to the internet with high-severity vulnerabilities?"`
* **Target Stakeholder:** Perimeter Security Lead & CISO.
* **Underlying Logic:** Filter predicates: `internet_exposed == true` AND `criticality in [CRITICAL, HIGH]` AND finding `cvss_score >= 8.0`.
* **Expected Analysis:** Lists external attack surface assets (e.g., Customer Portals, DMZ Gateways) requiring emergency virtual patching or firewall rule restrictions.
* **Business Outcome:** Prevents external perimeter compromise before vulnerability scanning reports are formally published.

---

### Scenario 4: Active Threat & Weaponization Filter
* **Operational Query:** `"Which vulnerabilities have confirmed active in-the-wild exploitation indicators?"`
* **Target Stakeholder:** Threat Intelligence Analyst & Incident Responders.
* **Underlying Logic:** Intersects active enterprise findings with threat intelligence flag `exploit_available == true`.
* **Expected Analysis:** Returns specific CVEs (e.g., `CVE-2024-21413`, `CVE-2023-46805`) and the specific assets harboring them.
* **Business Outcome:** Focuses emergency maintenance windows exclusively on vulnerabilities that attackers are actively weaponizing.

---

### Scenario 5: Regulatory Compliance & SLA Audit
* **Operational Query:** `"Which critical assets have overdue remediation deadlines?"`
* **Target Stakeholder:** Internal Audit, Compliance Officer, and CISO.
* **Underlying Logic:** Checks finding `status == ACTIVE` AND `remediation_deadline < Current_Date` where `criticality == CRITICAL`.
* **Expected Analysis:** Highlights systems in direct violation of organizational security policies or CEA mandatory timelines.
* **Business Outcome:** Prepares audit-ready compliance filings; eliminates surprise regulatory penalties.

---

### Scenario 6: Executive Posture Synthesis
* **Operational Query:** `"Summarize the current enterprise security posture across all business units."`
* **Target Stakeholder:** Board of Directors, Managing Director, and CISO.
* **Underlying Logic:** Aggregates findings by Business Unit (`Power Distribution`, `Generation & SCADA`, `Corporate IT`) and Network Zone.
* **Expected Analysis:** Executive summary highlighting that 65% of overall organizational risk resides in the Generation & SCADA operational zone, primarily driven by legacy unpatched gateway servers.
* **Business Outcome:** Informs capital allocation for OT network segmentation and security staffing.

---

### Scenario 7: Tactical Remediation Action Plan
* **Operational Query:** `"What immediate remediation actions should be dispatched to engineering teams today?"`
* **Target Stakeholder:** IT Operations & SOC Tier-1 Dispatch.
* **Underlying Logic:** Correlates top 3 assets with verified software packages and patch identifiers.
* **Expected Analysis:** Concrete, non-destructive tactical recommendations:
  1. `ASSET-001`: Upgrade SCADA Management Web Services to version 4.2.1-patch3; restrict ingress to corporate VPN IP pool.
  2. `ASSET-007`: Apply firmware security update `FW-SUB-2024.1` to Substation RTU Gateway.
  3. `ASSET-005`: Revoke internet exposure for Customer Billing Portal database staging port.
* **Business Outcome:** Converts abstract analytical risk into direct, actionable engineering tickets.

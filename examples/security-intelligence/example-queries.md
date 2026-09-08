# Example Business Queries: Security Intelligence POC

This document catalogs canonical business and operational questions that enterprise security teams, CISOs, and IT leadership can submit to the FlockML Enterprise Security Intelligence layer.

---

## 1. Core Prioritization Queries

### Query 1: Top-10 High-Risk Assets
> **Question:** *"Show me the 10 highest-priority assets requiring immediate patching across our environment."*  
> **Expected Actionable Outcome:** A ranked table of top 10 assets combining CVSS severity, business criticality, internet exposure, and active exploit availability, with an explicit score breakdown.

### Query 2: Single-Asset Deep Dive (Root-Cause Attribution)
> **Question:** *"Why is AST-001 (Substation-Gateway-Alpha) ranked as the highest priority asset?"*  
> **Expected Actionable Outcome:** Deconstructed risk narrative detailing specific CVEs (e.g., CVE-2024-6387 RCE), external network boundary exposure, critical substation role, and days past SLA deadline.

---

## 2. Exposure & Perimeter Risk Queries

### Query 3: Internet-Exposed Critical Vulnerabilities
> **Question:** *"Which internet-facing assets currently harbor critical severity vulnerabilities with known active exploits?"*  
> **Expected Actionable Outcome:** Filtered subset of DMZ / external assets (e.g., AST-001, AST-003, AST-007, AST-012) cross-referenced against public exploit availability.

### Query 4: OT Boundary & Critical Zone Isolation
> **Question:** *"Are there any unpatched remote code execution vulnerabilities present on assets inside the OT-CONTROL-ZONE or OT-DMZ?"*  
> **Expected Actionable Outcome:** Identification of SCADA historians, RTU controllers, or gateway devices at risk of lateral movement.

---

## 3. SLA & Operational Compliance Queries

### Query 5: Overdue Remediation Deadlines
> **Question:** *"Which critical assets have open findings that have exceeded their remediation deadline by more than 30 days?"*  
> **Expected Actionable Outcome:** Highlight of aging vulnerabilities indicating process bottlenecks or delayed change windows.

### Query 6: Security Posture Delta
> **Question:** *"Summarize our current vulnerability posture and recommend the top 3 tactical remediation actions for the network engineering team."*  
> **Expected Actionable Outcome:** Synthesized executive summary highlighting the primary attack vectors and specific package/firmware update priorities.

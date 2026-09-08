# Expected Analysis Format: Decision Support Output

FlockML Enterprise produces structured, explainable decision-support artifacts. Outputs are **never** presented as infallible "AI truth" or executed autonomously against customer infrastructure.

---

## Example Response Format: Asset Root-Cause Attribution

```yaml
Asset Designation: AST-001 (Substation-Gateway-Alpha)
Priority Rank: 1 of 15
Composite Risk Score: 94.2 / 100
Classification: IMMEDIATE REMEDIATION (CRITICAL TIER)

Context Summary:
  Business Unit: Grid Operations
  Physical Location: Howrah Zonal Hub
  Network Zone: OT-DMZ (Demilitarized Zone interfacing OT and Corporate LAN)
  Operational Criticality: CRITICAL (Direct bridge for telemetry and control feeds)
  Internet Exposure: TRUE (Public Ingress Identified)

Primary Risk Drivers:
  1. Active Unauthenticated RCE on Perimeter:
     - Finding FND-001: CVE-2024-6387 (OpenSSH "regreSSHion")
     - CVSS: 8.1 (CRITICAL impact in exposed posture)
     - Exploit Status: Functional exploit available publicly
  2. Substation Boundary Exposure:
     - Asset sits in the OT-DMZ with dual-homed routing paths into the internal OT-CONTROL-ZONE.
  3. Overdue SLA:
     - Remediation deadline was 2026-07-20 (over 45 days past SLA).

Supporting Evidence & Source Traceability:
  - Source Records: [synthetic-assets.csv:AST-001], [synthetic-findings.csv:FND-001, FND-002, FND-020]
  - Vulnerability Catalog: [synthetic-vulnerabilities.csv:CVE-2024-6387, CVE-2023-48795, CVE-2024-24919]
  - Scanner Engine: Tenable-OT-Scanner (Sensor ID: Howrah-Zonal-01)

Recommended Remediation Workflow:
  1. Emergency Maintenance Window: Patch OpenSSH to version 9.8p1 or newer on AST-001.
  2. Compensating Control: Restrict port 22/tcp on the external gateway interface to authorized bastion IPs only.
  3. Lateral Validation: Audit auth logs for unexpected connection attempts originating from external subnets between 2026-07-05 and present.

Confidence: High (Deterministic match across asset inventory and scanner records)
Disclaimer: Decision support analysis. Changes must follow standard enterprise Change Advisory Board (CAB) validation.
```

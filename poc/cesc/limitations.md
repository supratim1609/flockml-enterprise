# System Scope, Non-Goals & Limitations

> **Document Classification:** Public Reference / Governance & Constraints  
> **Status:** Active Operational Boundary

---

## 1. Explicit Scope: Decision Support Only

FlockML Enterprise is architected strictly as an **Explainable Decision-Support System** for enterprise human operators. It is designed to aggregate, contextualize, and prioritize vast quantities of disparate enterprise data so that authorized human experts can make faster, better-informed decisions.

### Absolute Prohibition: No Autonomous Remediation

The FlockML Enterprise reference system **NEVER** performs autonomous or unapproved actions on target enterprise infrastructure. Specifically, the system will **NOT**:

1. **Deploy Patches or Modify Software:** It will not issue commands to update operating systems, install packages, or reboot production servers.
2. **Alter Network Configuration:** It will not modify firewall rule sets, VLAN boundaries, routing tables, or active directory access policies.
3. **Execute Active Exploitation or Intrusive Scans:** It is not an offensive penetration testing tool. It does not send raw network probes, inject payloads, or run port scans.
4. **Modify Master Records:** It operates strictly on read-only copies of scanner dumps and CMDB exports. It never alters source scanner configurations.
5. **Take Autonomous Industrial Actions:** In OT/SCADA environments, it never communicates directly with PLCs, RTUs, protection relays, or human-machine interfaces (HMIs).

---

## 2. Realistic Analytical Boundaries

To uphold the core principle of **Prove, Don't Promise**, the analytical capabilities of the system are governed by clear limitations:

| Capability Claim | Actual System Reality |
|---|---|
| **"Predicts cyber attacks with certainty"** | **FALSE.** The system evaluates historical vulnerability patterns, CVSS scores, exposure vectors, and known exploit availability. It calculates *relative exposure risk*, not deterministic crystal-ball predictions. |
| **"Replaces SOC Analysts & Security Engineers"** | **FALSE.** The system reduces repetitive cognitive triage workload. Human analysts remain the final authority for verification, ticket dispatch, and remediation sign-off. |
| **"Eliminates 100% of Vulnerabilities"** | **FALSE.** Remediation depends on system patch availability, maintenance windows, and enterprise maintenance cycles. The system prioritizes the most dangerous exposures. |
| **"Production Risk Model Out of the Box"** | **FALSE.** The baseline risk scoring formula is a transparent reference implementation. Every enterprise maintains unique risk appetites and must calibrate asset weights accordingly. |

---

## 3. Data Integrity & Ingestion Limitations

1. **Garbage In, Garbage Out:**  
   The prioritization output is directly dependent on the accuracy, freshness, and completeness of enterprise scanner exports and CMDB registers. If an asset is omitted from the inventory or misclassified as non-critical, the system will rank it based on the erroneous metadata provided.
2. **Point-in-Time Static Analysis:**  
   In baseline POC deployments, data ingestion occurs via batch exports (CSV/JSON/XML). The system reflects the state of the network at the time of the scan. Continuous streaming telemetry requires Stage 4 enterprise integration.
3. **Synthetic Reference Data:**  
   All examples and demo environments in this public repository utilize synthetic datasets created specifically for demonstration purposes. They do not represent or contain any real data from CESC or any other enterprise.

---

## 4. Hardware & Resource Limitations

1. **CPU vs. GPU Performance:**  
   The deterministic risk scoring engine runs in milliseconds on standard x86/ARM CPUs. When deploying local LLM explanation layers (e.g., Llama-3-8B), CPU-only inference delivers approximately 4–12 tokens/sec depending on thread allocation. High-throughput real-time streaming requires dedicated GPU hardware (e.g., NVIDIA T4, A10G, or L4).
2. **Context Window Constraints:**  
   When feeding structured finding graphs into local language models, prompt assembly must utilize structured chunking. Summarization is applied when findings exceed the context window of the selected model.

---

## 5. Implementation Status Matrix

| Subsystem / Feature | Public Repository Status | Production / Pilot Status |
|---|---|---|
| **Deterministic Risk Engine Specification** | **DESIGNED** | Documented multi-factor formula |
| **Synthetic Security Datasets** | **IMPLEMENTED** | Included in `/examples` |
| **Enterprise Evaluation Framework** | **DESIGNED** | Complete testing methodology |
| **Level 1 RAG Retrieval Engine** | **PROPOSED / ARCHITECTED** | Documented for POC staging |
| **Purdue Model Zone Weighting** | **DESIGNED** | Calibrated for utility architectures |
| **Autonomous Remediation** | **PERMANENT NON-GOAL** | Prohibited by design |
| **CESC Production Data Integration**| **PROPOSED PILOT** | Awaiting formal POC stage sign-off |


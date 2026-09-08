# FlockML Enterprise

### Private AI infrastructure for enterprise intelligence.

FlockML Enterprise is an infrastructure and application architecture for running AI workloads against controlled enterprise data.

It is designed for organizations that need AI capabilities without treating sensitive enterprise information as an uncontrolled external dependency.

FlockML Enterprise is not a single chatbot. It is an infrastructure layer on which enterprise AI applications can be built.

---

## 1. Executive Summary & Positioning

Modern enterprises and critical infrastructure operators—such as power utilities, transmission systems, healthcare networks, and government organizations—face a fundamental dilemma when adopting artificial intelligence:

1. **Cloud AI Risk:** Disagreeable regulatory exposure, loss of sovereignty, potential data leakage, and compliance violations (e.g., CEA Regulations, CERT-In directives, DPDP Act 2023) caused by sending sensitive logs, asset topologies, or customer data to multi-tenant public APIs.
2. **Generic Chatbot Pitfall:** Surface-level conversational interfaces that hallucinate, lack access to deep operational context, fail to provide source citations, and cannot integrate into existing enterprise workflows.

FlockML Enterprise resolves this dilemma by bringing the AI workload directly to the data:

```
ENTERPRISE DATA
       ↓
PRIVATE AI WORKLOAD
       ↓
FLOCKML ENTERPRISE
       ↓
BUSINESS INTELLIGENCE
       ↓
ACTIONABLE DECISION
```

The underlying distributed/mesh architecture provides an infrastructure efficiency advantage, while the customer interface focuses strictly on operational control, data privacy, security boundaries, and high-impact business outcomes.

---

## 2. Capabilities & Status Matrix

In adherence to the **Prove, Don't Promise** principle, capabilities and deployment statuses are explicitly classified below. Claims beyond verified implementations are strictly prohibited.

| Capability / Dimension | Status | Notes / Location |
|---|---|---|
| **Enterprise Architecture Specification** | **Designed** | Fully documented in [`/docs`](docs/) and [`/architecture`](architecture/) |
| **Deterministic Risk Scoring Engine** | **Implemented** | Zero-dependency TypeScript runtime in [`/demo`](demo/) |
| **Synthetic Security Intelligence Datasets** | **Included** | Comprehensive schemas in [`/examples`](examples/security-intelligence/) |
| **Enterprise POC Specification (CESC Reference)** | **Included** | Complete 6-stage pilot framework in [`/poc/cesc`](poc/cesc/) |
| **Public Enterprise SecOps Demo** | **Reference Implementation** | Runnable locally via `npm run demo` |
| **Level 1 RAG Grounding Architecture** | **Designed** | Context-bounded retrieval model in [`docs/model-strategy.md`](docs/model-strategy.md) |
| **Distributed Inference Runtime** | **Implemented in private FlockML codebase** | Proprietary multi-node execution engine |
| **Model Residency & Cryptographic Attestation** | **Implemented in private FlockML codebase** | Node-level hardware verification |
| **Multi-Model Orchestration Engine** | **Implemented in private FlockML codebase** | Dynamic workload allocation |
| **CESC Production Deployment** | **Not deployed** | Proposed reference POC architecture only |
| **CESC Production Data** | **Not provided** | 100% synthetic data used in this public repository |
| **Ministry / Government Production Deployment** | **Not deployed** | Exploratory discussions only |

---

## 3. Reference Enterprise Use Case: Security Intelligence

The initial reference use case for FlockML Enterprise is **Enterprise Security Intelligence**, modeled around the operational requirements of a power utility / critical infrastructure enterprise such as CESC.

> [!NOTE]
> **Important Distinction:** CESC is a proposed pilot context and reference architecture. CESC has not formally approved, certified, or deployed this system in production.

### The Operational Problem
Enterprise security operations centers (SOCs) ingest tens of thousands of vulnerability findings monthly from tools like Tenable Nessus, Qualys, and Rapid7. Teams struggle with:
* Inability to contextualize CVSS scores against operational asset criticality (e.g., SCADA vs. office printer).
* Lack of visibility into internet-facing OT gateways versus air-gapped systems.
* Time-consuming manual spreadsheet correlation causing patch SLA breaches.

### The FlockML Solution
FlockML Enterprise ingests vulnerability scans, asset registers, and threat intelligence feeds to produce **deterministic, explainable risk prioritization**:

```
Vulnerability Data + Asset Inventory
       ↓
Composite Multi-Factor Scoring
       ↓
Ranked Assets + Explainable Evidence
       ↓
Actionable Decision Support
```

### Deterministic Multi-Factor Risk Formula
$$\text{Asset Risk Score} = \sum_{f \in \text{Findings}} \left[ (\text{CVSS}_f \times W_{\text{zone}}) + \text{Crit}_{\text{asset}} + \text{Exp}_{\text{asset}} + \text{ActiveExploit}_f + \text{OverdueSLA}_f \right]$$

### Output Sample: Explainable Decision Support
When queried (*"Why is ASSET-001 ranked first?"*), the system outputs structured decision support—never opaque assertions:

```text
Asset: ASSET-001 (SCADA Central Management Server)
Composite Risk Score: 39.60 [HIGH CRITICALITY]
Network Zone: DMZ | Internet Exposed: YES | Owner: Grid Operations

Primary Contributing Factors:
- Ingested CVSS 9.8 vulnerability (CVE-2024-21413) on an internet-exposed host.
- Confirmed active in-the-wild exploitation indicators.
- Remediation SLA breached by >30 days.

Supporting Evidence:
- Finding ID: FIND-001 (Scanner: Tenable Nessus)
- Asset Record: ASSET-001 (CMDB Production Register)

Recommended Action:
Prioritize immediate virtual patching or temporary firewall ingress restriction.
Confidence: 100% (Directly grounded in source scan records)
```

---

## 4. Horizontal Business Applications

The same underlying private AI infrastructure layer supports multiple enterprise business workloads across industrial and utility domains:

```
+-----------------------------------------------------------------------------------+
|                           FLOCKML PRIVATE AI RUNTIME                              |
+-----------------------------------------------------------------------------------+
         |                    |                   |                   |
         v                    v                   v                   v
+------------------+ +------------------+ +------------------+ +------------------+
|    Security      | |    Predictive    | |    Enterprise    | |   Operational    |
|   Intelligence   | |   Maintenance    | |    Knowledge     | |   Intelligence   |
+------------------+ +------------------+ +------------------+ +------------------+
| Vulnerability    | | Dissolved Gas    | | High-Voltage     | | Smart meter load |
| prioritization   | | Analysis (DGA)   | | single-line      | | forecasting &    |
| & attack pathway | | on substation    | | schematics &     | | feeder imbalance |
| exposure.        | | transformers.    | | operating SOPs.  | | triage.          |
+------------------+ +------------------+ +------------------+ +------------------+
```

1. [**Security Intelligence**](business/security-intelligence.md): Vulnerability prioritization, exposure analysis, and audit readiness (*Implemented reference demo*).
2. [**Predictive Maintenance**](business/predictive-maintenance.md): Dissolved gas analysis (DGA) and vibration telemetry on substation transformers (*Proposed*).
3. [**Enterprise Knowledge Assistant**](business/enterprise-knowledge.md): Air-gapped retrieval over high-voltage engineering SOPs and single-line schematics (*Proposed*).
4. [**Operational Intelligence**](business/operational-intelligence.md): Smart meter telemetry, phase balancing, and feeder overload prediction (*Proposed*).
5. [**Document Intelligence**](business/document-intelligence.md): Automated RFP/tender review and EPC contract risk extraction (*Proposed*).
6. [**Customer & Outage Intelligence**](business/customer-intelligence.md): Real-time call center grievance clustering and storm restoration dispatch (*Proposed*).
7. [**Compliance Intelligence**](business/compliance-intelligence.md): Automated gap analysis against Central Electricity Authority (CEA) cybersecurity mandates (*Proposed*).

*For full workload specifications, see [`business/business-applications.md`](business/business-applications.md).*

---

## 5. System Architecture & Information Flow

FlockML Enterprise enforces a strict unidirectional pipeline ensuring zero unauthorized data egress:

```mermaid
graph TD
    subgraph Enterprise_Data_Plane ["Enterprise Data Plane (Controlled / Air-Gapped)"]
        D1[Asset Inventory / CMDB]
        D2[Vulnerability Scanner Logs]
        D3[OT Telemetry & Historians]
    end

    subgraph FlockML_Plane ["FlockML Enterprise Layer (Local Host / Private VLAN)"]
        I1[Data Ingestion & Normalization]
        I2[Deterministic Scoring Engine]
        I3[Structured Graph / Vector Store]
        I4[Local Model Runtime (Optional)]
    end

    subgraph Decision_Plane ["Human Decision & Governance Plane"]
        A1[SecOps Prioritization Console]
        A2[Executive Posture Briefings]
        A3[CEA / CERT-In Audit Exports]
    end

    Enterprise_Data_Plane --> FlockML_Plane
    FlockML_Plane --> Decision_Plane
```

*For comprehensive architectural specifications, see [`architecture/context.md`](architecture/context.md), [`architecture/deployment.md`](architecture/deployment.md), and [`architecture/data-flow.md`](architecture/data-flow.md).*

---

## 6. Runnable Reference Demo (Zero API Keys Required)

The repository includes a standalone, zero-dependency reference demonstration of the Security Intelligence triage engine. It runs 100% offline and requires no paid cloud API tokens.

### Running the Demo
```bash
# Clone the repository
git clone https://github.com/supratim1609/flockml-enterprise.git
cd flockml-enterprise

# Install dependencies (TypeScript runtime)
npm install

# Run the deterministic SecOps demo
npm run demo
```

### Running Automated Verification & Tests
```bash
# Run unit test suite
npm test

# Run referential integrity audit on synthetic datasets
npm run validate:data
```

---

## 7. Enterprise Security & Sovereignty Model

FlockML Enterprise is engineered for environments governed by zero-trust and strict data sovereignty policies:

* **Zero Cloud Egress:** All scoring, parsing, and optional LLM synthesis occurs locally within the customer's private network. Egress firewalls block all external connections.
* **Role-Based Access Control (RBAC):** Granular separation between Tier-1 analysts, system owners, and security administrators.
* **Deterministic Source Anchoring:** The synthetic dataset is the single source of truth; language models are prohibited from inventing ungrounded assets or CVEs.
* **No Autonomous Actions:** The platform acts strictly as decision support. It will never independently modify firewalls, alter network routing, or push patches without explicit human sign-off.
* **Compliance Posture:** Designed to align with **CEA Cybersecurity Regulations for Power Sector**, **CERT-In Directives**, and the **DPDP Act 2023**. *(Note: Compliance must be certified against final physical deployments).*

*For details, see [`SECURITY.md`](SECURITY.md), [`docs/security-architecture.md`](docs/security-architecture.md), and [`docs/privacy-architecture.md`](docs/privacy-architecture.md).*

---

## 8. Deployment Models

FlockML Enterprise supports five flexible deployment topologies to accommodate organizational maturity:

1. **Model 1: Single Enterprise Standalone Server:** Dedicated VM for rapid 14-day technical POCs.
2. **Model 2: Private VM Cluster:** Production multi-node VM cluster in corporate data centers.
3. **Model 3: Air-Gapped Industrial / OT Deployment:** Physically isolated hardware inside Purdue Model Level 2/3 substation LANs.
4. **Model 4: Hybrid Private Enterprise Cloud:** On-premise indexing connected via private dedicated fiber to a customer-managed VPC.
5. **Model 5: Distributed Enterprise Mesh:** Multi-node distributed inference orchestrated across regional sub-offices via the FlockML distributed runtime.

*For trade-offs and infrastructure requirements, see [`docs/deployment-models.md`](docs/deployment-models.md).*

---

## 9. Public vs. Proprietary Boundary

To ensure enterprise transparency while protecting core intellectual property, the technical boundaries between this public repository and the private FlockML codebase are strictly defined:

| Subsystem / Component | Public Repository (`flockml-enterprise`) | Private FlockML Core Codebase |
|---|---|---|
| **Enterprise Technical Architecture** | **Included** (Complete specifications) | Internal operational runbooks |
| **Business Applications & Use Cases** | **Included** (All 8 workload designs) | Production customer workflows |
| **Deterministic Risk Engine** | **Included** (Reference implementation) | Accelerated native microservices |
| **Synthetic Datasets & Schemas** | **Included** (100% synthetic CSVs) | Customer proprietary datasets |
| **Evaluation Framework & Metrics** | **Included** (Full methodology) | Continuous benchmarking harness |
| **Distributed Mesh Runtime** | Excluded | **Proprietary implementation** |
| **Coordinator & Worker Internals** | Excluded | **Proprietary implementation** |
| **Proprietary Model-Store Engine** | Excluded | **Proprietary implementation** |
| **Scheduler & Sharding Algorithms** | Excluded | **Proprietary implementation** |
| **Hardware Attestation & Cryptography** | Excluded | **Proprietary implementation** |

*For complete boundary documentation, see [`docs/proprietary-boundary.md`](docs/proprietary-boundary.md).*

---

## 10. Controlled POC Adoption Roadmap

The proposed pilot adoption roadmap progresses through seven structured stages:

* **Stage 0: Synthetic Data Validation** *(Current State — Runnable in this repo)*
* **Stage 1: Enterprise Sample Ingestion** *(Sample dump in isolated staging VM)*
* **Stage 2: Double-Blind Expert Evaluation** *(Scoring concordance against senior analysts)*
* **Stage 3: Controlled SecOps Pilot** *(Side-by-side evaluation with manual triage)*
* **Stage 4: Enterprise System Integration** *(Direct CMDB/SIEM connector integration)*
* **Stage 5: Production Staging Sign-Off** *(Full CISO / Infrastructure sign-off)*
* **Stage 6: Multi-Workload Expansion** *(Predictive maintenance & operational intelligence)*

*For the complete deployment plan, see [`poc/cesc/deployment-plan.md`](poc/cesc/deployment-plan.md) and [`poc/cesc/questions-for-enterprise.md`](poc/cesc/questions-for-enterprise.md).*

---

## 11. Project Status & Roadmap

```
[Q3 2026] Public Enterprise Architecture & Synthetic SecOps Demo (COMPLETED)
   ↓
[Q4 2026] Isolated Enterprise POC Deployments (Staging VLAN Baseline)
   ↓
[Q1 2027] Industrial OT Predictive Maintenance Telemetry Ingestion (Purdue Level 2)
   ↓
[Q2 2027] Federated Enterprise Mesh Node Attestation for Multi-Substation Utilities
```

---

## 12. Contact & Commercial Discovery

For enterprise technical inquiries, architecture evaluations, or scheduling a private POC discovery session:

* **Technical Lead:** Supratim Dhara ([supratim1609](https://github.com/supratim1609))
* **Organization:** FlockML Enterprise Architecture
* **Repository:** [https://github.com/supratim1609/flockml-enterprise](https://github.com/supratim1609/flockml-enterprise)
* **License:** [Apache License 2.0](LICENSE)

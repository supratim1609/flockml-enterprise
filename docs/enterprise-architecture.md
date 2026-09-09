# Enterprise Architecture Specification

## Overview

The **FlockML Enterprise Architecture** establishes a modular, zero-trust infrastructure stack for private AI execution. The system cleanly decouples enterprise data sources from the underlying model runtime, ensuring that proprietary corporate knowledge remains under administrative control while enabling high-throughput inference across heterogeneous hardware.

---

## High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Enterprise Boundary [Customer Controlled Network Boundary]
        subgraph Ingestion Layer [Data Ingestion & Connectors]
            DS1[("Asset Inventory / CMDB")]
            DS2[("Vulnerability Scanners")]
            DS3[("SCADA & Grid Telemetry")]
            DS4["Document Repositories"]
        end

        subgraph Processing Layer [Processing & Governance]
            P1["Validation & Schema Enforcement"]
            P2["Normalization & Tokenization"]
            P3["Anonymization & Sensitive Field Masking"]
        end

        subgraph Knowledge Layer [Local Knowledge & Retrieval]
            K1[("Air-Gapped Vector Index")]
            K2[("Structured Entity Graph")]
            K3["Hybrid Retrieval Engine"]
        end

        subgraph Runtime Layer [Private Model Runtime]
            R1["Local Model Weights Repository"]
            R2["Inference Gateway / Shard Coordinator"]
            R3["Local Compute Nodes / VMs / Workstations"]
        end

        subgraph Decision Layer [Intelligence & Decision Support]
            D1["Explainable Risk Scoring Engine"]
            D2["Attribution & Evidence Formatter"]
            D3["Role-Based Intelligence API"]
        end

        subgraph Consumption Layer [Enterprise Consumers]
            U1["SOC Analysts & CISO Dashboard"]
            U2["OT Grid Operations Engineers"]
            U3["Executive Leadership & Change Board"]
        end
    end

    DS1 & DS2 & DS3 & DS4 --> P1
    P1 --> P2 --> P3
    P3 --> K1 & K2
    K1 & K2 --> K3
    K3 -->|Grounded Context| R2
    R1 --> R2
    R2 <-->|Tensor Passes| R3
    R2 --> D1
    D1 --> D2 --> D3
    D3 --> U1 & U2 & U3
```

---

## Component Architecture Details

### 1. Data Ingestion & Integration Layer
- **Supported Formats:** Structured feeds (CSV, JSON, Parquet), database extracts (PostgreSQL, Oracle, SQL Server), and security scanner exports (Qualys XML/JSON, Tenable .nessus, OpenVAS).
- **Network Mode:** Read-only passive ingestion. Connectors operate in shadow mode and never issue administrative or state-altering commands to enterprise operational equipment.

### 2. Processing & Normalization Layer
- **Schema Validation:** Verifies mandatory fields (e.g., `asset_id`, `cvss_score`, `network_zone`).
- **Data Hygiene:** Strips private network credentials, non-essential personal identifiers, and malformed strings before indexing.
- **Deduplication:** Merges identical scanner findings across overlapping discovery cycles.

### 3. Knowledge & Retrieval Layer (RAG)
- **Local Embedding Generation:** Generates vector representations on-premises using lightweight, air-gapped embedding models.
- **Hybrid Retrieval:** Combines exact keyword BM25 filtering (for CVE identifiers and asset hostnames) with dense vector search (for semantic descriptions and operational contexts).
- **Access Gating:** Enforces role-based access control (RBAC) at the retrieval level so users only retrieve records authorized for their security clearance.

### 4. Private Model Runtime Layer
- **Weight Decoupling:** Model parameters (e.g., Llama, SmolLM, Qwen) remain immutable, pre-evaluated weight files loaded within the customer boundary.
- **Zero Cloud Egress:** All forward inference passes execute locally on enterprise virtual machines, dedicated servers, or pooled workstation compute.
- **Stateless Operation:** Prompt context buffers are zeroized from memory immediately upon completion of the inference pass.

### 5. Intelligence API & Decision Support Layer
- **RESTful Endpoints:** Standardized JSON endpoints for querying prioritized assets, posture summaries, and root-cause explanations.
- **Traceability Engine:** Every response packages the exact source record IDs, timestamps, and confidence score used during analysis.
- **Audit Logging:** Emits immutable, timestamped audit entries compatible with enterprise SIEM solutions (Splunk, Elastic, Sentinel).

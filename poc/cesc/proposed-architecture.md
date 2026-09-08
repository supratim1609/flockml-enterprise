# Proposed POC Architecture: Private Staging Environment

## 1. Staging Environment Overview

The proposed proof-of-concept operates entirely within an isolated staging environment hosted on **private virtual machines provided by the enterprise**, matching the infrastructure profile discussed with engineering leadership.

```mermaid
flowchart TD
    subgraph Enterprise Private Data Center
        subgraph Staging VLAN [Isolated Staging VLAN (100% Air-Gapped)]
            direction TB
            subgraph VM1 [Private VM 1: Data & Ingestion Layer]
                ING[Scanner Log Ingestion Parser]
                CMDB[Asset Criticality Cache]
                VEC[(Local Vector & Entity Store)]
            end

            subgraph VM2 [Private VM 2: Intelligence & Model Runtime]
                SCORE[Deterministic Risk Scoring Engine]
                LLM[Air-Gapped Foundation Model (Quantized)]
                API[REST Decision-Support API]
            end

            VM1 <-->|Internal Encrypted Stream| VM2
        end

        subgraph SecOps [Enterprise SecOps Personnel]
            ANALYST[SecOps Analyst Workstation]
            CISO[CISO / Executive Review Dashboard]
        end

        ANALYST & CISO -->|HTTPS Internal Access Only| API
    end

    subgraph External [External Internet / Public Cloud]
        INTERNET[Public Internet / AWS / OpenAI]
    end

    Staging VLAN -.->|PHYSICAL AIR-GAP: ZERO EGRESS| INTERNET
```

---

## 2. Infrastructure & Compute Specifications

| Component | Minimum Specification | Recommended Specification | Function |
| :--- | :--- | :--- | :--- |
| **Virtual Machine 1 (Ingestion & Store)** | 8 vCPUs, 16GB RAM, 100GB SSD | 16 vCPUs, 32GB RAM, 200GB SSD | Runs data parsers, normalization filters, and local vector index |
| **Virtual Machine 2 (Model & Scoring)** | 16 vCPUs, 32GB RAM, 100GB SSD | 32 vCPUs, 64GB RAM, 200GB SSD | Executes quantized local model inference and risk scoring |
| **Operating System** | Ubuntu Server 22.04 LTS / RHEL 8.6+ | RHEL 8.8 / 9.2 (Enterprise Standard) | Base enterprise operating environment |
| **GPU Acceleration** | **None (CPU INT8/INT4)** | Optional (1x NVIDIA L4 / A10 / T4) | Demonstrates viability without mandatory new hardware CapEx |

---

## 3. Data Ingestion & Boundary Control

1. **Input Interface:** Batched flat-file ingestion. Enterprise security personnel export sanitized vulnerability reports (CSV, JSON, XML) and place them in an internal drop folder on VM 1.
2. **Read-Only Operation:** The POC system has zero read or write access to production SCADA control networks, Active Directory, or live databases.
3. **Zero-Egress Auditing:** Enterprise network engineers can place a span port / Wireshark capture on the staging VLAN switch port to confirm that zero packets egress to external IP addresses.

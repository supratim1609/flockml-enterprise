# Public vs. Proprietary Repository Boundary

## 1. Architectural Boundary Overview

This repository (`flockml-enterprise`) is the official **public-facing architecture, product specification, and reference evaluation repository** for FlockML Enterprise.

To protect proprietary intellectual property while providing complete technical transparency to enterprise stakeholders, CISOs, and technical diligence evaluators, a strict boundary is maintained between this public repository and the private FlockML production codebase.

---

## 2. Public vs. Private Component Matrix

| Component / Subsystem | In This Public Repository | In Private FlockML Core Runtime | Technical Rationale |
| :--- | :---: | :---: | :--- |
| **Enterprise Architecture Blueprint** | **YES** | YES | Publicly documents how enterprise data interfaces with the AI layer |
| **Business Use Case Specifications** | **YES** | YES | Documents the 9 core enterprise application domains |
| **Synthetic Security Datasets** | **YES** | YES | Allows public and enterprise evaluation without exposing real data |
| **Deterministic Risk Scoring Engine** | **YES** | YES | Provides transparent, verifiable reference scoring (`npm run demo`) |
| **Evaluation Metrics & POC Criteria** | **YES** | YES | Defines objective acceptance gates for enterprise procurement |
| **Enterprise Data Dictionaries** | **YES** | YES | Establishes standard integration schemas for IT/SecOps teams |
| **Distributed Inference Runtime** | **NO** | **YES** | Proprietary tensor sharding, pipeline parallelism, and scheduling kernels |
| **Production Coordinator Engine** | **NO** | **YES** | High-concurrency cluster orchestration and dynamic work-stealing |
| **Worker Execution Kernels** | **NO** | **YES** | Optimized WebGPU, WASM SIMD, and native CPU acceleration code |
| **Proprietary Model-Store Engine** | **NO** | **YES** | Content-addressed sharding, replication, and JIT layer streaming |
| **Internal Cryptographic Implementations**| **NO** | **YES** | Production mTLS key handling, HSM integration, and token issuers |
| **Production Deployment Infrastructure** | **NO** | **YES** | Private cluster manifests, staging scripts, and deployment automation |

---

## 3. Why This Boundary Protects Enterprise Customers

1. **Clean Integration Surfaces:** Enterprise customers interact with FlockML through standardized, auditable APIs and file-based data ingestion interfaces rather than fragile, low-level internal code bindings.
2. **IP Isolation:** Customers do not risk cross-licensing complications or dependency bloat by evaluating reference documentation and synthetic demos.
3. **Controlled Enterprise Distribution:** When an organization enters a formal proof-of-concept or commercial pilot, the production runtime is deployed via signed, tamper-evident container images or air-gapped binary bundles directly into the customer's private virtual machine environment.

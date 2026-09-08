# Enterprise Deployment Models

FlockML Enterprise is engineered with a modular deployment architecture that supports a gradual, low-risk adoption path. **Enterprises are not required to deploy a complex distributed mesh to get started.** The platform scales smoothly from a single private virtual machine to an enterprise-wide distributed compute fabric.

---

## Deployment Models Summary

| Deployment Model | Compute Infrastructure | Network Environment | Operational Complexity | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Model 1: Single Enterprise Server / VM** | 1 Dedicated Linux VM (16–32 vCPUs, 64GB RAM) | Isolated Internal Subnet | **Lowest** (Turnkey) | Rapid POC validation, single department analytics |
| **Model 2: Private VM Cluster** | 2–4 Virtual Machines (App Server + DB + Model VM) | Corporate Private VLAN | **Low–Medium** | Enterprise production for SOC / SecOps teams |
| **Model 3: Air-Gapped OT Substation** | Local Substation Workstations / Edge RTUs | Fully Isolated OT Network (Purdue L3) | **Medium** | Power grid distribution, SCADA telemetry analysis |
| **Model 4: Secure Hybrid Deployment** | On-premise Ingestion + Isolated Cloud Enclave | Dedicated Encrypted Direct Connect / IPsec | **Medium–High** | Multi-region enterprises with hybrid cloud infrastructure |
| **Model 5: Distributed Enterprise Mesh** | Distributed idle desktop PCs / workstations | Local Corporate / Zonal LAN | **Advanced** | Scaling 70B models without new GPU hardware CapEx |

---

## Detailed Model Specifications

### Model 1: Single Enterprise Server / VM (Recommended for Initial POC)
- **Topology:** All ingestion, indexing, deterministic scoring, and lightweight local model inference reside within a single private virtual machine (e.g., VMware vSphere or KVM).
- **Data Boundary:** Strictly contained within one virtual machine. Zero outbound traffic.
- **Hardware Requirements:** 16 vCPU cores, 32GB–64GB RAM, 200GB SSD storage. GPU optional (CPU-quantized models run effectively for batch vulnerability triage).
- **Trade-Offs:** Simplest deployment with zero distributed networking overhead; limited to small-to-medium foundation models (e.g., 1B–8B parameters).

```
┌────────────────────────────────────────────────────────────┐
│ SINGLE PRIVATE VM (CESC Internal Network)                  │
│ • Data Ingestion & Parser (CSV / Scanner logs)             │
│ • Local SQLite / Vector Store                              │
│ • Deterministic Risk Scoring Engine                        │
│ • Local AI Inference Runtime                               │
└────────────────────────────────────────────────────────────┘
```

---

### Model 2: Private VM Cluster (Production Enterprise Security)
- **Topology:** Decoupled architecture separating the Ingestion API gateway, the Vector Knowledge base, and dedicated model inference workers across multiple private VMs.
- **Data Boundary:** Network traffic restricted to an internal enterprise security VLAN with strict firewall ACLs.
- **Hardware Requirements:** 2–4 VMs with dedicated compute allocation. Optional PCIe GPU passthrough (e.g., NVIDIA A10/L4 or high-core AMD EPYC).
- **Trade-Offs:** Provides high availability, load balancing, and independent scaling of ingestion vs inference workloads.

---

### Model 3: Air-Gapped OT Substation Deployment
- **Topology:** Deployed at zonal substation hubs or regional control centers directly at **Purdue Model Level 3 (Operations Monitoring)**.
- **Data Boundary:** Complete physical or logical air-gap. Receives unidirectional mirrored telemetry via data diodes or read-only network taps. Zero route to the internet.
- **Trade-Offs:** Absolute cybersecurity compliance with CEA / NCIIPC guidelines; requires local administrative access for periodic offline model update bundles.

---

### Model 4: Secure Hybrid Enclave
- **Topology:** Enterprise data ingestion and tokenization execute on-premises; pre-processed context is transmitted across dedicated encrypted IPsec tunnels into a private, customer-owned cloud enclave (e.g., AWS GovCloud / Azure Confidential Computing).
- **Data Boundary:** Customer retains full cryptographic ownership of encryption keys via on-premise HSM.
- **Trade-Offs:** Leverages scalable cloud compute while preserving sovereign control, but introduces WAN latency and requires dedicated leased lines.

---

### Model 5: Distributed Enterprise Mesh (FlockML Advanced Compute Fabric)
- **Topology:** Utilizes existing enterprise workstations and desktop PCs that sit idle outside core working hours, clustering their WebGPU/CPU resources into a unified execution fabric for batch processing large (70B) models.
- **Data Boundary:** Constrained strictly to internal zonal LAN segments with mTLS authentication.
- **Trade-Offs:** Eliminates the need for expensive new GPU server CapEx; requires initial local agent enrollment across desktop fleets.

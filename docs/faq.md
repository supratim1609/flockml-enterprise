# Frequently Asked Questions (FAQ)

### 1. Does FlockML Enterprise stream customer data to OpenAI, AWS, or external cloud APIs?
**No.** FlockML Enterprise is an on-premises, air-gapped infrastructure layer. All data ingestion, vector indexing, retrieval, and model inference execute strictly within the customer's private virtual machines or on-premise hardware. Zero bytes of enterprise data, prompts, or telemetry ever leave the customer-approved network boundary.

---

### 2. Does FlockML replace our existing vulnerability scanner (e.g., Tenable, Qualys, Rapid7)?
**No.** FlockML Enterprise does not replace your vulnerability scanner; it acts as an **intelligence and decision-support layer on top of your existing tools**. Scanners produce raw lists of 10,000+ CVE findings. FlockML ingests those findings, cross-references them with your business asset criticality and network topology, and generates prioritized, explainable action plans for your SecOps team.

---

### 3. Do we need to purchase dedicated NVIDIA GPUs to evaluate a proof-of-concept?
**No.** For the initial proof-of-concept (POC), FlockML Enterprise is designed to run on **standard enterprise virtual machines (e.g., 16–32 vCPUs on VMware vSphere or KVM)** using quantized open-weight models (e.g., 8B-parameter models quantized to INT4/INT8). GPU acceleration is optional and can be introduced later if ultra-high-throughput streaming is required.

---

### 4. Can FlockML autonomously patch systems, modify firewalls, or reboot equipment?
**No.** FlockML Enterprise operates strictly as a **decision-support platform**. It analyzes risk, ranks assets, and drafts actionable remediation scripts. All operational changes must be reviewed and executed by authorized human engineers following standard enterprise Change Advisory Board (CAB) protocols.

---

### 5. How does the architecture satisfy Central Electricity Authority (CEA) and DPDP Act mandates?
By running entirely inside your private operational network (Purdue Level 3 or corporate private VLAN), data never crosses international borders or multi-tenant cloud environments. Network egress can be audited and verified using a physical network tap (e.g., Wireshark) during all staging and production operations.

---

### 6. How is enterprise knowledge kept separate from foundation model weights?
FlockML employs a Retrieval-Augmented Generation (RAG) architecture. Model weights are static and immutable; enterprise records are queried from an encrypted local index at runtime. Enterprise data is never used for unsupervised background training, eliminating the risk of accidental weight contamination or data leakage.

---

### 7. How long does an initial staging POC take to set up?
A reference proof-of-concept is structured across a **14-day timeline** requiring only access to an isolated virtual machine and synthetic or sanitized scanner exports. No production SCADA or enterprise network integration is required for initial validation.

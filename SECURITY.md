# Security Policy

## Scope and Repository Purpose

This repository (`flockml-enterprise`) is a **public-facing architecture, specification, and evaluation repository** for FlockML Enterprise.

It provides:
- Architectural blueprints, data flow diagrams, and threat boundary models
- Proposed proof-of-concept (POC) specifications and acceptance criteria
- Deterministic reference implementations operating strictly on synthetic datasets
- Business capability mappings for regulated enterprise workloads

### What Must NEVER Be Committed to this Repository
To maintain strict enterprise security and data sovereignty standards, the following materials must never be committed to this repository:
1. **No Enterprise or Customer Data:** Real asset inventories, vulnerability scan exports, network topologies, logs, or proprietary records from any organization (including proposed pilot partners such as CESC or government bodies). All examples must use explicitly labeled synthetic datasets.
2. **No Production Credentials or Secrets:** API keys, access tokens, passwords, private keys (`.pem`, `.key`), certificates (`.crt`), session cookies, or service account credentials.
3. **No Proprietary FlockML Engine Source Code:** Core distributed runtime internals, production coordinator engines, worker execution engines, proprietary model-store implementations, and private consensus/cryptographic algorithms are maintained in private, access-controlled repositories and delivered only through enterprise deployment channels.
4. **No Internal Infrastructure Topologies:** Internal IP addresses, private hostnames, firewall rules, or VPN configurations of any customer or staging environment.

---

## Enterprise Security Architecture Principles

FlockML Enterprise is engineered around strict defense-in-depth principles:
- **Zero Cloud Egress:** All enterprise data ingestion, vector indexing, retrieval, and inference execute within the customer-approved boundary (air-gapped LAN, private virtual machines, or on-premises servers).
- **No Uncontrolled Model Retraining:** Foundation models are deployed as static, evaluated weights. Enterprise data serves strictly as a grounded knowledge source (via RAG or local secure caching), preventing accidental memorization or data leakage.
- **Traceable Decision Support:** AI outputs do not perform autonomous write or remediation actions against customer infrastructure. All outputs provide explicit evidence citations and confidence metrics for human-in-the-loop validation.

---

## Reporting a Vulnerability

If you discover a potential security issue or vulnerability within this documentation or reference code:

1. **Do not create a public GitHub issue.**
2. Send an email directly to: **`supratimdhara0@gmail.com`**
3. Include:
   - A description of the vulnerability and affected file(s)
   - Steps to reproduce or proof of concept
   - Proposed mitigation (if identified)

You will receive an acknowledgment within 24 hours. We coordinate responsible disclosure and remediations prior to any public advisory.

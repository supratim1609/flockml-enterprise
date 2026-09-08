# Enterprise Security & Isolation Boundaries

> **Document Classification:** Public Reference Architecture  
> **Target Audience:** Chief Information Security Officer (CISO), Red Team / Blue Team, Compliance Auditors  
> **Status:** Architected Reference Security Model

---

## 1. Zero-Trust Security Perimeter

The FlockML Enterprise architecture treats all external networks, untrusted hosts, and public clouds as untrusted environments. The entire intelligence pipeline is contained within an enterprise-controlled trust boundary.

```
+-------------------------------------------------------------------------+
|                  ENTERPRISE CONTROLLED TRUST BOUNDARY                   |
|                                                                         |
|  +--------------------+        +-------------------------------------+  |
|  | Enterprise Sources |        | FlockML Isolated Execution Pod      |  |
|  | - Nessus / Qualys  |======>>| - Zero-Egress Firewall              |  |
|  | - Enterprise CMDB  | (mTLS) | - Ingestion & Normalizer            |  |
|  +--------------------+        | - Deterministic Scoring Engine      |  |
|                                | - Local Model Runtime (No external) |  |
|                                +-------------------------------------+  |
|                                                    ||                   |
|                                                    \/                   |
|                                        +-----------------------+        |
|                                        | Human SecOps Console  |        |
|                                        | - 100% Traceability   |        |
|                                        | - Human-in-the-Loop   |        |
|                                        +-----------------------+        |
+-------------------------------------------------------------------------+
                                    X
                     [ BLOCKED INTERNET EGRESS ]
                                    X
```

---

## 2. Core Security Controls

### 2.1 Data Residency & Network Isolation
* **Zero External Egress:** System firewall rules explicitly drop all egress traffic to public internet CIDRs. DNS resolution is restricted to internal enterprise name servers.
* **Isolated VLAN Deployment:** The system resides in an isolated management VLAN with strict ingress control (TCP/443 via internal TLS reverse proxy only).

### 2.2 Authentication & Authorization (RBAC)
* **Identity Integration:** Integrates with enterprise Active Directory / LDAP or SAML 2.0 / OAuth2 Identity Providers.
* **Granular Role-Based Access:**
  * `SecOps_Viewer`: Can view prioritized asset rankings and natural language explanations.
  * `SecOps_Analyst`: Can execute queries, adjust operational filters, and export remediation tickets.
  * `Security_Admin`: Can calibrate risk weights, configure scanner ingestion pipelines, and view audit trails.

### 2.3 Cryptography & Secrets Management
* **Encryption in Transit:** All internal API endpoints enforce TLS 1.3 with cipher suites limited to modern AEAD algorithms (e.g., `TLS_AES_256_GCM_SHA384`).
* **Encryption at Rest:** All storage volumes (ingested CSVs, graph indexes, local embeddings) are encrypted using AES-256 via enterprise-managed KMS keys or Linux LUKS full-disk encryption.
* **Zero Hardcoded Secrets:** Credentials, API tokens, and database passwords are injected strictly via Linux environment variables or HashiCorp Vault / AWS Secrets Manager. Never committed to source repositories.

### 2.4 Auditability & Tamper-Evident Logging
* Every scoring cycle, user query, risk weight modification, and ticket export generates an immutable structured JSONL log record containing:
  * Timestamp (UTC ISO 8601)
  * Authenticated User ID / Subject
  * Action Identifier & Parameters
  * SHA-256 hash of input datasets and output rankings
* Logs are streamed via RFC 5424 Syslog to the enterprise SIEM (Splunk, IBM QRadar, or Elastic) with write-once retention.

---

## 3. AI-Specific Threat Modeling & Mitigations

| Threat Vector | Risk Description | FlockML Enterprise Mitigation |
|---|---|---|
| **Prompt Injection** | Adversary crafts malicious text in CVE descriptions or asset names to hijack model instructions. | **Context Quarantine & Strict Framing:** Model instructions are placed in isolated system frames. Ingested data is strictly wrapped in delimiters (`<context>...</context>`). The model is barred from executing tools or shell commands. |
| **Retrieval Poisoning** | Ingestion of falsified scanner outputs to artificially depress an asset's risk score. | **Cryptographic Ingestion Verification:** Scanner exports must match pre-registered digital signatures or originate from verified API service accounts. |
| **Model Hallucination** | Generative model fabricates non-existent CVEs, vulnerabilities, or remediation recommendations. | **Deterministic Fact Anchoring:** Raw rankings and scores are produced by the deterministic engine. The LLM is restricted to summarizing provided records; ungrounded statements trigger explicit confidence warnings. |
| **Sensitive Data Leakage** | Confidential system passwords, credentials, or internal IPs leaked to unauthorized users. | **Regex & PII Sanitizer:** Ingestion filters automatically mask detected credentials, passwords, and sensitive regex patterns prior to indexing. |
| **Insider Threat** | Malicious insider attempts to tamper with risk scores to conceal unpatched assets. | **Dual-Custody Logging:** Weight configuration changes require two-party administrative sign-off and trigger instant SIEM alert notifications. |
| **Compromised Worker / Host** | Vulnerability in runtime dependencies exploited to compromise the execution node. | **Least-Privilege Containerization:** Pods run as non-root users (`uid: 10001`), read-only root filesystems, and dropped Linux capabilities (`CAP_SYS_ADMIN` disabled). |
| **Supply-Chain Risk** | Compromised third-party packages or model weights. | **Vendor-Controlled Binaries:** Zero-dependency baseline for deterministic engines; pinned dependency hashes (`package-lock.json`); offline model weight validation. |

---

## 4. Compliance Notice

> [!IMPORTANT]
> FlockML Enterprise provides the architectural foundations and security primitives to support compliance with frameworks such as **CEA Cybersecurity Regulations for Power Sector**, **CERT-In Directives**, **ISO/IEC 27001**, and the **Digital Personal Data Protection (DPDP) Act 2023**.  
> **However, compliance certifications are not pre-packaged software attributes.** Official compliance must be independently evaluated and certified against the customer's final physical deployment architecture, operational policies, and host infrastructure.

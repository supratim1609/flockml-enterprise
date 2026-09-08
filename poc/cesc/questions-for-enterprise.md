# Technical & Architectural Discovery: Enterprise Questionnaire

> **Document Classification:** Enterprise Discovery / Reference Questionnaire  
> **Audience:** CISO, Chief Technology Officer, Head of IT Infrastructure, Head of Security Operations  
> **Purpose:** Structured questions to ensure high-velocity, secure alignment for the proposed FlockML Enterprise Security Intelligence POC.

---

## 1. Data Ecosystem & Ingestion Sources

1. **Vulnerability Assessment Tooling:**
   - Which vulnerability scanner(s) are currently deployed across the enterprise? (e.g., Tenable Nessus / Tenable.sc, Qualys Cloud Platform, Rapid7 InsightVM, OpenVAS, Greenbone?)
   - Are scans centralized in a SIEM / Vulnerability Management dashboard, or exported as standalone XML/CSV/JSON reports?
   - What is the scan cadence (e.g., weekly external, monthly internal, quarterly OT)?

2. **Asset Inventory & CMDB:**
   - What system of record serves as the authoritative asset inventory? (e.g., ServiceNow CMDB, Microsoft Active Directory, manual Excel register, SolarWinds, Lansweeper?)
   - Does the CMDB maintain explicit metadata for:
     - Operational criticality (Tier 1 mission-critical vs. Tier 4 non-critical)?
     - Network segmentation / zone assignment (e.g., Purdue Model Level 0–4, Corporate IT, DMZ, Substation LAN)?
     - Internet exposure status?
     - System owner / designated remediation team?
   - What unique identifier is consistent between scan outputs and CMDB records (e.g., FQDN, MAC Address, Private IP, NetBIOS Name)?

3. **Threat Intelligence & Remediation Data:**
   - Does the enterprise ingest external threat intelligence feeds regarding active in-the-wild exploitation (e.g., CISA KEV, Recorded Future, MISP)?
   - Where is patch SLA tracking managed? (e.g., Jira Service Management, ServiceNow ITSM, Remedy)?

---

## 2. Infrastructure, Security & Network Isolation

1. **Host Environment:**
   - Where will the isolated POC environment be provisioned? (e.g., dedicated on-premise VMware ESXi cluster, OpenStack VM, isolated bare-metal server in internal DMZ?)
   - What compute resources can be allocated for the POC staging environment? (e.g., 4–8 vCPUs, 16–32 GB RAM, optional NVIDIA GPU or CPU-only inference)?

2. **Network Egress Boundaries:**
   - Can the POC host operate under a strict **Zero-Egress Firewall Rule** (all outbound internet ports blocked, zero DNS resolution to public domains)?
   - If model weights or binaries need initial staging, what is the approved internal repository or air-gapped staging mechanism (e.g., internal Artifactory, scp via jump host)?

3. **Authentication & Access Control:**
   - What identity provider will be used for analyst access during the POC? (e.g., local mock accounts, enterprise LDAP, Active Directory / Kerberos, SAML 2.0 / Keycloak)?
   - How are roles divided between Security Analysts (viewing recommendations) and System Administrators (tuning risk weights)?

4. **Compliance & Audit Policies:**
   - Does the enterprise have specific logging format requirements (e.g., Syslog RFC 5424 to internal Splunk/QRadar)?
   - What are the mandatory data retention and end-of-POC sanitization procedures required by the CISO?

---

## 3. Business Stakeholders & Workflow Integration

1. **Primary Consumers:**
   - Who will be the day-to-day consumers of the prioritization output?
     - SOC Tier-1 / Tier-2 Analysts (triaging incoming scanner alerts)?
     - Vulnerability Management Engineers (creating remediation tickets)?
     - Systems Engineering / Patch Management teams (executing OS/firmware upgrades)?
     - CISO / IT Leadership (reviewing weekly risk posture dashboards)?

2. **Current Bottlenecks & Operational Pain Points:**
   - How many raw findings does the enterprise typically process in a monthly or quarterly cycle?
   - How much time does a security engineer currently spend filtering and deduping scanner spreadsheets before sending tickets to system owners?
   - What is the most common cause of remediation delays (e.g., unclear ownership, inability to distinguish internet-facing risk, fear of breaking critical OT services)?

---

## 4. Success Criteria & Value Validation

1. **Measurable Outcomes:**
   - What specific metric would demonstrate that the POC was successful? (e.g., reducing prioritization time by 75%, eliminating 90% of false escalations on air-gapped assets, achieving 100% auditability for CEA/CERT-In reporting)?
   - What would constitute an immediate disqualifier or failure?

2. **Baseline Comparison:**
   - Will senior security personnel be available to participate in a blind validation exercise (comparing manual spreadsheet rankings against FlockML deterministic outputs on an identical sample dataset)?

---

## 5. Model Architecture & Intelligence Strategy

1. **AI Governance & Hosting Preference:**
   - Does enterprise policy mandate a **100% local / offline model** (e.g., Llama-3-8B-Instruct or Mistral-7B running on local CPU/GPU)?
   - Or is an enterprise private cloud endpoint (e.g., Azure OpenAI on private VNet / AWS Bedrock GovCloud) permitted for natural language generation?
   - *FlockML recommendation:* For the initial POC, execute with local deterministic risk scoring and local small-footprint inference—ensuring zero external API dependency.

2. **RAG vs. Fine-Tuning:**
   - Does the enterprise agree with the Level 1 RAG-style approach (enterprise data kept as a structured retrieval index without foundation model retraining)?

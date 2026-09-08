# Data Dictionary: Security Intelligence Reference Datasets

> **NOTICE:** All data in this directory is strictly **SYNTHETIC AND HYPOTHETICAL**. It does not represent CESC Limited, any government department, or any real production infrastructure.

---

## 1. Asset Inventory Schema (`synthetic-assets.csv`)

| Field Name | Type | Description | Allowed Values / Format |
| :--- | :--- | :--- | :--- |
| `asset_id` | String | Unique asset identifier | `AST-XXX` |
| `asset_name` | String | Human-readable hostname or device designation | Alphanumeric |
| `asset_type` | String | Functional category of hardware/software | `OT-Gateway`, `Data-Historian`, `Web-Server`, `Telemetry-Ingest`, `Remote-Terminal`, `Database-Cluster`, `API-Gateway`, `Network-Core`, `Workstation`, `Identity-Auth`, `IoT-Concentrator` |
| `business_unit` | String | Responsible enterprise business group | e.g., `Grid Operations`, `Commercial IT`, `Smart Metering`, `Distribution` |
| `network_zone` | String | Network segmentation tier per Purdue model / ISA-95 | `OT-CONTROL-ZONE`, `OT-DMZ`, `IT-CORPORATE`, `EXTERNAL-DMZ` |
| `criticality` | Enum | Impact on operations if system is compromised | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `internet_exposed` | Boolean | Whether asset has a public IP or direct ingress path | `TRUE`, `FALSE` |
| `operating_system`| String | Base operating system and patch level | Text |
| `owner` | String | Responsible administrative team | Text |
| `location` | String | Physical facility or data center | Text |
| `last_patch_date` | Date | Date of last verified patch cycle | `YYYY-MM-DD` |

---

## 2. Vulnerability Catalog Schema (`synthetic-vulnerabilities.csv`)

| Field Name | Type | Description | Allowed Values / Format |
| :--- | :--- | :--- | :--- |
| `cve_id` | String | Common Vulnerabilities and Exposures identifier | `CVE-YYYY-XXXXX` |
| `severity` | Enum | Qualitative severity tier | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `cvss_score` | Float | Common Vulnerability Scoring System base score | `0.0` to `10.0` |
| `description` | String | Technical summary of exploit mechanism | Text |
| `affected_product` | String | Software package, service, or firmware | Text |
| `exploit_available` | Boolean | Whether functional exploit code or active CISA KEV listing exists | `TRUE`, `FALSE` |
| `published_date` | Date | Public disclosure date | `YYYY-MM-DD` |

---

## 3. Scanner Findings Schema (`synthetic-findings.csv`)

| Field Name | Type | Description | Allowed Values / Format |
| :--- | :--- | :--- | :--- |
| `finding_id` | String | Unique finding record identifier | `FND-XXX` |
| `asset_id` | String | Target asset foreign key | Foreign Key to `synthetic-assets.csv` |
| `cve_id` | String | Discovered vulnerability foreign key | Foreign Key to `synthetic-vulnerabilities.csv` |
| `first_seen` | Date | Timestamp of first detection | `YYYY-MM-DD` |
| `last_seen` | Date | Timestamp of most recent scanner confirmation | `YYYY-MM-DD` |
| `status` | Enum | Current triage lifecycle state | `OPEN`, `IN_PROGRESS`, `REMEDIATED`, `ACCEPTED_RISK` |
| `remediation_deadline` | Date | Policy-mandated SLA completion date | `YYYY-MM-DD` |
| `scanner_source` | String | Scanner tool or sensor agent | e.g., `Qualys-Cloud-Agent`, `Tenable-OT-Scanner`, `Internal-Nessus-Engine` |

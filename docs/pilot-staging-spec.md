# Enterprise Pilot Specification: Staging VM & Network Boundary (14-Day Pilot)

**Document Version:** 1.0 (Enterprise Staging Specification)  
**Target:** Enterprise InfoSec & Infrastructure Engineering Teams  
**Platform:** FlockML Enterprise Distributed Inference Engine  

---

### 1. Pilot Objective & Scope
A 14-day, zero-cost, non-intrusive evaluation of FlockML Sovereign: running decentralized, on-premise AI inference across an isolated test environment to detect synthetic anomalies and high-throughput telemetry spikes with **zero cloud egress** and **zero hardware procurement**.

---

### 2. Infrastructure & VM Resource Sizing

The pilot requires zero specialized GPU hardware. All nodes run on standard commodity x86_64 virtualization (VMware ESXi, Nutanix, Hyper-V, or KVM) or existing desktop workstations.

| Node Role | Count | vCPU | RAM | Storage | OS | Network Interface |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FlockML Coordinator Node** | 1 | 4 vCPU | 16 GB | 50 GB SSD | Ubuntu 22.04 LTS or RHEL 8/9 | 1 Gbps vNIC (Local Subnet) |
| **FlockML Distributed Workers** | 2 – 4 | 2 – 4 vCPU | 8 – 16 GB | 30 GB SSD | Ubuntu / RHEL / Windows 11 | 1 Gbps vNIC (Local Subnet) |

*Total footprint across entire pilot: ~12–16 vCPUs and ~48–64 GB RAM across all test nodes combined.*

---

### 3. InfoSec Network Boundary & Architecture

Built strictly to satisfy air-gapped enterprise and critical utility cybersecurity standards:

```
+-------------------------------------------------------------------------------+
|                       ENTERPRISE ISOLATED TEST SUBNET / VLAN                  |
|                                                                               |
|  +--------------------+         Outbound-only WSS (Port 443)  +------------+  |
|  | Distributed Worker | ------------------------------------> | FlockML    |  |
|  | Node 01 (VM/PC)    |       (Mutual HMAC-SHA256 Auth)       | Staging    |  |
|  +--------------------+                                       | Coord      |  |
|                                                               | (Local VM) |  |
|  +--------------------+         Outbound-only WSS (Port 443)  |            |  |
|  | Distributed Worker | ------------------------------------> |            |  |
|  | Node 02 (VM/PC)    |                                       +------------+  |
|  +--------------------+                                              |        |
|                                                                      v        |
|                         [Passive Read-Only Telemetry Mirror (CSV/Syslog/MQTT)] |
+-------------------------------------------------------------------------------+
                                       |
                   [STRICT AIR-GAP: ZERO INTERNET EGRESS]
```

1. **Zero Inbound Listening Ports on Workers:** Worker nodes never listen on public or corporate interfaces. Workers establish persistent, outbound-only encrypted WebSocket connections (Port 443) to the local Coordinator.
2. **Mutual Cryptographic Authentication:** Every node authenticates with constant-time HMAC-SHA256 signatures, cryptographic node tokens, and monotonic frame sequencing.
3. **100% Air-Gapped Operation:** All model weights, activations, and telemetry remain inside the local network. Zero telemetry, logs, or metadata leave enterprise premises.
4. **Passive Ingestion Only:** Read-only ingestion via static CSV logs, syslog streams, or synthetic MQTT topics. Zero write permissions and zero operational control commands.

---

### 4. Deployment & Turnkey Execution

- **Setup Time:** Under 30 minutes. Single binary execution (`flockml-node`) with zero external internet dependencies during runtime.
- **Rollback / Cleanup:** Instant. Deleting the staging folder or spinning down the test VMs leaves zero persistent system hooks, kernel modifications, or registry changes.
- **Support:** Dedicated engineering guidance and on-premise pairing.

---

### 5. Day-14 Deliverables & Decision Gate

At the conclusion of the 14-day evaluation, InfoSec and Infrastructure leadership receives:
1. **Empirical Latency & Throughput Benchmark:** Verified tokens/sec and sub-10ms inter-node activation transfer timings on enterprise test infrastructure.
2. **Data Sovereignty Verification Log:** Network capture proving 0.00 bytes of outbound egress.
3. **TCO & Savings Analysis:** Empirical report proving >75% infrastructure cost reduction compared to dedicated cloud GPU instances.

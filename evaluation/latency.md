# Latency & Performance Benchmarking

> **Document Classification:** Engineering Performance Specification  
> **Status:** Reference Benchmarks & Testing Protocols (To be calibrated on enterprise hardware)

---

## 1. Latency Profile Overview

FlockML Enterprise separates latency into two distinct operational profiles:
1. **Deterministic Analytical Pipeline:** Pure mathematical execution (parsing, entity resolution, composite scoring, ranking, and structured filtering). Sub-second execution on standard CPU hardware.
2. **Generative Synthesis Pipeline (Optional):** Local LLM inference producing natural-language narrative briefings and executive summaries. Dependent on hardware acceleration (AVX-512 CPU or NVIDIA GPU).

---

## 2. Reference Performance Benchmarks

The following benchmarks represent baseline performance measured across standard hardware configurations using the synthetic security intelligence pipeline:

| Dataset Scale (Findings) | Processing Stage | Hardware Environment | Measured Latency / Throughput | Status |
|---|---|---|---|---|
| **1,000 Findings** (15 Assets) | CSV Ingestion & Validation | Apple M-Series / Intel Xeon (4 cores) | **< 35 ms** | Validated Locally |
| **1,000 Findings** (15 Assets) | Deterministic Risk Scoring | Apple M-Series / Intel Xeon (4 cores) | **< 20 ms** | Validated Locally |
| **1,000 Findings** (15 Assets) | Top-10 Sorting & Formatting | Apple M-Series / Intel Xeon (4 cores) | **< 5 ms** | Validated Locally |
| **1,000 Findings** (Total) | **End-to-End Deterministic CLI** | Standard Laptop / VM (4 vCPU) | **< 180 ms** | Validated Locally |
| **10,000 Findings** (150 Assets) | Ingestion & Composite Scoring | Enterprise VM (8 vCPU, 16 GB RAM) | **< 850 ms** | Target (To be validated during POC) |
| **100,000 Findings** (Enterprise) | Ingestion & Composite Scoring | Enterprise VM (16 vCPU, 32 GB RAM) | **< 4.5 seconds** | Target (To be validated during POC) |
| **Generative Synthesis (8B Model)**| Local LLM Natural Language Output | CPU Only (8 vCPU, AVX-512) | **6 – 12 tokens/sec** | Reference Baseline |
| **Generative Synthesis (8B Model)**| Local LLM Natural Language Output | 1x NVIDIA A10G / L4 (PCIe) | **45 – 75 tokens/sec** | Reference Baseline |

---

## 3. Latency Verification Protocol

During Stage 1 and Stage 2 of the enterprise POC, latency must be formally profiled using the enterprise's designated VM infrastructure using the following procedure:

1. **Warm-up Run:** Ingest 100 sample findings to initialize memory buffers and V8 JIT compilation.
2. **Timed Iterations:** Execute 50 consecutive runs across the full sample dataset.
3. **Statistical Aggregation:** Calculate **P50 (Median)**, **P95**, and **P99** latency percentiles.
4. **Memory Profiling:** Verify that heap allocation returns to baseline post-garbage collection with zero memory leakage.

```bash
# Automated Latency Benchmark Command (TypeScript)
npm run demo -- --profile --iterations=50
```

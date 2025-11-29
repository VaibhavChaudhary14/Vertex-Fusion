# ⚡️ Vertex Fusion

### **Next-Gen Cyber-Physical Intrusion Detection System (IDS) for Smart Power Grids**

**Vertex Fusion** is a SaaS-ready platform that secures smart power grids using **Cyber–Physical data fusion** and **Graph Neural Networks (GNNs)**.
By jointly analyzing network activity and real-time electrical measurements, Vertex Fusion detects sophisticated cyberattacks that conventional IDS tools cannot identify.

---

## 📖 Scientific Foundation

This implementation is based on the research paper:

**“Cyber-Physical Fusion for GNN-Based Attack Detection in Smart Power Grids”**
*IEEE Open Access Journal of Power and Energy (2025)*

Vertex Fusion represents the power grid as a **graph**
[
\mathcal{G} = (\mathcal{V},\mathcal{E}, W)
]
connecting **physical buses**, **sensors**, and **cyber routers**.
This enables learning spatial and temporal correlations across the entire grid.

**Key findings from the referenced work:**

* Multi-modal fusion improves detection accuracy by **up to 16%** vs. single-layer IDS.
* Chebyshev GNNs extract structural dependencies essential for smart-grid defense.
* The fusion pipeline remains robust even under **partial observability**.

---

## 🚀 Key Features

### 🛡️ Multi-Modal Data Fusion

Correlates:

* Network logs (IPs, ports, protocols)
* Physical sensor data (Voltage RMS, Phase Angle, Active Power)

### 🧠 Chebyshev GNN Engine

Custom **PyTorch Geometric** model using Chebyshev graph convolutions to learn spatial grid features.

### ⏱️ Real-Time Data Imputation

Automatically synchronizes high-frequency physical data with event-driven cyber logs.

### 👁️ Dynamic Observability Modes

* **Full Observability** — all grid nodes
* **Partial Observability** — only critical nodes

### 🚨 Attack Detection Capabilities

Trained for major cyber-physical threat classes:

* Ransomware (RW)
* False Data Injection (FDI)
* Brute Force (BF)
* Reverse Shell (RS) & Backdoors

---

## 🏗️ System Architecture

Vertex Fusion consists of **three containerized microservices**:

### **1. Ingestion API (FastAPI)**

* High-throughput cyber/physical ingestion
* Time synchronization & imputation engine

### **2. Inference Engine (PyTorch Geometric)**

* Graph construction
* GNN forward pass
* Real-time attack scoring

### **3. Control Dashboard (Next.js)**

* Grid topology visualization via React Flow
* Real-time alerts & health metrics

---

## 🛠️ Installation & Setup

### **Prerequisites**

* Docker & Docker Compose
* Node.js 18+ (for local frontend development)
* Python 3.10+ (for backend development)

---

## ⚡ Quick Start (Docker)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/vertex-fusion.git
cd vertex-fusion

# 2. Build and run all services
docker-compose up --build
```

**Services start at:**

* **Dashboard:** [http://localhost:3000](http://localhost:3000)
* **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚙️ Topology Configuration

To monitor a grid, upload a **Topology Configuration JSON** describing cyber-physical connectivity.

### Example: `topology.json`

```json
{
  "project_name": "IEEE_14_Bus_Demo",
  "observability_mode": "full",
  "nodes": [
    { "id": "BUS_1", "layer": "physical", "type": "generator" },
    { "id": "RTR_1", "layer": "cyber", "type": "router" }
  ],
  "edges": [
    {
      "source": "BUS_1",
      "target": "RTR_1",
      "type": "cyber_physical_coupling",
      "weight": 1.0
    }
  ]
}
```

The **adjacency matrix (W)** is generated automatically.

---

## 📡 API Usage

### **Cyber Packet Ingestion**

```json
POST /api/ingest/cyber
{
  "src_mac": "00:1B:44:11:3A:B7",
  "dst_ip": "192.168.1.50",
  "protocol": "MODBUS",
  "packet_size": 64,
  "timestamp": 1716901200.5
}
```

### **Physical Sensor Ingestion**

```json
POST /api/ingest/physical
{
  "voltage_p1": 230.5,
  "frequency": 60.01,
  "active_power": 1500.2,
  "timestamp": 1716901200.5
}
```

---

## 📂 Project Structure

```
vertex-fusion/
├── backend/
│   ├── app/
│   │   ├── api/              # FastAPI Routes
│   │   ├── core/             # Config & Security
│   │   ├── engine/           # GNN & Synchronization Logic
│   │   │   ├── gnn_model.py
│   │   │   └── synchronizer.py
│   │   └── schemas/          # Pydantic Models
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # UI, Graphs, Charts
│   │   └── lib/
│   └── Dockerfile
├── data/                     # Sample IEEE 14-Bus data
├── docker-compose.yml
└── README.md
```

---

## 🧪 Model Training

To train the GNN with your own dataset:

### 1. Place raw CSVs in:

```
backend/data/raw/
```

### 2. Run the training script:

```bash
cd backend
python train_model.py --epochs 128 --batch_size 64
```

Training uses **Binary Cross-Entropy Loss** and **RMSProp**, following the research paper’s methodology.

---

## 📄 License

Distributed under the **MIT License**.
See `LICENSE` for full text.

---

## 📚 Acknowledgments

This work is based on research by:
**Sweeten, Elshazly, Takiddin, Ismail, Refaat, and Atat**
*Tennessee Technological University & Texas A&M University*



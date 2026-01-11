# 🛡️ AadhaarPulse - Intelligence Analytics Platform

<div align="center">
  <img src="https://img.shields.io/badge/UIDAI-Hackathon%202026-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" />
</div>

<br />

> **Unlocking Societal Trends in Aadhaar Authentication Data**  
> A comprehensive AI-powered analytics platform for monitoring, predicting, and optimizing India's digital identity infrastructure.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution Architecture](#-solution-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Demo Credentials](#-demo-credentials)
- [Data Analysis](#-data-analysis)

---

## 🎯 Overview

**AadhaarPulse** is an advanced governance intelligence dashboard built for the UIDAI Hackathon 2026. It provides real-time monitoring, predictive analytics, and AI-powered insights for Aadhaar authentication patterns across India.

The platform analyzes **3.9M+ authentication records** covering **1,097 districts** to deliver actionable intelligence for policymakers and administrators.

---

## 🔍 Problem Statement

With millions of daily Aadhaar authentications across India, there's a critical need for:
- **Real-time monitoring** of authentication patterns
- **Early detection** of service anomalies and demand surges
- **Predictive forecasting** for resource allocation
- **Policy insights** based on demographic and geographic trends

---

## 🏗️ Solution Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AadhaarPulse Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Frontend   │  │   Backend    │  │   Analytics  │          │
│  │   (Next.js)  │  │   (API)      │  │   (Python)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           │                                     │
│  ┌────────────────────────┴────────────────────────────────┐   │
│  │               Data Processing Layer                      │   │
│  │  • Biometric Authentication Data (1.86M records)        │   │
│  │  • Demographic Authentication Data (2.07M records)      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 ML/AI Models                              │   │
│  │  • XGBoost for demand forecasting                        │   │
│  │  • Anomaly detection algorithms                          │   │
│  │  • Quality drift analysis                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 📊 Real-time Dashboard
- Live authentication statistics with trend indicators
- Interactive India heatmap with state-wise metrics
- Demand stress indicators by district

### 🤖 AI-Powered Analytics
- **XGBoost-based demand forecasting** with 97.9% accuracy
- **Anomaly detection** for fraud prevention
- **Quality Drift Index (QDI)** monitoring

### 🗺️ Geographic Intelligence
- Interactive India map with district-level granularity
- State-wise service drift heatmaps
- District demand treemaps

### 📈 Predictive Insights
- Weekly demand surge predictions
- Resource allocation recommendations
- Policy brief generation

### 🔐 Security Features
- 256-bit SSL encryption
- Multi-factor authentication support
- Audit trail logging
- Real-time threat detection

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React Framework |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Recharts | 3.6 | Data Visualization |
| React-Leaflet | 5.0 | Interactive Maps |

### Backend & Analytics
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.x | Data Analysis |
| Pandas | Latest | Data Processing |
| XGBoost | Latest | ML Predictions |
| Jupyter | Latest | Analysis Notebooks |

---

## 📁 Project Structure

```
AadhaarPulse/
├── 📊 Data Analysis
│   ├── AadhaarPulse_Analysis.ipynb          # Main analysis notebook
│   ├── AadhaarPulse_Policy_Intelligence_Report.txt
│   └── *.csv                                 # Generated analytics data
│
├── 📦 Raw Data
│   ├── api_data_aadhar_biometric/           # Biometric auth data (1.86M)
│   └── api_data_aadhar_demographic/         # Demographic auth data (2.07M)
│
├── 🖥️ Frontend Application
│   └── frontend/
│       ├── app/                             # Next.js app router
│       │   ├── dashboard/                   # Main dashboard pages
│       │   ├── login/                       # Authentication page
│       │   └── api/                         # API routes
│       ├── components/                      # React components
│       │   └── dashboard/                   # Dashboard-specific components
│       ├── lib/                             # Utilities & data processing
│       └── data/                            # Static data files
│
└── 📈 Visualizations
    ├── district_demand_treemap.html
    ├── district_risk_matrix.html
    ├── state_service_drift_heatmap.html
    └── weekly_demand_heatmap.html
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- Python 3.8+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/AadhaarPulse.git
cd AadhaarPulse
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

### 3. Python Environment (Optional - for data analysis)
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install pandas numpy xgboost scikit-learn matplotlib seaborn plotly jupyter
```

### 4. Open the Application
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Credentials

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |

> 💡 Any username/password combination will work for demo purposes.

---

## 📊 Data Analysis

### Datasets Analyzed
- **Biometric Authentication**: 1,861,108 records
- **Demographic Authentication**: 2,071,700 records
- **Total Records**: 3,932,808 records
- **Districts Covered**: 1,097
- **States/UTs**: 36

### Generated Analytics
| File | Description |
|------|-------------|
| `demand_surge_analysis.csv` | Predicted demand surges by district |
| `district_anomaly_analysis.csv` | Anomaly scores and flags |
| `district_load_index.csv` | Service load metrics |
| `governance_dashboard.csv` | Aggregated dashboard data |
| `quality_drift_index.csv` | QDI scores over time |

### ML Model Performance
- **Demand Forecasting**: 97.9% accuracy
- **Anomaly Detection**: Identifies deviation > 2σ
- **Feature Importance**: XGBoost feature rankings

---

##  License

This project was developed for the **UIDAI Hackathon 2026**. All rights reserved.

---

## 🙏 Acknowledgments

- **UIDAI** for providing the hackathon platform and data access
- **Open Source Community** for the amazing tools and libraries

---

<div align="center">
  <br />
  <strong>🇮🇳 Built with ❤️ for Digital India 🇮🇳</strong>
  <br />
  <sub>AadhaarPulse - Empowering Governance Through Intelligence</sub>
</div>

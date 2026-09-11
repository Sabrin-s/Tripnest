# ✦ TripNest — Everything for the Journey

![TripNest Banner](https://img.shields.io/badge/TripNest-v2.0-ff785e?style=for-the-badge&logo=compass)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

> **TripNest** is a state-of-the-art, AI-powered travel platform designed for modern globetrotters. Featuring real-time GPS location tracking, interactive 3D Globe & Flight Radar, an AI Trip Concierge with RAG intelligence, and a 27-tool Pro Travel Suite.

---

## 🌟 Key Features

### 🗺️ Live GPS Location Map & Companion Proximity Radar
* **Real-time GPS Tracking**: Instantly center and track your real-time latitude/longitude position using high-accuracy browser geolocation.
* **Circle Live Radar**: View companion proximity in real-time kilometers, add travel partners to your radar, and pin saved landmarks.
* **Interactive Leaflet Engine**: Smooth dark-mode map tiles powered by OpenStreetMap & CartoDB.

### ✦ Pro Suite (27 Integrated Travel Tools)
* 📄 **Offline Passport PDF Generator**: Export complete offline travel documents and emergency itineraries.
* 💸 **Multi-Currency Converter & Expense Splitter**: Support for 35+ global currencies with real-time conversion rates.
* ✈️ **Flight Radar & 3D Globe Explorer**: Interactive 3D webGL canvas visualizing global flight paths and 200+ top destinations.
* 🧳 **Smart Packing Checklist & Budget Calculator**: Category-based packing lists and expense estimations.
* 🏥 **Travel Health & Emergency Guidance**: Instant access to emergency numbers, hospital proximity, and health prep guidance.

### 🧠 AI Trip Concierge (RAG Intelligence)
* Powered by **FastAPI** + **ChromaDB** vector database.
* Natural language prompt recommendations for food tours, romantic itineraries, budget trips, and accessibility planning.

### 🌗 Light / Dark Dual Theme Engine
* Seamless theme toggle button located right in the main navigation bar.
* Persistent theme preference saved in `localStorage`.

---

## 🛠️ Technology Stack

* **Backend**: Python 3.10+, FastAPI, Uvicorn, ChromaDB (Vector Store), PyPDF2
* **Frontend**: Vanilla JavaScript (ES6+), HTML5, Vanilla CSS3 (Custom Design System)
* **Maps & Visualizations**: Leaflet.js, Three.js / Canvas 3D rendering
* **Fonts & Styling**: Playfair Display, DM Sans, HSL Tailored Palettes, Dynamic Glassmorphism

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* Python 3.10 or higher
* `pip` package manager

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tripnest.git
cd tripnest
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Application
Launch the FastAPI Uvicorn server:
```bash
python -m uvicorn travel_api:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Open in Browser
Visit `http://127.0.0.1:8000` to access TripNest locally!

---


Build and launch:
```bash
docker build -t tripnest .
docker run -p 8000:8000 tripnest
```

---

## 📁 Repository Structure

```
tripnest/
├── travel_api.py           # FastAPI backend server & API endpoints
├── chroma_service.py       # Vector DB integration for AI Concierge
├── requirements.txt        # Python dependency specifications
├── trip-data.json          # Pre-loaded destination & travel data
├── static/
│   ├── index.html          # Main application page
│   ├── css/                # CSS design system & feature modules
│   └── js/
│       ├── app.js          # Core frontend application logic
│       └── omnisuite.js    # Pro Suite 27-tool modal engine
└── README.md               # Repository documentation & Deployment guide
```

---

## 👤 Author & Contact Information

Designed & Developed with ❤️ by **Sabrin S**

* **Creator**: Sabrin S
* **Email**: [sabrincse004@gmail.com](mailto:sabrincse004@gmail.com)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

*© 2026 TripNest. All Rights Reserved.*

# Weather Prediction MLOps Project

[![CI/CD](https://github.com/yourusername/weather-mlops/actions/workflows/main.yml/badge.svg)](https://github.com/yourusername/weather-mlops/actions)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue)]()
[![React](https://img.shields.io/badge/React-18-blue)]()

A comprehensive MLOps project implementing a weather prediction system with full CI/CD pipeline, MLflow integration, and containerized deployment.

## 🎯 Project Overview

This project demonstrates a complete MLOps lifecycle, from data versioning to production deployment, using modern tools and best practices. The system predicts temperature based on weather features using machine learning models tracked with MLflow.

### Key Features

- Data versioning with DVC
- Model tracking and versioning using MLflow
- Full-stack application with React frontend and Flask backend
- Automated CI/CD pipeline with GitHub Actions
- Containerized deployment using Docker and Kubernetes
- User authentication and session management
- Professional documentation and version control

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Flask
- **Database:** SQLite
- **ML Pipeline:** 
  - DVC (Data Version Control)
  - MLflow
  - scikit-learn
- **DevOps:**
  - Docker
  - Kubernetes (Minikube)
  - GitHub Actions

## 🚀 Getting Started

### Prerequisites

python >= 3.8
node >= 14
docker
minikube

### Installation

# 1. Clone the repository
git clone https://github.com/yourusername/weather-mlops.git
cd weather-mlops

# 2. Install backend dependencies
cd backend
pip install -r requirements.txt

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Start MLflow server
mlflow server --host 0.0.0.0 --port 5000

# 5. Run the application
# Backend
flask run

# Frontend
npm run dev

## 🌲 Branch Structure

- `main`: Production-ready code
- `testing`: Integration and testing
- `dev`: Active development

## 📊 MLflow Integration

MLflow is used for:
- Model versioning
- Metric logging
- Parameter tracking
- Model registry management

## 👥 Team

- **Bilal Akbar** - ML Engineer
- **Ibraheem Rehman** - Backend Developer
- **Tauseef Razaq** - Frontend Developer

## 📝 Documentation

- [API Documentation](./docs/api.md)
- [Model Documentation](./docs/model.md)
- [Deployment Guide](./docs/deployment.md)

## 🔄 CI/CD Pipeline

Our CI/CD pipeline includes:
1. Automated testing
2. Docker image building
3. Kubernetes deployment
4. MLflow model versioning

## 📈 Future Improvements

- [ ] Add more weather features
- [ ] Implement A/B testing
- [ ] Enhanced monitoring dashboard
- [ ] Model retraining pipeline

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
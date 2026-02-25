# Weather Data Processing and Prediction Pipeline

## Overview
This project implements an automated weather data processing and prediction pipeline using DVC (Data Version Control). It collects weather data from the Open-Meteo API, processes it, and trains a linear regression model for temperature prediction.

## Project Structure


## Components

### Data Collection (`fetch_data.py`)
- Collects weather data from Open-Meteo API for Islamabad location
- Features include temperature, humidity, wind speed, and pressure
- Saves raw data to CSV format

### Data Preprocessing (`preprocess.py`) 
- Handles missing values using interpolation
- Normalizes numerical features
- Validates data integrity
- Exports processed dataset

### Model Training (`train_model.py`)
- Trains linear regression model
- Uses humidity, wind speed and pressure to predict max temperature
- Saves trained model for later use

## Pipeline Stages (DVC)
1. `collect_data`: Fetches weather data
2. `preprocess_data`: Cleans and normalizes data
3. `train_model`: Trains and saves prediction model

## Setup & Usage

### Prerequisites
- Python 3.8+
- Required packages: `pandas`, `sklearn`, `requests`, `dvc`

### Installation
```bash
pip install -r requirements.txt
```

## Running the Pipeline
```bash
dvc repro
```

2. View pipeline status:
```bash
dvc status
```

3. Push data to remote storage:
```bash
dvc push
```

### Using Airflow

1. Set the 

AIRFLOW_HOME

 environment variable:
```bash
export AIRFLOW_HOME=~/airflow
```

2. Initialize Airflow database:
```bash
airflow db init
```

3. Start Airflow webserver:
```bash
airflow webserver --port 8080
```

4. Start Airflow scheduler in a new terminal:
```bash
airflow scheduler
```

5. Access Airflow UI at `http://localhost:8080` and enable the `weather_pipeline` DAG.

## Pipeline Components

1. Data Collection (scripts/fetch_data.py):
- Fetches weather data from OpenMeteo API
- Saves raw data to 

raw_data.csv



2. Data Preprocessing (scripts/preprocess.py):
- Handles missing values
- Scales numerical features
- Saves processed data to 

processed_data.csv



3. Model Training (scripts/train_model.py):
- Trains a linear regression model
- Saves model to 

model.pkl



## Directory Structure

```
├── data/               # Data directory
│   ├── raw_data.csv   # Raw weather data
│   └── processed_data.csv  # Preprocessed data
├── models/            # Model directory
│   └── model.pkl     # Trained model
├── scripts/          # Python scripts
│   ├── alaska.py    # Airflow DAG definition
│   ├── fetch_data.py    # Data collection script
│   ├── preprocess.py    # Data preprocessing script
│   └── train_model.py   # Model training script
└── dvc.yaml         # DVC pipeline definition
```

## Data Versioning

Track changes in data:
```bash
dvc add data/raw_data.csv
dvc add data/processed_data.csv
dvc add models/model.pkl
```

> **Note:** If you use `dvc.yaml`, you don't need to track individual files because this will automatically be done by `dvc.lock`.

Commit changes:
```bash
git add .
git commit -m "Update data and models"
git push
dvc push
```
## Data Flow
Raw weather data collection from API
Data cleaning and normalization
Feature engineering and model training
Model evaluation and storage
## Notes
Default location set to Islamabad (33.6844°N, 73.0479°E)
Uses past 10 days of weather data
Stores normalized parameters for future predictions

"""
Weather prediction model training script using Linear Regression.
"""

import pandas as pd
import pickle
import mlflow
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from typing import Tuple

# Constants
DATA_PATH = 'data/processed_data.csv'
MLFLOW_URI = "http://localhost:5000"
EXPERIMENT_NAME = "weather_prediction"
FEATURES = ['Humidity (%)', 'Wind Speed (m/s)', 'Pressure (hPa)']
TARGET = 'Temperature Max (°C)'
TEST_SIZE = 0.2
RANDOM_STATE = 42

def load_and_split_data() -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """
    Load data from CSV and split into training and test sets.
    
    Returns:
        Tuple containing X_train, X_test, y_train, y_test
    """
    df = pd.read_csv(DATA_PATH)
    X = df[FEATURES]
    y = df[TARGET]
    
    return train_test_split(
        X, y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE
    )

# Initialize MLFlow tracking
mlflow.set_tracking_uri(MLFLOW_URI)
mlflow.set_experiment(EXPERIMENT_NAME)

# Load and split the data
X_train, X_test, y_train, y_test = load_and_split_data()
# Start MLFlow run
with mlflow.start_run(run_name="linear_regression_model") as run:
    # Train model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Calculate metrics
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    # Log parameters
    mlflow.log_params({
        "model_type": "LinearRegression",
        "features": list(X.columns)
    })
    
    # Log metrics
    mlflow.log_metrics({
        "mse": mse,
        "r2": r2
    })
    
    # Log model
    mlflow.sklearn.log_model(
        model, 
        "model",
        registered_model_name="weather_prediction_model"
    )
    
    # Save model locally
    with open('models/model.pkl', 'wb') as f:
        pickle.dump(model, f)

# Transition model to staging
client = mlflow.tracking.MlflowClient()
latest_version = client.get_latest_versions("weather_prediction_model", stages=["None"])[0]
client.transition_model_version_stage(
    name="weather_prediction_model",
    version=latest_version.version,
    stage="staging"
)
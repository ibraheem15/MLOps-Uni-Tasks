import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import mlflow
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

# Set MLFlow tracking URI and experiment
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("weather_prediction")

# Load and split data
df = pd.read_csv('data/processed_data.csv')
X = df[['Humidity (%)', 'Wind Speed (m/s)', 'Pressure (hPa)']]
y = df['Temperature Max (°C)']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

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
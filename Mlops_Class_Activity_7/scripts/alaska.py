from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from fetch_data import fetch_and_format_weather_data 
from preprocess import WeatherDataPreprocessor
import os

# Set up paths using Windows style
AIRFLOW_HOME = os.getenv('AIRFLOW_HOME', os.path.join(os.path.dirname(__file__), 'airflow'))
DATA_DIR = os.path.join(AIRFLOW_HOME, 'data')

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'weather_pipeline',
    default_args=default_args,
    description='Weather data collection and preprocessing pipeline',
    schedule_interval=timedelta(days=1)
)

def preprocess_data():
    preprocessor = WeatherDataPreprocessor(
        os.path.join(DATA_DIR, "raw_data.csv"),
        os.path.join(DATA_DIR, "processed_data.csv")
    )
    preprocessor.process()

collect_data_task = PythonOperator(
    task_id='collect_data',
    python_callable=fetch_and_format_weather_data,
    dag=dag
)

preprocess_data_task = PythonOperator(
    task_id='preprocess_data',
    python_callable=preprocess_data,
    dag=dag
)

collect_data_task >> preprocess_data_task
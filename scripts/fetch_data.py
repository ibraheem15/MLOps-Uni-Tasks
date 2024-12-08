import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional, Dict, List

# Constants
LAT = 33.6844  # Islamabad latitude
LON = 73.0479  # Islamabad longitude
BASE_URL = 'https://api.open-meteo.com/v1/forecast'
OUTPUT_FILE = 'data/raw_data.csv'
CITY = 'Islamabad'

def fetch_and_format_weather_data() -> Optional[pd.DataFrame]:
    """
    Fetches weather data from Open-Meteo API and formats it into a DataFrame.
    
    Returns:
        Optional[pd.DataFrame]: Formatted weather data or None if fetch fails
    """
    params = {
        'latitude': LAT,
        'longitude': LON,
        'past_days': 10,
        'daily': [
            'temperature_2m_max',
            'temperature_2m_min',
            'relative_humidity_2m_mean',
            'wind_speed_10m_max',
            'surface_pressure_mean'
        ],
        'timezone': 'Asia/Karachi'
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        weather_data = [
            {
                'Date': date,
                'Temperature Max (°C)': round(temp_max, 2),
                'Temperature Min (°C)': round(temp_min, 2),
                'Humidity (%)': round(humidity, 2),
                'Wind Speed (m/s)': round(wind_speed, 2),
                'Pressure (hPa)': pressure if pressure else None,
                'City': CITY
            }
            for date, temp_max, temp_min, humidity, wind_speed, pressure in zip(
                data['daily']['time'],
                data['daily']['temperature_2m_max'],
                data['daily']['temperature_2m_min'],
                data['daily']['relative_humidity_2m_mean'],
                data['daily']['wind_speed_10m_max'],
                data['daily'].get('surface_pressure_mean', [None] * len(data['daily']['time']))
            )
        ]
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    
    columns = [
        'Date', 'City', 'Temperature Max (°C)', 'Temperature Min (°C)',
        'Humidity (%)', 'Wind Speed (m/s)', 'Pressure (hPa)'
    ]
    
    df = pd.DataFrame(weather_data, columns=columns)
    df.to_csv(
        OUTPUT_FILE,
        index=False, 
        encoding='utf-8',
        float_format='%.2f',
        date_format='%Y-%m-%d'
    )
    
    print(f"Daily weather data saved to {OUTPUT_FILE}")
    return df

if __name__ == '__main__':
    fetch_and_format_weather_data()
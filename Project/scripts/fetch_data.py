import requests
import pandas as pd
from datetime import datetime, timedelta

# Islamabad coordinates
LAT = 33.6844
LON = 73.0479

def fetch_and_format_weather_data():
    BASE_URL = 'https://api.open-meteo.com/v1/forecast'
    
    params = {
        'latitude': LAT,
        'longitude': LON,
        'past_days': 10,
        'daily': 'temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,wind_speed_10m_max,surface_pressure_mean',
        'timezone': 'Asia/Karachi'
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        weather_data = []
        for i in range(len(data['daily']['time'])):
            daily_data = {
                'Date': data['daily']['time'][i],
                'Temperature Max (°C)': round(data['daily']['temperature_2m_max'][i], 2),
                'Temperature Min (°C)': round(data['daily']['temperature_2m_min'][i], 2),
                'Humidity (%)': round(data['daily']['relative_humidity_2m_mean'][i], 2),
                'Wind Speed (m/s)': round(data['daily']['wind_speed_10m_max'][i], 2),
                'Pressure (hPa)': data['daily']['surface_pressure_mean'][i] if 'surface_pressure_mean' in data['daily'] else None,
                'City': 'Islamabad'
            }
            weather_data.append(daily_data)
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    
    columns = ['Date', 'City', 'Temperature Max (°C)', 'Temperature Min (°C)', 
              'Humidity (%)', 'Wind Speed (m/s)', 'Pressure (hPa)']
    
    df = pd.DataFrame(weather_data, columns=columns)
    df.to_csv('data/raw_data.csv',
              index=False, 
              encoding='utf-8',
              float_format='%.2f',
              date_format='%Y-%m-%d')
    
    print(f"Daily weather data saved to islamabad_daily_weather.csv")
    return df

fetch_and_format_weather_data()
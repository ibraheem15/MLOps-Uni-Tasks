import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

df = pd.read_csv('data/processed_data.csv')
X = df[['Humidity (%)', 'Wind Speed (m/s)', 'Pressure (hPa)']]
y = df['Temperature Max (°C)']

model = LinearRegression()
model.fit(X, y)

with open('models/model.pkl', 'wb') as f:
    pickle.dump(model, f)

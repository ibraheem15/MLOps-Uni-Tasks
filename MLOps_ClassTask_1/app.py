# app.py
from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the model
model = joblib.load('model.pkl')

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the features from the form input
        features = request.form['features'].split(',')
        
        # Convert the string input to numeric (float) values
        features = np.array([float(i) for i in features]).reshape(1, -1)
        
        # Make prediction using the model
        prediction = model.predict(features)
        
        # Pass the prediction result to the HTML template
        return render_template('index.html', prediction=int(prediction[0]))
    
    except ValueError:
        # If there was an issue with converting inputs to float
        return render_template('index.html', error="Please enter valid numeric values for the features")
    
    except Exception as e:
        # Handle any other exceptions
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
    
# Sample Input
# 5.1,3.5,1.4,0.2 # Iris Setosa
# 7.0,3.2,4.7,1.4 # Iris Versicolor
# 6.3,3.3,6.0,2.5 # Iris Virginica

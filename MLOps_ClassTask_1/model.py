# model.py
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
# Logistic Regression model trained on the Iris dataset
import joblib

# Load sample dataset
iris = load_iris()
X, y = iris.data, iris.target

# Train a lightweight logistic regression model
model = LogisticRegression(max_iter=200)
model.fit(X, y)

# Save the model
joblib.dump(model, 'model.pkl')

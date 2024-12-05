# backend/tests/test_backend.py
import pytest
import json
import sys
import os

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend import app, db, User
import jwt

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_signup_success(client):
    response = client.post('/api/signup',
        json={'email': 'test@test.com', 'password': 'password123'}
    )
    assert response.status_code == 201
    assert b"User created successfully" in response.data

def test_signup_duplicate_email(client):
    # First signup
    client.post('/api/signup',
        json={'email': 'test@test.com', 'password': 'password123'}
    )
    # Duplicate signup
    response = client.post('/api/signup',
        json={'email': 'test@test.com', 'password': 'password123'}
    )
    assert response.status_code == 400
    assert b"Email already exists" in response.data

def test_login_success(client):
    # Create user first
    client.post('/api/signup',
        json={'email': 'test@test.com', 'password': 'password123'}
    )
    
    # Test login
    response = client.post('/api/login',
        json={'email': 'test@test.com', 'password': 'password123'}
    )
    assert response.status_code == 200
    assert 'token' in json.loads(response.data)

def test_login_invalid_credentials(client):
    response = client.post('/api/login',
        json={'email': 'wrong@test.com', 'password': 'wrongpass'}
    )
    assert response.status_code == 401
    assert b"Invalid credentials" in response.data

def test_predict(client):
    response = client.post('/api/predict',
        json={
            'humidity': 70,
            'windSpeed': 5.5,
            'pressure': 1013
        }
    )
    assert response.status_code == 200
    prediction = json.loads(response.data)['prediction']
    assert isinstance(prediction, float)
    
def test_predict_invalid_input(client):
    response = client.post('/api/predict',
        json={
            'humidity': 'invalid',
            'windSpeed': 5.5,
            'pressure': 1013
        }
    )
    assert response.status_code == 400

# Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .
RUN pip install -r requirements.txt

# Create models directory
RUN mkdir -p models

# Copy only backend files
COPY backend/ backend/

# Copy models 
COPY models/ models/

EXPOSE 5000

CMD ["python", "backend/backend.py"]
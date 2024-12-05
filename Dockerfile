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

# Copy models if they exist, with error suppression
COPY models/* models/ 2>/dev/null || true

EXPOSE 5000

CMD ["python", "backend/backend.py"]
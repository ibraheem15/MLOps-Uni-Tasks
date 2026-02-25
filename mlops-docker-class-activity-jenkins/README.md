# Linear Regression Salary Prediction

This project is a simple web application that uses linear regression to predict salaries based on years of experience. The application is built using Flask and scikit-learn, and it is containerized using Docker.

## Project Structure

- **app.py**: The main application file that contains the Flask web server and the linear regression model training code.
- **Dockerfile**: The Docker configuration file for containerizing the application.
- **Makefile**: Contains commands to build, run, and manage Docker containers.
- **requirements.txt**: Lists the Python dependencies required for the project.
- **salary_data.csv**: The dataset used for training the linear regression model.
- **.github/workflows/docker-build-and-deploy.yml**: GitHub Actions workflow for building and deploying the Docker image.

## Setup

### Prerequisites

- Docker
- Python 3.8 or higher

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Run the application:
    ```sh
    python app.py
    ```

4. The application will be available at `http://127.0.0.1:5000/`.

## Docker

### Build Docker Image

To build the Docker image, run:
```sh
docker build -t linear-regression-app .
```

### Run Docker Container

To run the Docker container, run:
```sh
docker run -p 5000:5000 linear-regression-app
```

The application will be available at `http://localhost:5000/`.


pipeline {
    agent any
    
    environment {
        DOCKER_HUB_REP = 'ibraheem15/jennkins-mlops'
        DOCKER_HUB_CREDENTIALS_ID = 'a4d018fb-620b-48b7-a2b3-940e89cec33a'
        //iMAGE tag
        DOCKER_IMAGE_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_HUB_REP}:${DOCKER_IMAGE_TAG}")
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS_ID) {
                        echo "Logged in successfully"
                    }
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Push the Docker image
                    docker.image("${DOCKER_HUB_REP}:${DOCKER_IMAGE_TAG}").push()
                }
            }
        }
    }
}
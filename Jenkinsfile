def branch = "master"
def remote = "origin"
def directory = "wayshub"
def server = "alam@103.193.177.230"
def cred = "hardiansyah"
def dockerUser = "hardiansyahpermata"

pipeline {
    agent any
    
    environment {
        DOCKER_TAG = "production"
    }

    stages {
        stage('1. Pull from Repository') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        cd ${directory}
                        git pull ${remote} ${branch}
                        exit
                        EOF
                    """
                }
            }
        }

        stage('2. Build') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        cd ${directory}
                        docker build -t ${dockerUser}/wayshub-backend:${DOCKER_TAG} ./backend/wayshub-backend
                        docker build -t ${dockerUser}/wayshub-frontend:${DOCKER_TAG} ./frontend/wayshub-frontend
                        exit
                        EOF
                    """
                }
            }
        }

        stage('3. Test Application') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        docker run --rm ${dockerUser}/wayshub-backend:${DOCKER_TAG} node -v
                        docker run --rm ${dockerUser}/wayshub-frontend:${DOCKER_TAG} nginx -v
                        exit
                        EOF
                    """
                }
            }
        }

        stage('4. Push to Docker Hub') {
            steps {
                sshagent([cred]) {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${server} << EOF
                            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                            docker push ${dockerUser}/wayshub-backend:${DOCKER_TAG}
                            docker push ${dockerUser}/wayshub-frontend:${DOCKER_TAG}
                            exit
                            EOF
                        """
                    }
                }
            }
        }

        stage('5. Deploy on Docker') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        cd ${directory}
                        docker compose up -d
                        exit
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline Berhasil! Mengirim notifikasi ke Discord...'
            withCredentials([string(credentialsId: 'discord-webhook-url', variable: 'DISCORD_URL')]) {
                sh """
                    curl -H "Content-Type: application/json" -X POST -d '{"content": "✅ **Jenkins Build SUCCESS**\\nAplikasi Wayshub berhasil di-deploy!\\nBuild URL: ${env.BUILD_URL}"}' \$DISCORD_URL
                """
            }
        }
        failure {
            echo 'Pipeline Gagal! Mengirim notifikasi ke Discord...'
            withCredentials([string(credentialsId: 'discord-webhook-url', variable: 'DISCORD_URL')]) {
                sh """
                    curl -H "Content-Type: application/json" -X POST -d '{"content": "❌ **Jenkins Build FAILED**\\nAda error saat deployment Wayshub.\\nCek log di: ${env.BUILD_URL}"}' \$DISCORD_URL
                """
            }
        }
    }
}

def branch = "master"
def remote = "origin"
def directory = "wayshub"
def server = "alam@103.193.177.230"
def cred = "hardiansyah"
pipeline {
    agent any
    stages {
        stage('Pulling new code') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        cd ${directory}
                        git pull ${remote} ${branch}
                        exit
                        EOF"""
                }
            }
        }
        
        stage('Docker build & deploy') {
            steps {
                sshagent([cred]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        cd ${directory}
                        docker compose build
						docker compose up -d
                        exit
                        EOF
                    """
                }
            }
        }
    }
}

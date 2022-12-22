library 'aws-access-keys@master'

pipeline {
    agent { label 'ubuntu-build-slave' }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20'))
    }
    stages {
        stage('CLEAN UP') {
            steps {
                cleanWs()
            }
        }
        

        stage('SETUP BUILD') {
            steps {
                script {
                    reportiumPipeline.setupBuild()
                }
            }
        }

        stage('BUILD') {
            steps {
                script {
                    reportiumPipeline.buildCode()
                    echo "artifactTag - is ${artifactTag}"
                }
            }
        }
  
        stage('Test') {
            steps {
                script {
                    echo "run test"
                }
            }
        }
    }

    post {
      failure  {
          script {
                currentBuild.result = 'FAILURE'
                emailext subject: '$DEFAULT_SUBJECT',
                body: '$DEFAULT_CONTENT',
                recipientProviders: [
                [$class: 'CulpritsRecipientProvider'],
                [$class: 'DevelopersRecipientProvider'],
                [$class: 'RequesterRecipientProvider']
                ],
                replyTo: '$DEFAULT_REPLYTO',
                to: 'bmikler@perforce.com;'
            }
        }
    }
}


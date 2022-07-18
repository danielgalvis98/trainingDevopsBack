node {
  def branchName = env.CHANGE_BRANCH ?: env.BRANCH_NAME
  string nodeBaseImage = 'node:16.15.0'

  properties([
    buildDiscarder(logRotator(artifactDaysToKeepStr: '',
      artifactNumToKeepStr: '',
      daysToKeepStr: '100',
      numToKeepStr: '60')),
    disableConcurrentBuilds()
  ])

  stage('Checkout') {
    timeout(3) {
      echo 'Checking out...'
      checkout scm
    }
  }

  stage('Install') {
    timeout(10) {
      echo 'Installing Dependencies...'
      docker.image(nodeBaseImage).inside {
        sh 'npm ci'
      }
    }
  }

  stage('Tests') {
    timeout(10) {
      echo 'Running tests...'
      docker.image(nodeBaseImage).inside {
        sh 'npm run test'
      }
    }
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner'
    withSonarQubeEnv() {
      docker.image(nodeBaseImage).inside("-v ${scannerHome}:${scannerHome}") {
        sh "${scannerHome}/bin/sonar-scanner"
      }
    }
  }

  stage('Build and Publish') {
      timeout(10) {
        echo 'Building docker image...'
        def registry = 'registry:5000'
        def serviceName = 'review-api'

        def pushImage = docker.build("${registry}/${serviceName}:${branchName}-${BUILD_ID}")
        pushImage.push()

        if (branchName == 'master') {
          pushImage.push('latest')
        }
      }
    }

    stage('Deploy compose to dind') {
      timeout(10){
        if (branchName == 'master'){
          withCredentials([
            string(credentialsId: 'dbUser', variable:'DB_USER'),
            string(credentialsId: 'dbPassword', variable:'DB_PASS')])
            {
              sh 'docker compose up -d'
            }
        }
      }
    }

  stage('Clean Workspace') {
    timeout(3) {
      echo 'Cleaning workspace...'
      cleanWs()
    }
  }
}

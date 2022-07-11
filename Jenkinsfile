node {
  properties([
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '100', numToKeepStr: '60')),
    disableConcurrentBuilds()
  ])

  stage('Checkout'){
    timeout(3){
      echo 'Checking out...'
      checkout scm
    }
  }

  stage('Tests'){
    timeout(10){
      echo 'Running tests...'
    }
  }
}
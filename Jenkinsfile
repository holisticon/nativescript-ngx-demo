properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '20']]
]

node('mac') {
  try {
    // Jenkins makes these variables available for each job it runs
    def buildNumber = env.BUILD_NUMBER
    def branchName = env.BRANCH_NAME
    def workspace = env.WORKSPACE
    def buildUrl = env.BUILD_URL

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "build URL is $buildUrl"
    echo "build Number is $buildNumber"
    echo "branch name is $branchName"

    stage('Checkout') {
      checkout scm
      sh "cp ~/.holisticon/fabric.json ."
    }

    stage('Build') {
        sh "npm run clean"
        sh "BUILD_NUMBER='${buildNumber}' npm run buildnumbering && npm run build"
    }

    timeout(10) {
      stage('Unit-Test') {
        // TODO
        //   sh "npm run test"
        //  step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])
      }
    }

    timeout(10) {
      stage('Integration-Tests') {
        // TODO fix appium tests && npm run test-e2e"
        //junit healthScaleFactor: 1.0, testResults: 'target/reports/TESTS-*.xml'
      }
    }

    stage('build Apps') {
        // TODO
      //sh "node etc/release_notes.js ${buildNumber} && npm run clean && npm run package"
      //sh "cd target && for file in *.ipa; do mv \$file \$(basename \$file .ipa)_build${buildNumber}.ipa; done && for file in *.apk; do mv \$file \$(basename \$file .apk)_build${buildNumber}.apk; done"
    }

    if (branchName.equalsIgnoreCase('master')) {
      stage('Store Upload') {
        parallel(
          'PlayStore': {
            // TODO
          },
          'iTunes Connect': {
            // TODO
          },
          failFast: false
        )
      }
    }
  } catch (e) {
    rocketSend channel: 'holi-oss', emoji: ':rotating_light:', message: 'Fehler'
    throw e
  }
}

properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '20']]
]


timeout(60) {
  node('nativescript') {
    try {
      def appName = 'TNS+NGX Demo'
      def appID = 'de.holisticon.nativescript.ngdemo'
      // Jenkins makes these variables available for each job it runs
      def buildNumber = env.BUILD_NUMBER
      def branchName = env.BRANCH_NAME
      def workspace = env.WORKSPACE
      def buildUrl = env.BUILD_URL
      def keystorePath = env.KEYSTORE_PATH
      def keystorePass = env.KEYSTORE_PASS
      env.LANG = "en_US.UTF-8" // needed for cocoapods


      // PRINT ENVIRONMENT TO JOB
      echo "workspace directory is $workspace"
      echo "build URL is $buildUrl"
      echo "build Number is $buildNumber"
      echo "branch name is $branchName"

      dir('mobile-app'){

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

        stage('Build Release') {
          sh "BUILD_NUMBER='${buildNumber}' keystorePath='${KEYSTORE_PATH}' KEYSTORE_PASS='${keystorePass}' npm run release:snapshot"
          //sh "npm run buildnumbering ${buildNumber} && npm run app-changelog && npm run clean && npm run package"
          sh "cd target && for file in *.ipa; do mv \$file ngx-demo_build${buildNumber}.ipa; done && for file in *.apk; do mv \$file ngx-demo_build${buildNumber}.apk; done"
          step([$class     : "ArtifactArchiver",
              artifacts  : "target/*.ipa, target/*.apk",
              fingerprint: true
          ])
        }

        if (branchName.equalsIgnoreCase('master')) {
          stage('Store Upload') {
            parallel(
              'PlayStore': {
                sh "fastlane supply --apk target/ngx-demo_build${buildNumber}.apk --json_key ~/.holisticon/playstore.json --package_name {appID} --track alpha"
              },
              'iTunes Connect': {
                sh "fastlane pilot upload --ipa target/ngx-demo_build${buildNumber}.ipa -u appdev@holisticon.de --changelog \"Something that is new here\""
              },
              failFast: false
            )
          }
        }

      }
    } catch (e) {
     // rocketSend channel: 'holi-oss', emoji: ':rotating_light:', message: 'Fehler'
      throw e
    }
  }
}

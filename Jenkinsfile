node {
    stage('Checkout') {
        checkout scm
    }

    docker.image('node:8').inside {
      stage('NPM Install') {
          withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
              sh 'npm install'
          }
      }

      stage('Lint') {
          sh 'ng lint'
      }
        
      stage('Build') {
          milestone()
          sh 'ng build --prod --aot --sm --progress=false'
      }
    }
    //end docker

    stage('Archive') {
        sh 'tar -cvzf dist.tar.gz --strip-components=1 dist'
        archive 'dist.tar.gz'
    }

    stage('Deploy') {
        milestone()
        echo "Deploying..."
    }
}

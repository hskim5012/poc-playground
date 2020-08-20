# Atlas Node/Express Application Template

This repository can be used as a starting point for developing node/express applications.

## Getting Started - Application

The application source code is ready to build and and run.

### Install dependencies

run command: npm install

### Transpile typescript -> javascript

run command: npm run build

### Start node process

run command: npm start

## Getting Started - Pipeline/Manifest

There are auxiliary files in the /ci directory that can be used for CI/CD.

There is a basic pipeline in /ci/pipelines/pipeline-dev.yml that will clone your git source code repository, install your dependencies, compile your code, and deploy to cloud foundry.

To use this, here are changes you need to configure:

- set repository uri in pipeline (ci/pipelines/pipeline-dev.yml, line 6)
- add or remove environment variabes to install-build task (ci/pipelines/pipeline-dev.yml, lines 50-51)
- add or remove environment variables to cloud foundry deployment step (ci/pipelines/pipeline-dev.yml, lines 56-57)
- set application name (ci/manifest/manifest-dev.yml, line 3)

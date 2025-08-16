# Changelog

## v0.2.0
### Added or Changed
- Feature: Adding the electron app to interface with the runners

## v0.1.9
### Added or Changed
- Bugfix: Fixing the error when project does not have the folder runners
- Bugfix: Changing the updateFiles to recreateFiles
- Bugfix: Changing the default of the recreateFiles to be always true

## v0.1.8
### Added or Changed
- Feature: Improving the README by introducing the INTRODUCTION
- Feature: Changing the createFiles to updateFiles and making it not mandatory by default is false

## v0.1.7
### Added or Changed
- Bugfix: Fixing the create files on multiple projects that was failing
- Bugfix: Fixing if the project is missing inside the runner project

## v0.1.6
### Added or Changed
- Feature: Changed the projects envs.json to clean the environments variables

## v0.1.5
### Added or Changed
- Bugfix: Removing console logs

## v0.1.4
### Added or Changed
- Feature: Added in the runner create the possibility to create a .idea folder if the project was not yet opened by intellij
- Feature: Added the package.json for with an empty workspace as an option in case we need more complex scripts with dependencies
- Feature: Added the file utils to place the most common functionality used for better code readability
- Feature: Updated the demo-quarkus to showcase the new functionality
- Feature: Update the scripts to use the new utils file
- Feature: Update the documentation

## v0.1.3
### Added or Changed
- Feature: Changed the settings.json to add the name and split the script by basePath and script

## v0.1.2
### Added or Changed
- Feature: Added editorconfig for the configuration of the intellij project
- Feature: Added the possibility to put text as a value in the script arguments
- Feature: Added the git squash script
- Feature: Changed documentation, now we have a .md for each topic

## v0.1.1
### Added or Changed
- Bugfix: Added the option to configure the java version
- Feature: Changed the readme documentation

## v0.1.0
### Added or Changed
- Added Template generation for the runners
- Added Template generation for the scripts
- Added Demo example for quarkus for the runners

## v0.0.1
### Added or Changed
- Initial commit
- Available scripts:
  - runners
    - create
    - update
  - win
    - kill_process_by_pid
- In WIP
  - Scripts:
    - docker
    - git
    - template
  - Creation of an example for the runners
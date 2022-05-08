CMR-BUILD overview.

cmr-build folder contains scripts designed to be run via package.json, it has 2 purposes:
1. verify that the project is ready for a pull request.
    =>  npm run build:pr.
2. compile the project while modifying the source in order to adapt it for production environment.
    => npm run build:prod.

1. pull request build verification
----------------------------------
The verification is made in 3 consecutive stages, each one has to succeed in order to continue running the next one.
- running lint
- verify that the source does not contain duplicate class names
- verify that the project can be compiled (build) successfully

2. compiling the app
--------------------
The verification is made in 3 consecutive stages, each one has to succeed in order to continue running the next one.
- running lint
- verify that the source does not contain duplicate class names
- insert command at the beginning of each function in order to log it during runtime, and compiling tha project
- modify the compiled code by changing references to asset files in order to support dynamic location/language environment

======================================================================================================================


scripts.

the 'cmr-build' folder contains 4 scripts, each in its own sub folder.
those script are used when running build:pr and build:prod.
1. lint/lint.js.
   performs lint on the project.
2. build/build.js.
   build the project by issuing "ng build" command.
3. function logging.
   the script provides additional information used when debugging a runtime error, it logs the function
   names invoked during the process flow, along with their parameters (only primitives).
   the script works by making a temporary copy of the source, on which it scans and inserts a logging
   command at the beginning of each function, this command sends the class/function name to a logging service
   which sends it to the server upon runtime error.
   after inserting the commands, the script compiles (build) the project for production.
4. assets-path.
   the script modifies the compiled code in order to avoid a runtime problem that causes asset resources
   not to be served by the server. the cause of this problem is that the base href is dynamically changed
   during runtime to accommodate current location/language, while assets are treated by the server as
   residing in the root folder so it returns 404.
   the script works by scanning the compiled code and modifying the resources references in the assets folder
   from 'assets/...' to './assets/...', thus makes it relative to the base href.
   angular dev server, initiated by "ng serve", cannot handle relative assets.

======================================================================================================================


configuration.

cmr-build folder contains a configuration file to be used by the various scripts, it contains:
- a default project name, currently chameleonbackoffice.
  some scripts may need the project name, they first try to locate it in angular.json file and in case they
  fail to take it from there then they will use this default name from the configuration.
- source folder to work on, currently src\app.
  the script will modify only files reside in this folder on.

in addition, some scripts contain their own internal configuration.
1. find-duplicates.
   - which file types will be scanned, currently components and services
2. function-logging.
   - which files types will be modified, currently components and services
   - which classes and functions will be excluded from logging
   - the name of the temporary folder (currently 'temp') and if it will be deleted or not when the script finishes
3. assets-path.
   - the file types to be modified, currently .js and .css


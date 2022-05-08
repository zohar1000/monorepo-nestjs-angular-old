# Chameleon
The repository contains the next version of the Chameleon client applications.<br>
It is organized as a monorepo having a folder for each application and a shared folder named 'apps-shared'.<br>
Currently the repository contains the medical record and a new login application.<br><br>

#### A few notes:

- the cli setting for this repository are set to disregard test files (spec.ts) and they will not be generated when generating via the cli.
- in order to avoid messages like "LF will be replaced by CRLF" when doing git add/commit we will switch to a consistent mode of work using LF only,
  so set your working environment to LF as described below.
- webstorm - in case you use it then you need to upgrade it to version 2021.2 or above.

## working with the shared folder
The shared folder contains 3 sub folders:
- **src**: &nbsp;for the components, directives, etc.
- **fake-server**: &nbsp;for the fake server
- **cmr-build**: &nbsp;for utilities that are being used during an application build

The applications are set to import content from the shared folder by using the path @apps-shared.<br>
For example: import { SomeComponent } from '@apps-shared'.<br>
The @apps-shared path references the file apps-shared/src/public-api.ts, this file exports
all the shared content for the applications.<br>
It exports the module AppsSharedModule which should
contain the components, directives, etc.<br>
Files that cannot be exported in AppsSharedModule, like enums and interfaces, will be directly exported in public-api.ts.


## Coding style guide
Service extends BaseService.<br>
Component extends BaseComponent.<br>


## tag prefixes
medical-record application tag prefix is 'cmr'.<br>
login application tag prefix is 'lgn'.<br>
shared content don't have special prefix, it will be 'app'.<br>


## Serving an application
To server an app, you can either run 'ng s APP_NAME'.<br>
Medical record is the default when serving, so 'ng s' is enough to run it.<br>

To run the fake server run 'npm run fake:server'.


## set your working environment to LF:
Different operating systems have different characters to mark an end of a line.<br>
Linux and Mac use the character LF (Line Feed) which is '\n'.<br>
Windows uses a combination of 2 characters CR+LF (Carriage Return + Line Feed) which are '\r\n'.<br>
If you find this subjects fascinating you can further read on here:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://www.askforidea.com/should-i-use-lf-or-crlf-check-this-out-crlf-vs-lf/?force_isolation=true](https://www.askforidea.com/should-i-use-lf-or-crlf-check-this-out-crlf-vs-lf/?force_isolation=true)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://www.aleksandrhovhannisyan.com/blog/crlf-vs-lf-normalizing-line-endings-in-git/?force_isolation=true](https://www.aleksandrhovhannisyan.com/blog/crlf-vs-lf-normalizing-line-endings-in-git/?force_isolation=true)<br>

Sometimes a conversion occurs between LF and CRLF when doing git add/commit, in order to avoid
those conversions a consistent working environment will be set to use LF.

Here are the considerations to work with LF:
- almost all windows editors today handle both CRLF and LF files.
- github operates on linux and TFS is on windows, if we will switch to github one day then we will be ready

The files in this repository were already converted to LF.

### Setting your working environment.
we need to set working with LF in both the editor and in your local repository.<br>
(more explanation here: &nbsp;https://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf
<br>

**set the editor, this will set every new file to LF:**<br>
- for vscode see link: https://blog.boot.dev/clean-code/line-breaks-vs-code-lf-vs-crlf.
- for webstorm see link: https://www.jetbrains.com/help/webstorm/configuring-line-endings-and-line-separators.html?force_isolation=true#change_line_ending.

**set your local repository (global definition is optional and is for your consideration):**<br>
- for the current project: git config core.autocrlf input
- globally for all git projects: git config --global core.autocrlf input


## Creating a new application in the repository

Here are the steps to create a new application:
1. in the root directory: ng g app APP_NAME --prefix=APP_PREFIX [--skipTests=true]  // skipTest will not generate spec.ts files.<br>
   this will create a folder APP_NANE and add entry in angular.json.
2. goto APP_NAME folder and delete all files except 'tsconfig.app.json' and the 'src' folder.
3. in the 'src' folder create 'styles' folder and move 'styles.scss' to there.
4. in angular.json update the following in the APP_NAME entry under architect:
  - build.options.styles:  change to "APP_NAME/src/styles/styles.scss"
  - build.configurations.production.budgets, type initial: change maximumWarning to "8mb" and maximumError to "15mb"
  - build.configurations.production.budgets, type anyComponentStyle: change maximumWarning to "20kb" and maximumError to "50kb"
  - delete "extract-i18n" section
  - (optional) delete "test" section
  - lint.options.lintFilePatterns:  add line "apps-shared/src/app/**/*.ts"
5. delete file APP_NAME/src/test.ts
6. delete file APP_NAME/src/app/app.component.spec.ts
7. set thconfig.app.json, take an example from medical-record/tsconfig.app.json or from another application.
8. add scripts in package.json, copy the script of the 'login' application and paste them changing 'login' to APP_NAME.

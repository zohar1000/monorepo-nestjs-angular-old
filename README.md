# Monorepo for Nest.js and Angular
The repository contains skeleton for a server project and multiple client projects (apps).<br>
There are 2 skeleton apps named app1 and app2.<br>
The code which is shared between all apps is in 'shared-apps' folder.<br>
The code which is shared between the apps and the server is in 'shared-stack' folder.<br>


#### A few notes:
- the cli setting for this repository are set to disregard test files (spec.ts) and they will not be generated when generating via the cli.
- in order to avoid messages like "LF will be replaced by CRLF" when doing git add/commit we will switch to a consistent mode of work using LF only,
  so set your working environment to LF as described below.
- webstorm - in case you use it then you need to upgrade it to version 2021.2 or above.
- pnpm is used here to install dependencies, if you use npm or yarn then delete pnpm.lock.json and then install 

## working with the shared folders
#### shared-apps
The applications are set to import content from the shared folder by using the path @shared-apps.<br>
For example: import { SomeComponent } from '@shared-apps'.<br>
The @shared-apps path references the file shared-apps/src/public-api.ts, this file exports
all the shared content for the applications.<br>
It exports the module SharedAppsModule which should
contain the components, directives, etc.<br>
Files that cannot be exported in SharedAppsModule, like enums and interfaces, will be directly exported in public-api.ts.

#### shared-stack
Imports are made with @shared-stack. 


## Serving an application
To server an app, you can either run 'ng s APP_NAME' or 'npm run APP_NAME'.<br>
app1 is the default when serving, so 'ng s' or 'npm start' are enough to run it.<br><br>
To run the server: 'npm run server'


## Set your working environment to LF:
Different operating systems have different characters to mark an end of a line.<br>
Linux and Mac use the character LF (Line Feed) which is '\n'.<br>
Windows uses a combination of 2 characters CR+LF (Carriage Return + Line Feed) which are '\r\n'.<br>
If you find this subject fascinating you can further read on here:<br>
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
- # globally for all git projects: git config --global core.autocrlf input


## Creating a new application in the repository

Here are the steps to create a new application:
1. in the root directory: ng g app APP_NAME --prefix=APP_PREFIX [--skipTests=true]  // skipTest will not generate spec.ts files.<br>
   this will create a folder APP_NANE and add entry in angular.json.
2. goto APP_NAME folder and delete all files except 'tsconfig.app.json' and the 'src' folder.
3. in the 'src' folder create 'styles' folder and move 'styles.scss' to there.
4. in angular.json update the following in the APP_NAME entry under architect:
  - (optional) build.options.styles:  change to "APP_NAME/src/styles/styles.scss"
  - delete "extract-i18n" section
  - (optional) delete "test" section
  - lint.options.lintFilePatterns:  add line "shared-apps/src/app/**/*.ts"
5. delete file APP_NAME/src/test.ts
6. set tsconfig.app.json, take an example from app1/tsconfig.app.json or from another application.
7. add scripts in package.json, copy the script of the 'app1' application and paste them changing 'app1' to APP_NAME.

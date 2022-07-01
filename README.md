# Monorepo for Nest.js and Angular
The repository contains skeleton for a server project and multiple client projects (apps).<br>
There are 2 skeleton apps named app1 and app2.<br>


The cli setting for this repository are set to disregard test files (spec.ts) and they will not be generated when generating via the cli.<br>

pnpm is used here to install dependencies, if you use npm or yarn then delete pnpm.lock.json and then install.<br><br>

### Before working make sure to set the following:
- webstorm - in case you use it then you need to upgrade it to version 2021.2 or above.
- in order to avoid messages like "CRLF will be replaced by LF" when doing git add/commit we will switch to a consistent mode of work using LF only,
  so set your working environment to LF as described below.

<br><br>

## working with the shared folders
The code which is shared between all apps is in 'shared-apps' folder.<br>
The code which is shared between the apps and the server is in 'shared-all' folder.<br>
### shared-apps
The applications can use 2 paths to import content from the *shared-apps* folder:
- **@shared-apps-module** - this path will refer to a module in the shared-apps folder named SharedAppsModule that will export all the shared components, directives and pipes.<br>
This module will be imported in each application's shared module:<br>
````
import { SharedAppsModule } from '@shared-apps-module';
.
imports: [SharedAppsModule];
````

- **@shared-apps** - this path refers to the *shared-apps/src/app/** folder hierarchy.<br>
For example, if we have an interface named SomeModel located at shared-apps/src/app/models/some.model.ts, then we will import it in our app like that:
````
import { someModel } from '@shared-apps/models/some.model';
````

### shared-all
this path refers to the shared-all folder, here is an example:
````
import { ServerResponse } from '@shared-all/models/server-response.model';
````

<br><br>

## Serving an application
To serve an app, you can either run 'ng s APP_NAME' or 'npm run APP_NAME'.<br>
app1 is the default when serving, so 'ng s' or 'npm start' are enough to run it.<br><br>
To run the server: 'npm run server'

<br><br>

## Set your working environment to LF:
Different operating systems have different characters to mark an end of a line.<br>
Linux and Mac use the character LF (Line Feed) which is '\n'.<br>
Windows uses a combination of 2 characters CR+LF (Carriage Return + Line Feed) which are '\r\n'.<br>
If you find this subject fascinating you can further read on here:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://www.askforidea.com/should-i-use-lf-or-crlf-check-this-out-crlf-vs-lf/?force_isolation=true](https://www.askforidea.com/should-i-use-lf-or-crlf-check-this-out-crlf-vs-lf/?force_isolation=true )<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://www.aleksandrhovhannisyan.com/blog/crlf-vs-lf-normalizing-line-endings-in-git/?force_isolation=true](https://www.aleksandrhovhannisyan.com/blog/crlf-vs-lf-normalizing-line-endings-in-git/?force_isolation=true )<br>

Sometimes a conversion occurs between LF and CRLF when doing git add/commit, in order to avoid
those conversions a consistent working environment will be set to use LF.

Here are the considerations to work with LF:
- almost all windows editors today handle both CRLF and LF files.
- github operates on linux and TFS is on windows, if we will switch to github one day then we will be ready

The files in this repository were already converted to LF.

### Setting your working environment.
we need to set working with LF in both the editor and in your local repository.<br>
more explanation here: &nbsp;https://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf
<br>

**set the editor, this will set every new file to LF:**<br>
- for vscode see link: https://blog.boot.dev/clean-code/line-breaks-vs-code-lf-vs-crlf.
- for webstorm see link: https://www.jetbrains.com/help/webstorm/configuring-line-endings-and-line-separators.html?force_isolation=true#change_line_ending.

**set your local repository (global definition is optional and is for your consideration):**<br>
- for the current project: git config core.autocrlf input
- globally for all git projects: git config --global core.autocrlf input

<br><br>

## Assets
Assets are in the root folder, in this way both the IDE and the compiler can find it.

<br><br>

## Environment Files
Environment files are in the shared-apps/src/environments folder and are shared to all apps.

<br><br>

## Schematics and pnpm
When using pnpm instead of npm as the package manager the angular schematics will not show
up in the IDE although they will be available in the command line.<br>
This is because the schematics package is in the .pnpm folder instead of the node_modules
which causes the IDE to ignore it.<br>
In order to provide the schematics, the package '@schematics/angular' is
installed as a dev dependency.

<br><br>

## Creating a new application in the repository

Here are the steps to create a new application:
2. in the root directory: ng g app APP_NAME --prefix=APP_PREFIX --skip-package-json=true  [--skip-tests=true]  // skipTest will not generate spec.ts files.<br>
   this will create a folder APP_NANE and add entry in angular.json.
3. goto APP_NAME folder and delete all files except 'tsconfig.json', 'tsconfig.app.json' and the 'src' folder.
4. in the 'src' folder create 'styles' folder and move 'styles.scss' into it.
5. in angular.json update the following in the APP_NAME entry under architect:
  - build.options.styles:  change to "APP_NAME/src/styles/styles.scss"
  - (optional) delete "extract-i18n" and the "test" sections
  - lint.options.lintFilePatterns:  add line "shared-apps/src/app/**/*.ts"
5. (optional) delete file APP_NAME/src/test.ts
6. set the 'assets' property as:
```angular2html
"assets": [
  {
    "glob": "favicon.ico",
    "input": "APP_NAME/src",
    "output": "assets"
  },
  {
    "glob": "**/*",
    "input": "assets",
    "output": "assets"
  }
]
```
7. set the 'stylePreprocessorOptions' property as:
```angular2html
"stylePreprocessorOptions": {
  "includePaths": [
    "apps-shared/src/styles",
    "medical-record/src/styles"
  ]
}
```
8. for 'tsconfig.json' file, fill it with a copy from another app.
9. add scripts in package.json, copy the script of the 'app1' application and paste them changing 'app1' to APP_NAME.

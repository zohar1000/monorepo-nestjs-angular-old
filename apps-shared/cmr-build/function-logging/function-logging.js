const fs = require('fs');
const path = require('path');
const utils = require('../utils');
const { spawnSync } = require('child_process');
const projectName = utils.getProjectName();
const projectSrcFolder = utils.getProjectSrcFolder();

/************************************************************/
/* The script adds a line for each class method which calls */
/* a LogService function to log its name and parameters.    */
/* This info will be used for trace debugging in runtime    */
/************************************************************/

class FunctionLogging {
  config = {
    tempParentDirName: 'temp',
    tempSubFolderDirName: 'cmr-build_{PROJECT_NAME}_src',
    tempSubFolderDistDirName: 'cmr-build_{PROJECT_NAME}_dist',
    filesToModifyEndsWith: ['.component.ts', '.service.ts', '.base.ts'],
    excludeClasses: ['SmartLogService', 'TranslationService'],
    excludeFunctions: ['BaseGeneric.logDebug', 'AuthenticationService.dispatchUserEvent', 'TopNavService.setSystemTreeChildren'],
    isDeleteTempFolderAtEnd: true
  };

  ALPHAS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  NON_CHARS = [' ', '\n', '\r', '\t'];
  funcName = '';
  currFileName = '';
  errors = {
    cycles: 0,
    cycleFiles: []
  };
  stages = {
    scan: true,
    strip: true,
    modifyFiles: true,
    build: true
  };
  tempParentDirPath = path.resolve(process.cwd(), this.config.tempParentDirName);
  tempSrcDirPath = path.resolve(process.cwd(), this.config.tempParentDirName, this.config.tempSubFolderDirName.replace('{PROJECT_NAME}', projectName));
  tempDistDirPath = path.resolve(process.cwd(), this.config.tempParentDirName, this.config.tempSubFolderDistDirName.replace('{PROJECT_NAME}', projectName));
  rootFolder = process.cwd();
  log = {
    isVerbal: true,
    isCopyFileToTempFolder: false,
    isFileInSrcFolder: false,
    isFileNameToModify: false,
    isClassModify: false,
    isFuncToModify: false,
    isShowModifiedFile: false
  };

  async init() {
    let isSuccess = await this.setTempFolder();
    if (isSuccess && this.stages.modifyFiles) isSuccess = this.modifyFiles(this.tempSrcDirPath);
    if (isSuccess && this.stages.build) isSuccess = this.build();
    if (this.config.isDeleteTempFolderAtEnd) await this.deleteTempFolder();

    if (this.errors.cycleFiles.length > 0) {
      console.log('cycle error:', this.errors.cycleFiles.length);
      console.log('files:', this.errors.cycleFiles);
      this.exit(1);
    }

    if (!isSuccess) {
      console.log('\n******************************\nError building the project\n******************************');
      this.exit(1);
    }

    this.exit(0);
  }

  exit(status, msg = null) {
    utils.printCmrStepEnd('function-logging', status, msg);
    process.exit(status);
  }

  async setTempFolder() {
    let isSuccess = false;
    try {
      await this.deleteTempFolder();
      fs.mkdirSync(this.tempParentDirPath);
      fs.mkdirSync(this.tempSrcDirPath);
      if (this.log.isVerbal) console.log('temporary folder was created:', this.tempSrcDirPath);
      utils.copyFolder(path.resolve(process.cwd(), projectSrcFolder), this.tempSrcDirPath, (isDirectory, fromFileName, toFileName) => {
        if (!isDirectory && this.log.isCopyFileToTempFolder) console.log('copying file to temp folder:', toFileName);
      });
      if (this.log.isVerbal) console.log('source files were copied to the temporary folder:', this.tempSrcDirPath);
      if (this.log.isCopyFileToTempFolder) console.log('after copying files');
      const symLink = `mklink /J "${path.resolve(this.tempSrcDirPath, 'node_modules')}" "${path.resolve(this.rootFolder, 'node_modules')}"`;
      spawnSync(symLink, { stdio: 'inherit', shell: true });
      isSuccess = true;
    } catch(e) {
      console.log('Error creating temp dir', e);
    }
    return isSuccess;
  }

  async deleteTempFolder() {
    console.log('deleting temp folder:', this.tempParentDirPath);
    await utils.deleteFolder(this.tempParentDirPath);
  }

  modifyFiles(folder) {
    let isSuccess = false;

    try {
      const files = fs.readdirSync(folder);
      files.forEach(file => {
        const fileName = path.resolve(folder, file);
        this.currFileName = fileName;
        if (fs.lstatSync(fileName).isDirectory()) {
          this.modifyFiles(fileName);
        } else if (this.config.filesToModifyEndsWith.find(endsWith => fileName.endsWith(endsWith))) {
          this.modifyFile(fileName);
        }
      });
      isSuccess = true;
    } catch(e) {
      console.log('error updating source files', e);
    }
    return isSuccess;
  }

  modifyFile(fileName) {
    if (this.log.isFileNameToModify) console.log('modifying file:', fileName);
    this.fileData = fs.readFileSync(fileName, 'utf8');
    if (this.stages.strip) this.fileData = utils.stripCommentsFromFile(this.fileData);

    let classCount = 0;
    // let ix = this.getClassFunctionsStartIx(0);
    let ix = this.getNextClassName(0);
    while (this.className !== '') {
      classCount++;
      ix = this.getClassFirstFuncIx(ix);
      ix = this.modifyClass(ix);
      if (ix !== -1 && ix < this.fileData.length) ix = this.getNextClassName(ix);
    }

    if (classCount === 0) {
      console.log(`file ${fileName} has no class - no replacement was done`);
    } else {
      if (this.log.isShowModifiedFile) {
        console.log(`${fileName} ==================================`);
        console.log(this.fileData.substr(ix));
        console.log(`==============================================`);
      }
      fs.writeFileSync(fileName, this.fileData, {encoding: 'utf8'});
    }
  }

  modifyClass(ix) {
    ix = this.getFuncStartIx(ix); // this.fileData.indexOf('{', ix);
    while (this.funcName !== '') {
      if (!this.config.excludeClasses.includes(this.className) && !this.config.excludeFunctions.includes(this.className + '.' + this.funcName)) {
        if (this.log.isFuncToModify) console.log('found func:', this.funcName);
        // let line = `\nif (this && this['smartLogService']) this['smartLogService'].debug('${this.className}:${this.funcName}', arguments);`;  // arguments cause problem with async on es5
        let line = `\nif (this && this['smartLogService']) this['smartLogService'].debug('${this.className}:${this.funcName}');`;
        if (this.fileData.charAt(ix) !== '\n') line += '\n';
        const ixClosingBrace = this.fileData.charAt(ix) === '}' ? ix : this.getFuncEndIx(ix, true);
        if (this.funcName === 'constructor') {
          let ixSuper = this.fileData.indexOf('super(', ix);
          if (ixSuper === -1) ixSuper = this.fileData.indexOf('super (', ix);
          if (ixSuper !== -1 && ix < ixClosingBrace) {   // bypass super() for constructor
            let count = 0;
            let isParens = false;
            while(count > 0 || !isParens) {
              const c = this.fileData.charAt(ixSuper);
              if (c === '(') {
                isParens = true;
                count++;
              } else if (c === ')') {
                count--;
              }
              ixSuper++;
            }
            ix = ixSuper + 1;
          }
        }

        this.fileData = this.fileData.substring(0, ix) + line + this.fileData.substr(ix);
        ix += line.length;
      }

      ix = this.getFuncEndIx(ix, true);
      ix = this.getFuncStartIx(ix); // this.fileData.indexOf('{', ix+1);
    }
    return ix;
  }

  getFuncStartIx(ix) {
    let len = this.fileData.length;
    ix = this.getIxOfFirstOpenParen(ix, len);
    if (ix >= len) {
      this.funcName = '';
      this.className = '';
    }
    if (this.className === '') return ix;

    // find first (, and closing ), and then {
    // ix = this.fileData.indexOf('(', ix+1);
    // if (ix === -1) return -1;
    const ReturnType = {
      None: 0,
      Name: 1,
      Type: 2
    };
    let isInParens = true;
    let isInReturnType = false;
    let returnType = ReturnType.None;
    let count;
    let isFound = false;
    let isEndOfClass = false;
    let cycles = 0;
    for (ix = ix + 1, count = 1; cycles < 5000 && !isFound && !isEndOfClass; ix++) {
      cycles++;
      const c = this.fileData.charAt(ix);
      if (isInParens) {
        if (c === '(') count++;
        else if (c === ')') {
          count--;
          if (count === 0) isInParens = false;
        }
      } else if (isInReturnType) {
        if (c === ';') {
          isInReturnType = false;
        } else if (returnType === ReturnType.None) {
          if (c === '{') {
            returnType = ReturnType.Type;
            count++;
          } else if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c === '_') {
            returnType = ReturnType.Name;
          }
        } else if (returnType === ReturnType.Type) {
          if (c === '{') {
            count++;
          } else if (c === '}') {
            count--;
            if (count === 0) isInReturnType = false;
          }
        } else {  //  name
          if (c === '{') isFound = true;
        }
      } else {
        if (c === '{') {
          isFound = true;
        } else if (c === ':') {
          isInReturnType = true;
        } else if (c === '}') {
          isEndOfClass = true;
        }
      }
    }

    if (cycles >= 5000) {
      this.errors.cycleFiles.push(this.currFileName);
      console.log('ERROR cycles');
      console.log('ix:', ix);
      console.log({isInParens});
      console.log({isInReturnType});
      console.log({returnType});
      console.log({count});
      console.log('this.fileData:', this.fileData);
      throw new Error('cycles error');
    }

    this.funcName = isFound ? this.getFuncName(ix) : '';
    return ix;  // isFound ? ix : -1; // this.fileData.indexOf('{', ix+1);
  }

  getIxOfFirstOpenParen(ix, len) {
    // check that is is not @Input(, @Output(, @ViewChild(, etc.
    const isDecorator = j => {
      let c = this.fileData.charAt(--j);
      while (this.NON_CHARS.indexOf(c) !== -1) {
        c = this.fileData.charAt(--j);
      }
      while (this.ALPHAS.indexOf(c) !== -1) {
        c = this.fileData.charAt(--j);
      }
      return c === '@';
    };

    // check that is not new Subject(); or similar
    const isPropertyInstance = j => {
      let c = this.fileData.charAt(++j);
      while (c !== ')') {
        c = this.fileData.charAt(++j);
      }
      c = this.fileData.charAt(++j);
      while (this.NON_CHARS.indexOf(c) !== -1) {
        c = this.fileData.charAt(++j);
      }
      return c === ';';
    };

    for (ix = ix + 1; ix < len && this.className !== ''; ix++) {
      const c = this.fileData.charAt(ix);
      if (c === '}') {
        this.funcName = '';
        this.className = '';
      } else if (c === '(') {
        if (!isDecorator(ix) && !isPropertyInstance(ix)) break;
      }
    }
    return ix;
  }

  getFuncName(ix) {
    let count = 0;
    let isFound = false;
    for (--ix; count > 0 || !isFound; ix--) {
      const c = this.fileData.charAt(ix);
      if (c === '(') {
        isFound = true;
        count--;
      } else if (c === ')') {
        count++;
      }
    }
    const endCharIx = ix + 1;
    for (; !this.NON_CHARS.includes(this.fileData.charAt(ix)); ix--) {}
    return this.fileData.substring(ix+1, endCharIx);
  }

  getNextClassName(ix) {
    this.className = '';
    ix = this.fileData.indexOf('class ', ix);
    if (ix === -1) return -1;

    ix += 6;
    this.className = this.getClassName(ix).trim();
    return ix;
  }

  getClassFirstFuncIx(ix) {
    ix = this.fileData.indexOf('{', ix);

    // try to look for a constructor
    let ixCon = this.fileData.indexOf('constructor(', ix);
    if (ixCon === -1) ixCon = this.fileData.indexOf('constructor ', ix);
    if (ixCon !== -1) ix = ixCon;
    return ix === -1 ? ix : ix + 1;
  }


  getClassFunctionsStartIx(ix) {
    ix = this.fileData.indexOf('class ', ix);
    if (ix !== -1) {
      this.className = this.getClassName(ix + 6).trim();
      ix = this.fileData.indexOf('{', ix);

      // try to look for a constructor
      let ixCon = this.fileData.indexOf('constructor(', ix);
      if (ixCon === -1) ixCon = this.fileData.indexOf('constructor ', ix);
      if (ixCon !== -1) ix = ixCon;
    }
    return ix === -1 ? ix : ix + 1;
  }

  getClassName(ix) {
    const END_CHARS = [' ', '{'];
    for (; this.fileData.charAt(ix) === ' '; ix++) {}
    const startIx = ix;
    for (++ix; !END_CHARS.includes(this.fileData.charAt(ix)); ix++) {}
    if (this.log.isClassModify) console.log('className:|' + this.fileData.substring(startIx, ix) + '|');
    return this.fileData.substring(startIx, ix);
  }

  getFuncEndIx(ix, isInFunc) {
    const COMMENT_CHARS = ['"', "'", '`'];
    let count = isInFunc ? 1 : 0;
    let isFound = false;
    let isComment = false;

    for (let len = this.fileData.length; ix < len && !isFound; ix++) {
      const c = this.fileData.charAt(ix);
      if (COMMENT_CHARS.includes(c)) {
        isComment = !isComment;
      } else if (c === '{') {
        count++;
      } else if (c === '}') {
        count--;
        if (count === 0) isFound = true;
      }
    }
    return ix;
  }

  build() {
    let isSuccess = false;
    try {
      const distFolder = utils.getDistFolder(projectName);
      const outputPath = path.resolve(this.rootFolder, distFolder);

      console.log('setting working directory to', this.tempSrcDirPath);
      process.chdir(this.tempSrcDirPath);

      const params = `--outputPath="${outputPath}"`;
      const cmdLine = utils.getNgCommand(projectName, 'build', params);
      const status = utils.runAsChildProcess(cmdLine);

      console.log('resetting working directory to', this.rootFolder);
      process.chdir(this.rootFolder);

      isSuccess = (status === 0);
    } catch(e) {
      console.log('Error in build', e);
    }
    return isSuccess;
  }

  workingPath(file) {
    return path.resolve(process.cwd(), file);
  }

  tempPath(file) {
    return path.resolve(this.tempSrcDirPath, file);
  }
}

const functionLogging = new FunctionLogging();
functionLogging.init().then();


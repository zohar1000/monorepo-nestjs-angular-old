const fs = require('fs');
const path = require('path');
const utils = require('../utils');
const srcFolder = utils.getProjectSrcFolder();

/******************************************/
/* The script finds duplicate class names */
/******************************************/

class FindDuplicates {
  config = {
    filesToModifyEndsWith: ['.component.ts', '.service.ts']
  };
  fileCount = 0;
  classCount = 0;
  classes = {};
  currFileName = '';
  log = {
    isFileNameToModify: false,
    isClassModify: false
  };

  async init() {
    console.log('Looking for duplicate class names');
    let isSuccess = this.modifyFiles(path.resolve(srcFolder));

    if (!isSuccess) {
      console.log('\n******************************\nError building the project\n******************************');
      this.exit(1);
    }

    const duplicatesLen = this.printResults();
    if (duplicatesLen > 0) {
      this.exit(1, duplicatesLen + ' duplicate class names were found, please check the list above');
    }

    this.exit(0);
  }


  exit(status, msg = null) {
    utils.printCmrStepEnd('find-duplicates', status, msg);
    process.exit(status);
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
        } else {
          if (this.config.filesToModifyEndsWith.find(endsWith => fileName.endsWith(endsWith))) {
            this.modifyFile(fileName);
          }
        }
      });
      isSuccess = true;
    } catch(e) {
      console.log('error updating source files', e);
    }
    return isSuccess;
  }

  printResults() {
    console.log('total files:',  this.fileCount);
    console.log('total classes:', this.classCount);
    const duplicates = [];
    const keys = Object.keys(this.classes);
    for (const className of keys) {
      const count = this.classes[className].length;
      if (count > 1) duplicates.push({ className, count });
    }
    if (duplicates.length === 0) {
      console.log('NO DUPLICATES FOUND');
    } else {
      console.log('\n*********************************************************');
      console.log(` DUPLICATE CLASSES FOUND:  ${duplicates.length}`);
      console.log('*********************************************************');
      duplicates.forEach(item => {
        console.log(`${item.className}: ${item.count}`);
        this.classes[item.className].forEach(fileName => console.log('   file:', fileName));
      });
      console.log('\n');
    }
    return duplicates.length;
  }

  modifyFile(fileName) {
    this.fileCount++;
    if (this.log.isFileNameToModify) console.log('modifying file:', fileName);
    this.fileData = fs.readFileSync(fileName, 'utf8');
    this.fileData = utils.stripCommentsFromFile(this.fileData);

    let classCount = 0;
    let ix = this.getNextClass(0);
    while (this.className !== '') {
      classCount++;
      if (!this.classes.hasOwnProperty(this.className)) this.classes[this.className] = [];
      this.classes[this.className].push(this.currFileName);
      if (ix !== -1 && ix < this.fileData.length) ix = this.getNextClass(ix);
    }

    if (classCount === 0) {
      console.log(`file ${fileName} has no class - no replacement was done`);
    } else {
      this.classCount += classCount;
    }
  }

  getNextClass(ix) {
    this.className = '';
    ix = this.fileData.indexOf('class ', ix);
    if (ix === -1) return -1;

    ix += 6;
    this.className = this.getClassName(ix).trim();
    let openBraceCount = 0;
    let isEndClass = false;
    while(!isEndClass) {
      const c =  this.fileData.charAt(ix);
      if (c === '{') {
        openBraceCount++;
      } else if (c === '}') {
        openBraceCount--;
        if (openBraceCount === 0) isEndClass = true;
      }
      ix++;
    }
    return ix;
  }

  getClassName(ix) {
    const END_CHARS = [' ', '{'];
    for (; this.fileData.charAt(ix) === ' '; ix++) {}
    const startIx = ix;
    for (++ix; !END_CHARS.includes(this.fileData.charAt(ix)); ix++) {}
    if (this.log.isClassModify) console.log('className: ' + this.fileData.substring(startIx, ix) + '');
    return this.fileData.substring(startIx, ix);
  }
}

const findDuplicates = new FindDuplicates();
findDuplicates.init().then();

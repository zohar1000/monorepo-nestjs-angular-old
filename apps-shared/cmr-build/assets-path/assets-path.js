const fs = require('fs');
const path = require('path');
const utils = require('../utils');

/********************************************************************/
/* The script corrects references in the code to the assets folder  */
/********************************************************************/

class AssetsPath {
  config = {
    filesToModifyEndsWith: ['.js', '.css']
  };
  fileCount = 0;
  currFileName = '';
  log = {
    isFileNameToModify: false
  };

  constructor() {
    const distFolder = utils.getDistFolder(utils.getProjectName());
    const files = fs.readdirSync(distFolder);
    files.forEach(file => {
      const fileName = path.resolve(distFolder, file);
      this.currFileName = fileName;
      if (fs.lstatSync(fileName).isFile()) {
        if (this.config.filesToModifyEndsWith.find(endsWith => fileName.endsWith(endsWith))) {
          this.modifyFile(fileName);
        }
      }
    });
    utils.printCmrStepEnd('assets-path', 0);
  }

  modifyFile(fileName) {
    this.fileCount++;
    if (this.log.isFileNameToModify) console.log('modifying file:', fileName);
    const fileData = fs.readFileSync(fileName, 'utf8')
      .replace(/"assets\//g, '"./assets/')
      .replace(/"\/assets\//g, '"./assets/')
      .replace(/\(assets\//g, '(./assets/')
      .replace(/\(\/assets\//g, '(./assets/');
    fs.writeFileSync(fileName, fileData, 'utf8');
  }
}

const assetsPath = new AssetsPath();

